var token_number;

displayUserPrefs();


$('#gift_form').on('submit', function(e) {
    e.preventDefault();
    
    //Test for TokenNumber
    //getTokenNumber(1);
    sendGift();
    
});


$('#set_user_info').click(function() {
    setUserPrefs();

});



function createUserPrefsObject () {
    var userPrefs = {
        sender_name_first: null,
        sender_name_last: null,
        sender_email: null
    };
    
    userPrefs.sender_name_first = document.getElementById('sender_name_first').value;
    userPrefs.sender_name_last =  document.getElementById('sender_name_last').value;
    userPrefs.sender_email =      document.getElementById('sender_email').value;
    
    //console.log(JSON.stringify(userPrefs));
    return userPrefs;
}

function setUserPrefs() {
    var key = 'userPrefs';
    var userPrefs = createUserPrefsObject ();
    
    chrome.storage.sync.set({key: userPrefs}, function() {
        console.log('Saved', key, userPrefs);
    });
    
    displayUserPrefs();
}

function displayUserPrefs() {
    chrome.storage.sync.get('key', function (obj) {      
        $('#user_name_first').text(obj.key.sender_name_first);
        $('#user_name_last').text(obj.key.sender_name_last);
        $('#user_email').text(obj.key.sender_email);
        console.log(obj.key.sender_email);
    });
}

function getTokenNumber(callback) {
    //Invokes the Evabot User API like so:
    //  - https://api.evabot.ai/chrome/getUser/:name/:email
    //  - returns a unique TokenNumber for each user
    //  - this token number is required to use the SendGift API
    //  - parameters should be URL encoded
    
    var API_root = 'https://api.evabot.ai/chrome/getUser/';
    var sender_name_first;
    var sender_name_last;
    var sender_email;
    
    chrome.storage.sync.get('key', function (obj) {   
        sender_name_first = obj.key.sender_name_first;
        sender_name_last = obj.key.sender_name_last;
        sender_email = obj.key.sender_email;
    });

    var API_url = API_root + sender_name_first + '+' + sender_name_last + '/' + sender_email;
    
    jQuery.ajax({
        url: API_url,
        method: 'GET',
        success: function(data) {
            var parsed_data = JSON.parse(data);
            var token_number = parsed_data.user[0].TokenNumber;
            //console.log(token_number);
            callback(token_number);
        },
        error:  function(data) {
            console.log('error getting data from Evabot User API!');
        }
    });
}

function sendGift() {
    //Invokes the Evabot Send Gift  API like so:
    //  - https://api.evabot.ai/chrome/sendGift/:tokenNumber/:receiverName/:receiverEmail/:subject/:packId/:price/:address/:message
    //  - https://api.evabot.ai/chrome/sendGift/1d4d0866-2ebf-11e7-91a5-124e76679be9/Mark+Newman/markedwardnewman@gmail.com/Sending+you+a+gift/0/30/+/+
    //  - parameters should be URL encoded: .serialize()
    
    var API_root = 'https://api.evabot.ai/chrome/sendGift/';
    var receiver_info = getReceiverInfo(); //returns a simple array
    //var name = 'Mark+Newman';
    var name = receiver_info[0] + '+' + receiver_info[1];    
    //var email = 'markedwardnewman@gmail.com';
    var email = receiver_info[2];    
    var subject = 'Sending+you+a+gift';
    var packID = 0;
    //var price = 30;
    var price = $('#gift_value').val();
    var address = encodeURIComponent($('#receiver_address').val());    
    //var address = '+';
    var message = encodeURIComponent($('#gift_message').val());
    //var message = '+';   
    
    getTokenNumber(function(token_number) {
        //var API_url = 'https://api.evabot.ai/chrome/sendGift/1d4d0866-2ebf-11e7-91a5-124e76679be9/Mark+Newman/markedwardnewman%40gmail.com/Sending+you+a+gift/0/30/+/+'
        var API_url = API_root + token_number + '/' + name + '/' + email + '/' + subject + '/' + packID + '/' + price + '/' + address + '/' + message;
        
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


function getReceiverInfo () {
  var receiver_info = [];
  var receiver_name_first,
      receiver_name_last,
      receiver_email;

  receiver_info.push(document.getElementById('receiver_name_first').value);
  receiver_info.push(document.getElementById('receiver_name_last').value);  
  receiver_info.push(document.getElementById('receiver_email').value);
  
  return receiver_info;
}

//////////////UNUSED/////////////
function objectObject () {
    var object = {
        sender_name_first: null,
        sender_name_last: null,
        sender_email: null,
        receiver_name_first: null,
        receiver_name_last: null,
        receiver_email: null,
        receiver_address: null,
        amount: 0,
        type: {
            beer: false,
            wine: false,
            tea: false,
            coffee: false,
            chocolate: false
        },
        message: null
    };
    
    object.sender_name_first =   $('#sender_name_first').val();
    object.sender_name_last =    $('#sender_name_last').val();
    object.sender_email =        $('#sender_email)').val();
    
    object.receiver_name_first = $('#receiver_name_first').val();
    object.receiver_name_last =  $('#receiver_name_last').val();
    object.receiver_email =      $('#receiver_email)').val();
    object.receiver_address =    $('#receiver_address)').val();
    
    object.amount =              $('#object_value').val();
    
    object.type.beer =           $('#type_beer').is(':checked');
    object.type.wine =           $('#type_wine').is(':checked');
    object.type.tea =            $('#type_tea').is(':checked');
    object.type.coffee =         $('#type_coffee').is(':checked');
    object.type.chocolate =      $('#type_chocolate').is(':checked');
    
    object.message =             $('#object_message').val();
    
    console.log(JSON.stringify(object));
    return object;
}

function populateEmail () {
    var gift = createGiftObject ();
    var gm_a = "<a href='https://mail.google.com/mail/u/0/?view=cm&amp;fs=1&amp;tf=1&amp;to=";
    var gm_b = gift.receiver_email;
    var gm_c = "&amp;su=A+gift!&amp;shva=1&amp;body=";
    var gm_d = gift.message;
    var gm_e = "&amp;'>create email</a>";
    var gmail_link = gm_a + gm_b + gm_c + gm_d + gm_e;
    
    $('#test1').append(gmail_link);
}
