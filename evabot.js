var token_number;

getUserPrefs();


$("#gift_form").on("submit", function(e) {
    e.preventDefault();
    //sendGift();
    
    //saveChanges();
    //getChanges();

});

$("#create_user_prefs").click(function() {
    createUserPrefsObject ();
    
});

$("#set_user_info").click(function() {
    setUserPrefs();

});

$("#get_user_info").click(function() {
    getUserPrefs();

});

function createUserPrefsObject () {
    var userPrefs = {
        sender_name_first: null,
        sender_name_last: null,
        sender_email: null,
        sender_token_number: null
    };
    
    userPrefs.sender_name_first = document.getElementById("sender_name_first").value;
    userPrefs.sender_name_last =  document.getElementById("sender_name_last").value;
    userPrefs.sender_email =      document.getElementById("sender_email").value;
    userPrefs.sender_token_number =  1;
    
    console.log(JSON.stringify(userPrefs));
    return userPrefs;
}

function setUserPrefs() {
    var key='myKey';
    //var testPrefs = {'val': 10};
    //var testPrefs;
    var userPrefs = createUserPrefsObject ();
    
    chrome.storage.sync.set({key: userPrefs}, function() {
        //console.log('Saved', key, userPrefs);
    });
    
    getUserPrefs();
}

function getUserPrefs() {
    chrome.storage.sync.get('key', function (obj) {
        //console.log(obj.key.sender_email);
        
        $("#user_name_first").text(obj.key.sender_name_first);
        $("#user_name_last").text(obj.key.sender_name_last);
        $("#user_email").text(obj.key.sender_email);
        console.log(obj.key.sender_token_number);
    });
}



function getTokenNumber(callback) {
    //Invokes the Evabot User API like so:
    //  - https://api.evabot.ai/chrome/getUser/:name/:email
    //  - TEST: https://api.evabot.ai/chrome/getUser/Mark+Newman/markedwardnewman@gmail.com
    //      {"user":[{"TokenNumber":"1d4d0866-2ebf-11e7-91a5-124e76679be9"}], "price":[{"PriceId":1,"Price":30,"Currency":"$","Title":"Standard Gift","PackId":0},{"PriceId":2,"Price":50,"Currency":"$","Title":"Special Gift","PackId":0}]}
    //  - returns a unique TokenNumber for each user
    //  - this token number is required to use the SendGift API
    //  - parameters should be URL encoded: .serialize()
    
    var API_root = 'https://api.evabot.ai/chrome/getUser/';
    var sender_info = getSenderInfo(); //returns a simple array
    var name = sender_info[0] + '+' + sender_info[1];
    var email = sender_info[2];
    var API_url = API_root + name + '/' + email;
    
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
            console.log("error getting data!");
        }
    });
}

function sendGift() {
    //Invokes the Evabot Send Gift  API like so: 
    //  - https://api.evabot.ai/chrome/sendGift/1d4d0866-2ebf-11e7-91a5-124e76679be9/Mark+Newman/markedwardnewman@gmail.com/Sending+you+a+gift/0/30/+/+
    //  - TEST:  https://api.evabot.ai/chrome/sendGift/:tokenNumber/:receiverName/:receiverEmail/:subject/:packId/:price/:address/:message
    //  - returns a unique TokenNumber for each user
    //  - this token number is required to use the SendGift API
    //  - parameters should be URL encoded: .serialize()
    
    
    var API_root = 'https://api.evabot.ai/chrome/sendGift/';
    //var receiver_info = getReceiverInfo(); //returns a simple array
    var name = 'Mark+Newman'//receiver_info[0] + '+' + receiver_info[1];
    var email = 'markedwardnewman@gmail.com';//receiver_info[2];
    var subject = 'Sending+you+a+gift';
    var packID = 0;
    var price = 30//$("#gift_value").val();
    var address = '+';
    var message = '+';
    
    getTokenNumber(function(token_number) {
        //var API_url = 'https://api.evabot.ai/chrome/sendGift/1d4d0866-2ebf-11e7-91a5-124e76679be9/Mark+Newman/markedwardnewman%40gmail.com/Sending+you+a+gift/0/30/+/+'
        var API_url = API_root + token_number + '/' + name + '/' + email + '/' + subject + '/' + packID + '/' + price + '/' + address + '/' + message;
        
        jQuery.ajax({
            url: API_url,
            method: 'GET',
            success: function() {
                console.log("POST success!");
            },
            error:  function() {
                console.log("POST error!");
            }
        });
    });
}


