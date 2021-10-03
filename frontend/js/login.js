//api setter
function setUrl(text){
  return "/aquaspace/backend/public/index.php?"+text;
}
//email validat
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }


  

//login script
$("#signIn").click(function(){
    var password = $("#password").val();
    var email = $("#email").val();
    var errFlag = 0;
    //email should be acording to the structure
    if(!isEmail(email)){
        alert("Please enter a valid email address");
        $("#email").focus();
        errFlag++;
    }
    //password should contains atleast one simple letter
    var lower = /(?=.*[a-z])/;
    if (!lower.test(password)){
        alert("Please enter a valid password");
        $("#password").focus();
        errFlag++;
    }
    //password should contain atleast 8 characters
    if(password.length < 8) {
        alert("Password must be at least 8 characters long");
        $("#password").focus();
        errFlag++;
    }

    //password should contain atleast one capital letter
    var upper = /(?=.*[A-Z])/;
  //password should contain atleast one capital letter
  if(!upper.test(password)){
      alert("password should contain atleast one capital letter");
      $("#password").focus();
      errFlag++;
  }

    //password should contain atleast one number digit
    const regDig = /\d/;
    if(!regDig.test(password)){
        alert("password should contain atleast one digit");
        $("#password").focus();
        errFlag++;
    }

    //password should contain atleast one special character
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(!format.test(password)){
        alert("password should contain atleast one special character");
        $("#password").focus();
        errFlag++;
    }   
    if(errFlag == 0){
      var req = {
        "email": email,
        "password": password,
    }
  $.ajax({
    type: "POST",
    url:setUrl("Authentication/requestLogin"),
    data: JSON.stringify(req),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
      var status = data.status;
      if(status == 1 ||status == 2 || status == 3 || status == 4 || stauts == 6){
        var redirect = data.redirect;
        window.location.replace(redirect);
      }else if(status == 5){
        alert("invalid credintial \n you have "+5-data.attemp+"left");
        $("#email").focus();
        $("#password").focus();
      }

    },
    error: function(errMsg) {
        //window.location.replace("../src/Error/"+errMsg.status+".html");
        console.log(errMsg);
    }
});
    
}
      
});

  