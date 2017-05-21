//console.log('gmail-handler.js');

var gmail;
var host = 'https://coffeesender.com/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
var url = host + 'plugin/send_coffees';
var channel = 'channel=gmail';
var default_content = 'Connecting to ' + host + '...';
var btn_text = 'Send Starbucks';

function refresh(f) {
  //console.log('gmail-handler.js -> refresh');
  //console.log(document.readyState);
  //console.log(typeof Gmail);
  if( (/in/.test(document.readyState)) || (typeof Gmail === 'undefined') ) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    //console.log('Gmail = ' + Gmail);
    f();
  }
}

function addCoffeeSenderButton(){
  if($('.gE.iv.gt').siblings('.send-coffee').length == 0){
    var node = get_btn();
    $('.gE.iv.gt').after(node);     
  }
  
}

function addButtonToInbox(e){
  $this = $(e.currentTarget);
  if($this.siblings().find('.gE.iv.gt').siblings('.send-coffee').length == 0){
    var node = get_btn();
    $this.siblings().find('.gE.iv.gt').after(node);
  }  
  
  
}

function addCustomButton(){
  if($(".iH[gh='mtb']").length > 0){
    addCoffeeSenderButton();
    $('div[role="listitem"] .adf.ads').on('click', check_and_add_btn);
    $('div[role="listitem"].kQ').on('click', bind_inbox_click_event);
  }else{
    setTimeout(addCustomButton, 300);
  }
  
}

function bind_inbox_click_event(){
  setTimeout(function(){
    
    $('div[role="listitem"] .adf.ads').on('click', check_and_add_btn);
  }, 300);
}

function sendCoffee(e){
  closePopupWindowIfOpened();
  popupwindow('', 'Send Coffee Online Instantly with CoffeeSender', 600, 600);
  window.openPopupGmail.document.write(default_content);
  var email_div = $(e.currentTarget).parents('div.adn');
  var sender_email = get_sender_email(email_div);
  var sender_name = get_sender_name(email_div);
  window.openPopupGmail.location.href = url + '?' + channel + '&email=' + sender_email + '&name=' + sender_name;
}

function check_and_add_btn(e){
  if($(e.currentTarget).siblings().find('.gE.iv.gt').length > 0){
    addButtonToInbox(e);
  }else{
    setTimeout(function(){
      check_and_add_btn(e);
    }, 500);  
  }
  
}

function get_btn(){
  var node = $('<div class="G2" style="margin-bottom: 5px;"></div><div class="T-I J-J5-Ji nX T-I-ax7 T-I-Js-Gs ar7 send-coffee" style="cursor: pointer;">'+ btn_text +'</div><div class="G2" style="margin-top: 5px;"></div>');
  $(node[1]).click(sendCoffee);

  return node;
}

function get_sender(div){
  var email = new gmail.dom.email(div);
  return email.from();
}

function get_sender_email(div){
  return get_sender(div).email;
}

function get_sender_name(div){
  return encodeURIComponent(get_sender(div).name);
}

function popupwindow(url, title, w, h) {
  wLeft = window.screenLeft ? window.screenLeft : window.screenX;
  wTop = window.screenTop ? window.screenTop : window.screenY;

  var left = wLeft + (window.innerWidth / 2) - (w / 2);
  var top = wTop + (window.innerHeight / 2) - (h / 2);
  window.openPopupGmail = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
  return window.openPopupGmail;
}

function closePopupWindowIfOpened(){
  if(typeof window.openPopupGmail !== 'undefined'){
    window.openPopupGmail.close();
  }
}

var main = function(){
  // NOTE: Always use the latest version of gmail.js from
  // https://github.com/KartikTalwar/gmail.js
  gmail = new Gmail();
  gmail.observe.on('view_thread', function(obj) {
    console.log('gmail-handler.js -> main');
    addCustomButton();
  });
}

refresh(main);