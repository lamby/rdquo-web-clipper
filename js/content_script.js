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

if (window.location.hostname.indexOf('rdquo.com') === 0) {
  document.documentElement.setAttribute('data-rdquo-web-clipper-installed', true);
}
