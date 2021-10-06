//api setter
function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
  }
//email validate
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

$("#submit").click(function() {
    var email = $("#email").val();
    if(!isEmail(email)){
        alert("Please enter a valid email");
    }else{
        var req = {
            "email": email
        }
      $.ajax({
        type: "POST",
        url:setUrl("Authentication/recoverEmailVerificationCreate"),
        data: JSON.stringify(req),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            if(data.status == 1){
                alert(data.msg);
            }else if(data.status == 2){
                alert(data.msg)
                $("#email").focus();
            }

        },
        error: function(errMsg) {
            window.location.replace("../src/Error/"+errMsg.status+".html");
        }
    });
    }
})