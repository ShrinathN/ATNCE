alert("Running!");
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.todo == "REDIRECT")
  {
    window.location.href = request.data;
  }
});
