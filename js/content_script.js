document.addEventListener('mouseup', function (event) {
  var sel = window.getSelection().toString();

  if (sel.length === 0) {
    return;
  }

  chrome.extension.sendRequest({
    'message': 'setText',
    'data': sel
  }, function(response) {});
});
