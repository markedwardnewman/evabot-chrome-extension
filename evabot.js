$("#gift_form").on("submit", function(e) {
    e.preventDefault();
    
    //Not yet sure how the information will be passed
    populateEmail ();
    //postData();
});

function populateEmail () {
    var gift = createGiftObject ();
    var gm_a = "<a href='https://mail.google.com/mail/u/0/?view=cm&amp;fs=1&amp;tf=1&amp;to=";
    var gm_b = gift.receiver;
    var gm_c = "&amp;su=A+gift!&amp;shva=1&amp;body=";
    var gm_d = gift.message;
    var gm_e = "&amp;'>create email</a>";
    var gmail_link = gm_a + gm_b + gm_c + gm_d + gm_e;
    
    $("#test1").append(gmail_link);
}

function createGiftObject () {
    var gift = {
        amount: 0,
        receiver: null,
        message: null,
        types: {
            beer: false,
            wine: false,
            tea: false,
            coffee: false,
            chocolate: false
        }
    };
    
    gift.amount = $("#gift_value").val();
    gift.receiver = $("#gift_receiver").val();
    gift.message = $("#gift_message").val();
    gift.types.beer = $("#gift_type_beer").is(":checked");
    gift.types.wine = $("#gift_type_wine").is(":checked");
    gift.types.tea = $("#gift_type_tea").is(":checked");
    gift.types.coffee = $("#gift_type_coffee").is(":checked");
    gift.types.chocolate = $("#gift_type_chocolate").is(":checked");
    
    console.log(JSON.stringify(gift));
    return gift;
}

//All below require Eva API info
//See here for local testing: https://github.com/typicode/json-server
function getData () {
  var root = 'http://localhost:3000';
  var data = {};
  var excluded_gift_types = [];
  var name, email;
  
  $.ajax({
    url: root + '/users?id=111',
    method: 'GET',
    success: function(data) {
        console.log("success!");
        populateFields (data);
    },
    error: function(data) {
        console.log("error getting data!");
    }
  });
}

//Testing JSON values returned from db.json
function populateFields (data) {
    name = data[0].name;
    email = data[0].email;
    $("#user_name").text(name);
    $("#user_email").html(email);

    for (var i = 0; i < data[0].excluded_gift_types.length; i++) {
        $("#exclude_types").append(data[0].excluded_gift_types[i].name + "<br>");
    }
    
    populateEmail ();
}


// POST filler
// Not tested
function postData() {
    $.ajax({
        type: "POST",
        //dataType: "json",
        //async: false,
        url: "",
        data: {
            "Field1": $("#gift_value").val(),
            "Field2": $("#gift_receiver").val(),
            "Field3": $("#gift_message").val(),
            "Field4": $("#gift_type_beer").is(":checked"),
            "Field5": $("#gift_type_wine").is(":checked"),
            "Field6": $("#gift_type_tea").is(":checked"),
            "Field7": $("#gift_type_coffee").is(":checked"),
            "Field8": $("#gift_type_chocolate").is(":checked")
        },
        success: function(data) {
            console.log("success!");
        },
        error: function(data) {
            handleRequestError(data);
        }
    });
}
