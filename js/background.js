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

function savetext(info, tab)
{
  var data = {
    "source": '',
    "title": tab.title,
    "url": tab.url,
    "content": window.seltext
  };

  chrome.tabs.create({
    "url": "http://myquotes.chris-lamb.co.uk/add?" + param(data)
  });
}

var contexts = ["selection"];

for (var i = 0; i < contexts.length; i++)
{
  var context = contexts[i];

  chrome.contextMenus.create({
    "title": "Add quote on myquotes",
    "contexts": [context],
    "onclick": savetext
  });
}
