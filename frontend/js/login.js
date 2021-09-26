//email validated
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

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