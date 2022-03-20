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
  loading();
  $.ajax({
    type: "POST",
    url:setUrl("Authentication/requestLogin"),
    data: JSON.stringify(req),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
      loadingFinish();
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
      window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    }
});
    
}else{
  errorShow(errors);
}
      
});

  
