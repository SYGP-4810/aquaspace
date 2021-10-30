<<<<<<< HEAD
//email validated
=======
//api setter
function setUrl(text){
  return "/aquaspace/backend/public/index.php?"+text;
}
//email validat
>>>>>>> kalsha-new
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

<<<<<<< HEAD
function isPassword(password, cpassword) {
    if(password == cpassword){
        var lower = /(?=.*[a-z])/;
        if (!lower(passForm.passInput.value)) {
            alert("Password must contain at least one lower case letter.");
            passForm.passInput.focus();
            return false;
        }
        else
        //Validating length
        if ((passForm.passInput.value).length < 8) {
            alert("Your password has less than 8 characters.");
            passForm.passInput.focus();
            return false;
        }

        else
        //Validating confirmation input
        if (passForm.confirmPassInput.value == "") {
            alert("Please confirm your password.");
            passForm.passInput.focus();
            return false;
        }
        else
        //Validationg confirmation matches
        if (passForm.confirmPassInput.value != passForm.passInput.value) {
            alert("Your confirmation password does not match.");
            passForm.passInput.focus();
            return false;
        }

        return true;

    }
    else{
        //show error
        alert('password and confirm password are not matched')
    }

}

//login script
$("#signIn").click(function(){
    var pass = $("#password").val();
    var email = $("#email").val();
    $.ajax({
      url: "http://127.0.0.1/aquaspace/backend/public/index.php?/Authentication/requestLogin",
      data: {
        email: email,
        password : pass
      },
      success: function( result ) {
        $( "#weather-temp" ).html( "<strong>" + result + "</strong> degrees" );
      },
      fail: function(xhr, textStatus, errorThrown){
        alert('request failed');
     }
    });
  });
=======

  

//login script
$("#signIn").click(function(){
    var password = $("#password").val();
    var email = $("#email").val();
    var errFlag = 0;
    var errors = [];
    //email should be acording to the structure
    if(!isEmail(email)){
        errors.push("Please enter a valid email address");
        $("#email").focus();
        errFlag++;
    }
    //password should contains atleast one simple letter
    var lower = /(?=.*[a-z])/;
    if (!lower.test(password)){
        errors.push("Please enter a valid password");
        $("#password").focus();
        errFlag++;
    }
    //password should contain atleast 8 characters
    if(password.length < 8) {
        errors.push("Password must be at least 8 characters long");
        $("#password").focus();
        errFlag++;
    }

    //password should contain atleast one capital letter
    var upper = /(?=.*[A-Z])/;
  //password should contain atleast one capital letter
  if(!upper.test(password)){
      errors.push("password should contain atleast one capital letter");
      $("#password").focus();
      errFlag++;
  }

    //password should contain atleast one number digit
    const regDig = /\d/;
    if(!regDig.test(password)){
        errors.push("password should contain atleast one digit");
        $("#password").focus();
        errFlag++;
    }
    //password should contain atleast one special character
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(!format.test(password)){
        errors.push("password should contain atleast one special character")
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
      if(status == 1 ||status == 2 || status == 3 || status == 4 || status == 6 || status == 7){
        var redirect = data.redirect;
        console.log(data);
        window.location.replace(redirect);
      }else if(status == 5){
        console.log(data);
        alert(5-data.attempt+" attempts left");
        $("#email").focus();
        $("#password").focus();
      }else if(status == 7){
        alert(JSON.stringify(data.error));
      }

    },
    error: function(errMsg) {
        window.location.replace("../src/Error/"+errMsg.status+".html");
    }
});
    
}else{
  alert(JSON.stringify(errors));
}
      
});

  
>>>>>>> kalsha-new
