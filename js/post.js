var onMessageHandler = function(message){
  // Ensure it is run only once, as we will try to message twice
  chrome.runtime.onMessage.removeListener(onMessageHandler);

  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", message.url);
  form.setAttribute("accept-charset", "UTF-8");

  for (var key in message.data) {
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", message.data[key]);
    form.appendChild(hiddenField);
  }

  document.body.appendChild(form);
  form.submit();
}

chrome.runtime.onMessage.addListener(onMessageHandler);
