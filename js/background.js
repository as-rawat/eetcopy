// background.js
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  // there are other status stages you may prefer to inject after
  if (changeInfo.status === "complete") {

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabId, {}, function(response) {
          // Do nothing
          console.log(response);
        });
      });
  }
});
