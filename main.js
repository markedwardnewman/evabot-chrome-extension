console.log('main.js loaded!');

var gmail;

var main = function() {
    gmail = new Gmail();  // from gmail.js

    gmail.observe.on('load', function(){
        console.log('All Gmail objects loaded!');

        var create_modal = function() {
            console.log('Send Gift! button clicked');

            var modal_title = 'Eva Gift Details:';
            
            var modal_html = "<label for='receiver_name'>Receiver name:<br><input id='receiver_name' name='receiver_name' type='text'></label><br><br><label for='receiver_email'>Receiver email:<br><input id='receiver_email' name='receiver_email' type='email'></label><br><br><label for='gift_price'>Gift value:<br><select id='gift_price' name='gift_price'><option value='30'>$30</option><option value='50'>$50</option></select></label><br><br><fieldset><legend>Exclude these gift types:</legend><label><input id='gift_type_beer' name='gift_type_beer' type='checkbox'>Beer</label><label><input id='gift_type_wine' name='gift_type_wine' type='checkbox' value='gift_type_wine'>Wine</label><label><input id='gift_type_tea' name='gift_type_tea' type='checkbox' value='gift_type_tea'>Tea</label><label><input id='gift_type_coffee' name='gift_type_coffee' type='checkbox' value='gift_type_coffee'>Coffee</label><label><input id='gift_type_chocolate' name='gift_type_chocolate' type='checkbox' value='gift_type_chocolate'>Chocolate</label></fieldset>";
            
            var modal_submit = function() {
                console.log('You clicked the modal -ok- button!');
                var submitted_gift = createGiftObject ();
                console.log('submitted_gift = ', submitted_gift);
                console.log('JSON.stringify(submitted_gift)= ', JSON.stringify(submitted_gift));

                sendGift(submitted_gift);

                gmail.tools.remove_modal_window();
            };
            var modal_cancel = gmail.tools.remove_modal_window();
            var modal_close = gmail.tools.remove_modal_window();

            gmail.tools.add_modal_window(modal_title, modal_html, modal_submit, modal_cancel, modal_close);
        }
        //END create_modal

        gmail.tools.add_right_toolbar_button('Send Gift!', create_modal , 'T-I J-J5-Ji T-I-KE L3'); //The last parameter are css class names applied to the toolbar button.  Currenly matches the Gmail's compose button

        function createGiftObject () {
            var gift = {
                sender_name_first: null,
                sender_name_last: null,
                sender_email: null,
                sender_message: null,
                token_number: null,
                receiver_name_first: null,
                receiver_name_last: null,
                receiver_email: null,
                receiver_address: null,
                email_subject: null,
                pack_id: null,
                price: 0,
                types: {
                    beer: false,
                    wine: false,
                    tea: false,
                    coffee: false,
                    chocolate: false
                }
            }

            var sender_name_full = gmail.get.loggedin_accounts()[0].name.split(' ');
            var receiver_name_full = $('#receiver_name').val().split(' ');

            gift.sender_name_first = sender_name_full[0];
            gift.sender_name_last = sender_name_full[1];
            gift.sender_email = gmail.get.user_email();
            gift.sender_message = '+'; 
            gift.token_number = 0;
            gift.receiver_name_first = receiver_name_full[0];
            gift.receiver_name_last = receiver_name_full[1];
            gift.receiver_email = $('#receiver_email').val();
            gift.receiver_address = '+';
            gift.email_subject = 'Sending+you+a+gift';
            gift.pack_id = 0;
            gift.price = $('#gift_price').val();
            gift.types.beer = $('#gift_type_beer').is(':checked');
            gift.types.wine = $('#gift_type_wine').is(':checked');
            gift.types.tea = $('#gift_type_tea').is(':checked');
            gift.types.coffee = $('#gift_type_coffee').is(':checked');
            gift.types.chocolate = $('#gift_type_chocolate').is(':checked');

            return gift;
        }
        //end createGiftObject()
    });
    //end gmail.observe.on('load',...)
}
//end main

function refresh(f) {
    if( (/in/.test(document.readyState)) || (typeof Gmail === undefined) ) {
        setTimeout('refresh(' + f + ')', 100);
    } else {
        f();
    }
}

function getTokenNumber(obj, callback) {
    //Invokes the Evabot User API like so:
    //  - https://api.evabot.ai/chrome/getUser/:name/:email
    //  - returns a unique TokenNumber for each user
    //  - this token number is required to use the SendGift API
    //  - parameters should be URL encoded

    var API_root = 'https://api.evabot.ai/chrome/getUser/';
    var API_url = API_root + obj.sender_name_first + '+' + obj.sender_name_last + '/' + obj.sender_email;

    jQuery.ajax({
        url: API_url,
        method: 'GET',
        success: function(data) {
            var parsed_data = JSON.parse(data);
            var token_number = parsed_data.user[0].TokenNumber;
            console.log('token number =', token_number);
            callback(token_number);
        },
        error: function(data) {
            console.log('error getting data from Evabot User API!');
        }
    });
}

