// http://stackoverflow.com/questions/7387217/chrome-extension-development-post-to-new-tab/23687543#23687543
function POST(url, data)
{
  return chrome.tabs.create({
    "url": chrome.runtime.getURL("pages/post.html")
  }, function(tab) {
    var handler = function(tabId, changeInfo) {
      if (tabId === tab.id && changeInfo.status === "complete"){
        chrome.tabs.onUpdated.removeListener(handler);
        chrome.tabs.sendMessage(tabId, {url: url, data: data});
      }
    }

    // in case we're faster than page load (usually):
    chrome.tabs.onUpdated.addListener(handler);

    // just in case we're too late with the listener:
    chrome.tabs.sendMessage(tab.id, {url: url, data: data});
  });
}

var urls = new Map();

chrome.contextMenus.create({
  "title": "Add quote...",
  "contexts": ["selection"],
  "onclick": function(info, tab) {

    var url = tab.url.split("#")[0];
    url = urls.get(url) ? urls.get(url) : url;

    POST('https://chris-lamb.co.uk/admin/quotes/clipper', {
      "source": '',
      "title": tab.title,
      "url": url,
      "content": info.selectionText
    });
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == "override-url") {
    urls.set(request.options.original.split("#")[0], request.options.override);
  }

  sendResponse();
});
