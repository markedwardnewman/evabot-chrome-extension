chrome.browserAction.onClicked.addListener(function(activeTab)
{
  var newURL = "evabot.html";
  chrome.tabs.create({ url: newURL });
});