function sendGift(obj) {
    //Invokes the Evabot Send Gift  API like so:
    //  - https://api.evabot.ai/chrome/sendGift/:tokenNumber/:receiverName/:receiverEmail/:subject/:packId/:price/:address/:message
    //  - https://api.evabot.ai/chrome/sendGift/1d4d0866-2ebf-11e7-91a5-124e76679be9/Mark+Newman/markedwardnewman@gmail.com/Sending+you+a+gift/0/30/+/+
    //  - parameters should be URL encoded

    getTokenNumber(obj, function(token_number) {
        var API_root = 'https://api.evabot.ai/chrome/sendGift/';
        var API_url = API_root + token_number + '/' + obj.sender_name_first + '+' + obj.sender_name_last + '/' + obj.sender_email + '/' + encodeURIComponent(obj.email_subject) + '/' + obj.pack_id + '/' + obj.price + '/' + encodeURIComponent(obj.receiver_address) + '/' + encodeURIComponent(obj.sender_message);
        
        console.log('API_url = ', API_url);

        jQuery.ajax({
            url: API_url,
            method: 'GET',
            success: function() {
                console.log('POST success!');
            },
            error:  function() {
                console.log('POST error!');
            }
        });
    });
}

refresh(main);


//USE THE BELOW FOR TESTING:
//console.log('gmail.get.loggedin_accounts() =', gmail.get.loggedin_accounts());
//console.log('gmail.get.loggedin_accounts()[0].name =', gmail.get.loggedin_accounts()[0].name);
//console.log('gmail.get.user_email() =', gmail.get.user_email());
//console.log('gmail.get.manager_email() =', gmail.get.manager_email());
//console.log('gmail.get.current_page() =', gmail.get.current_page());
//console.log('gmail.get.email_id() =', gmail.get.email_id());
//console.log('gmail.get.email_ids() =', gmail.get.email_ids());
//console.log('gmail.get.last_active() =', gmail.get.last_active());
//console.log('gmail.get.loggedin_accounts() =', gmail.get.loggedin_accounts());
//console.log('gmail.check.is_google_apps_user() =', gmail.check.is_google_apps_user());
//console.log('gmail.get.email_subject() =', gmail.get.email_subject());
//console.log('gmail.observe.http_requests() =', gmail.observe.http_requests());
//console.log('gmail.tools.extract_email_address(str)= ' + gmail.tools.extract_email_address('ranfall and fff are aaa@aaa.com + 99fvbb'));


/* gmail.observe.on('http_event', function(params) { //triggers when pretty much any of the other 'actions' occur
    console.log('http_event...\n','url data:', params);
}); */

/* gmail.observe.on('unread', function(id, url, body, xhr) {
    console.log('id:', id, 'url:', url, 'body', body, 'xhr', xhr);
}); */

/* gmail.observe.on('read', function(id, url, body, xhr) {
    console.log('id:', id, 'url:', url, 'body', body, 'xhr', xhr);
}); */

/* gmail.observe.on('star', function(id, url, body, xhr) {
    console.log('star...\n', 'id:', id, 'url:', url, 'body', body, 'xhr', xhr);
}); */

/* gmail.observe.on('unstar', function(id, url, body, xhr) {
    console.log('unstar...\n', 'id:', id, 'url:', url, 'body', body, 'xhr', xhr);
}); */

/* gmail.observe.on('new_email', function(id, url, body, xhr) { //'new_email' means a new email has arrived in the inbox
    console.log('new_email...\n', 'id:', id, 'url:', url, 'body', body, 'xhr', xhr);
}); */

/* gmail.observe.on('refresh', function(url, body, data, xhr) {
    console.log('refresh...\n', 'url:', url, 'body', body, 'data', data, 'xhr', xhr);
}); */

/* gmail.observe.on('compose', function(compose, type) { // type can be compose, reply or forward
    console.log('compose...\n', 'api.dom.compose object:', compose, 'type is:', type );  // gmail.dom.compose object
}); */

/* gmail.observe.on('view_thread', function(obj) {
    console.log('conversation thread opened...\n', obj);
}); */

/* gmail.observe.on('view_email', function(obj) {
    console.log('individual email opened...\n', obj);
}); */

/* gmail.observe.on('load_email_menu', function(match) {
    console.log('Menu loaded...\n',match);

    // insert a new element into the menu
    $('<div />').addClass('J-N-Jz')
        .html('New element')
        .appendTo(match);
}); */

/* gmail.tools.add_modal_window('Clean inbox', 'Do you want to continue?', function() {
	  console.log('You clicked yes!');
	  gmail.tools.remove_modal_window();
}); */

/* gmail.observe.after('send_message', function(url, body, data, response, xhr) {
    console.log('send_message.after ...\n', 'url:', url, 'body:', body, 'email_data:', data, 'response:', response, 'xhr:', xhr);
}); */

/*
//Modify email before sending
gmail.observe.before('send_message', function(url, body, data, xhr){
    console.log('send_message.before ...\n', '\n\n\nurl:', url, '\n\n\nbody:', body, '\n\n\nemail_data:', data, '\n\n\nxhr:', xhr);

    var email_params = xhr.xhrParams.body_params;
    var email_sender_name = gmail.get.loggedin_accounts()[0].name;
    var email_sender_address = gmail.get.user_email();
    var email_id = gmail.get.email_id();

    console.log('email_sender_name = ' + email_sender_name);
    console.log('email_sender_address = ' + email_sender_address);
    console.log('email_id = ' + email_id);

    if (data.subject == 'eva') {
        if (email_params.cc) {
            if (typeof email_params.cc != 'object') {
                email_params.cc = [ email_params.cc ];
            }
        }
        else {
            email_params.cc = [];
        }

        email_params.cc.push('upu.test.user1@gmail.com');
        email_params.subject = email_sender_name + ' has sent you a gift!';
        email_params.body =
          'Nice!\n' +
          'An Evabot gift has been sent to you from ' + email_sender_address + '!';
    }
});
*/
