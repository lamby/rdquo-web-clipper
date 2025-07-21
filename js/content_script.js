if (window.location.hostname.indexOf('archive.') === 0) {
  var url = document.querySelectorAll("input[name=q]")[0].getAttribute("value");

  chrome.runtime.sendMessage({type: "override-url", options: {
      original: window.location.href,
      override: url
  }});
}
