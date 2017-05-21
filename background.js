chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    if (info.status == 'complete') {
        if (/(https:\/\/mail.google.com\/*)/.test(tab.url) && localStorage['gmail'] == 'true') {
            chrome.tabs.executeScript(tab.id, {
                file: 'app/app.js'
            });
        }
    }
});