function getSenderInfo () {
  var sender_info = [];
  var sender_name_first,
      sender_name_last,
      sender_email;

  sender_info.push(document.getElementById("sender_name_first").value);
  sender_info.push(document.getElementById("sender_name_last").value);  
  sender_info.push(document.getElementById("sender_email").value);
  
  return sender_info;
}

function getReceiverInfo () {
  var receiver_info = [];
  var receiver_name_first,
      receiver_name_last,
      receiver_email;

  receiver_info.push(document.getElementById("receiver_name_first").value);
  receiver_info.push(document.getElementById("receiver_name_last").value);  
  receiver_info.push(document.getElementById("receiver_email").value);
  
  return receiver_info;
}

function test1 (data) {
    console.log(data[0]);
    console.log(data[1]);
    console.log(data[2]);
}




function populateEmail () {
    var gift = createGiftObject ();
    var gm_a = "<a href='https://mail.google.com/mail/u/0/?view=cm&amp;fs=1&amp;tf=1&amp;to=";
    var gm_b = gift.receiver_email;
    var gm_c = "&amp;su=A+gift!&amp;shva=1&amp;body=";
    var gm_d = gift.message;
    var gm_e = "&amp;'>create email</a>";
    var gmail_link = gm_a + gm_b + gm_c + gm_d + gm_e;
    
    $("#test1").append(gmail_link);
}

function createGiftObject () {
    var gift = {
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
    
    gift.sender_name_first =   $("#sender_name_first").val();
    gift.sender_name_last =    $("#sender_name_last").val();
    gift.sender_email =        $("#sender_email)").val();
    
    gift.receiver_name_first = $("#receiver_name_first").val();
    gift.receiver_name_last =  $("#receiver_name_last").val();
    gift.receiver_email =      $("#receiver_email)").val();
    gift.receiver_address =    $("#receiver_address)").val();
    
    gift.amount =              $("#gift_value").val();
    
    gift.type.beer =           $("#type_beer").is(":checked");
    gift.type.wine =           $("#type_wine").is(":checked");
    gift.type.tea =            $("#type_tea").is(":checked");
    gift.type.coffee =         $("#type_coffee").is(":checked");
    gift.type.chocolate =      $("#type_chocolate").is(":checked");
    
    gift.message =             $("#gift_message").val();
    
    console.log(JSON.stringify(gift));
    return gift;
}

//All below require Eva API info
//See here for local testing: https://github.com/typicode/json-server
function getData () {
  var root = 'http://localhost:3000';
  var data = {};
  var excluded_types = [];
  var name, email;
  
  jQuery.ajax({
    url: root + '/users?id=111',
    method: 'GET',
    success: function(data) {
        console.log("success!");
        console.log(data);
        //populateFields (data);
    },
    error: function(data) {
        console.log("error getting data!");
    }
  });
}

//Testing JSON values returned from db.json
function populateFields (data) {
    $("#test1").html(email);
/*     name = data[0].name;
    email = data[0].email;
    $("#user_name").text(name);
    $("#user_email").html(email);

    for (var i = 0; i < data[0].excluded_types.length; i++) {
        $("#exclude_types").append(data[0].excluded_types[i].name + "<br>");
    }
    
    populateEmail (); */
}


// POST filler
// Not tested
function postData() {
    jQuery.ajax({
        type: "POST",
        //dataType: "json",
        //async: false,
        url: "",
        data: {
            "Field1": $("#gift_value").val(),
            "Field2": $("#receiver_email").val(),
            "Field3": $("#gift_message").val(),
            "Field4": $("#type_beer").is(":checked"),
            "Field5": $("#type_wine").is(":checked"),
            "Field6": $("#type_tea").is(":checked"),
            "Field7": $("#type_coffee").is(":checked"),
            "Field8": $("#type_chocolate").is(":checked")
        },
        success: function(data) {
            console.log("success!");
        },
        error: function(data) {
            handleRequestError(data);
        }
    });
}
