//console.log('gmail-script.js');
//console.log('document =' + document);

var j = document.createElement('script');
j.src = chrome.extension.getURL('/js/vendor/jquery-3.2.1.min.js');
(document.head || document.documentElement).appendChild(j);

var g = document.createElement('script');
g.src = chrome.extension.getURL('/js/vendor/gmail.js');
(document.head || document.documentElement).appendChild(g);

var s = document.createElement('script');
s.src = chrome.extension.getURL('/js/gmail-handler.js');
(document.head || document.documentElement).appendChild(s);    

var s = document.createElement('script');
s.src = chrome.extension.getURL('/js/eva.js');
(document.head || document.documentElement).appendChild(s); 
