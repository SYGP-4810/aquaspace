//email validat
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }


function isUpper(str) {
    return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}

//login script
$("#signIn").click(function(){
    var pass = $("#password").val();
    var email = $("#email").val();
    //email should be acording to the structure
    if(isEmail(email)){
        alert("Please enter a valid email address");
        $("#email").focus();
        return false;
    }
    //password should contains atleast one simple letter
    var lower = /(?=.*[a-z])/;
    if (!lower(pass)){
        alert("Please enter a valid password");
        $("#password").focus();
        return false;
    }
    //password should contain atleast 8 characters
    if(pass.length < 8) {
        alert("Password must be at least 8 characters long");
        $("#password").focus();
        return false;
    }

    //password should contain atleast one capital letter
    if(!isUpper(pass)){
        alert("password should contain atleast one capital letter");
        $("#password").focus();
        return false;
    }

    //password should contain atleast one number digit
    const regDig = /\d/;
    if(!regDig.test(pass)){
        alert("password should contain atleast one digit");
        $("#password").focus();
        return false;
    }

    //password should contain atleast one special character
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(!format.test(string)){
        alert("password should contain atleast one special character");
        $("#password").focus();
        return false;
    }   
    $.ajax({
      url: "http://127.0.0.1/aquaspace/backend/public/index.php?/Authentication/requestLogin",
      data: {
        email: email,
        password : pass
      },
      success: function( result ) {
          const status = result.status;
          if(status == 1){
            window.location.replace("../src/Error/restrict.html");
          }
          else if(status == 2){

          }else if(status == 4 || status == 3){
            var redirect = result.redirect;
            window.location.replace(redirect);
          }else if(status == 5){
            alert("invalid credintial");
            $("#email").focus();
            $("#password").focus();
          }
      },
      fail: function(xhr, textStatus, errorThrown){
        alert('request failed');
        var status = xhr.status;
        window.location.replace("../src/Error/"+status+".html");
     }
    });
  });