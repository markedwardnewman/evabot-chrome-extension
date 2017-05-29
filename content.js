console.log('content.js loaded!');

//As of 5/28/2017, Gmail Content Security Policyprevents direct injection. This is a workaround as per https://github.com/KartikTalwar/gmail.js
var j = document.createElement('script');
j.src = chrome.extension.getURL('jquery-3.2.1.min.js');
(document.head || document.documentElement).appendChild(j);

var g = document.createElement('script');
g.src = chrome.extension.getURL('gmail.js');
(document.head || document.documentElement).appendChild(g);

var s = document.createElement('script');
s.src = chrome.extension.getURL('main.js');
(document.head || document.documentElement).appendChild(s);
