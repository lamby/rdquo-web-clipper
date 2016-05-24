var seltext = null;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse)
{
  switch (request.message)
  {
    case 'setText':
      window.seltext = request.data
      break;
    default:
      sendResponse({
        data: "Invalid arguments"
      });
      break;
  }
});

var param = function (data) {
  var xs = [];

  for (var x in data) {
     xs.push(encodeURIComponent(x) + "=" + encodeURIComponent(data[x]));
  }

  return xs.join("&");
};

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

function savetext(info, tab)
{
  var data = {
    "source": '',
    "title": tab.title,
    "url": tab.url,
    "content": window.seltext
  };

  POST('http://rdquo.com/add/clipper', data);
}

var contexts = ["selection"];

for (var i = 0; i < contexts.length; i++)
{
  var context = contexts[i];

  chrome.contextMenus.create({
    "title": "Add quote to rdquo.com...",
    "contexts": [context],
    "onclick": savetext
  });
}
