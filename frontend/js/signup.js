$(".tab:not(:first)").hide();
$(".form-delivery").hide();

// Selecting user type 
$(".next").click(function(e) {
    $(".tab").hide();
    $(".tab").eq($(".tab").index()).show();
    
    // Update step
    var x = document.getElementsByClassName("step");
    x[0].className = x[0].className.replace(" active", " disabled");
    x[1].className += " active";
})

//email validate
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

// verify email
$(".verify").click(function(e){
    var email = $("#email").val();
    if(isEmail(email)){
        $.ajax({
            url: "http://127.0.0.1/aquaspace/backend/public/index.php?/Authentication/emailVerificationTokenCreate",
            data: {
              email: email
            },
            success: function( result ) {
                alert(result);
            },
            fail: function(xhr, textStatus, errorThrown){
              alert('request failed');
              var status = xhr.status;
              window.location.replace("../src/Error/"+status+".html");
           }
          });
        $(".tab").hide();
        if($("input[name='selection']:checked").val() == 'value-1') {
        $(".tab").eq(2).show();
        } else if($("input[name='selection']:checked").val() == 'value-2') {
        $(".tab").eq(3).show();
        } else if($("input[name='selection']:checked").val() == 'value-3') {
        $(".tab").eq(4).show();

    }
    var x = document.getElementsByClassName("step");
    x[1].className = x[1].className.replace(" active", " disabled");
    x[2].className += " active";
    }else{
        alert("enter email with correct format");
    }

    

    
})

// form submission
$("#submit1").click(function(e){
    //regular user insert
    var email = $("#email").val();
    var password = $("#password1").val();
    var cpassword = $("#cpassword1").val();
    var fName = $("#fName1").val();
    var lName = $("#lName1").val();
    var city = $("#city1").val();
    var address = $("#address1").val();
    if(isEmail(email)){
        alert("enter email with correct format");
        return false;
    }
    if(password == ""){
        alert("enter password");
        $("#password1").focus();
        return false;
    }
    if(cpassword == ""){
        alert("enter confirm password");
        $("#cPassword1").focus();
        return false;
    }
     //password should contains atleast one simple letter
     var lower = /(?=.*[a-z])/;
     if (!lower(password)){
         alert("Please enter a valid password");
         $("#password1").focus();
         return false;
     }
     //password should contain atleast 8 characters
     if(password.length < 8) {
         alert("Password must be at least 8 characters long");
         $("#password1").focus();
         return false;
     }
 
     //password should contain atleast one capital letter
     if(!isUpper(password)){
         alert("password should contain atleast one capital letter");
         $("#password1").focus();
         return false;
     }
 
     //password should contain atleast one number digit
     const regDig = /\d/;
     if(!regDig.test(password)){
         alert("password should contain atleast one digit");
         $("#password1").focus();
         return false;
     }
 
     //password should contain atleast one special character
     var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
     if(!format.test(password)){
         alert("password should contain atleast one special character");
         $("#password1").focus();
         return false;
     }

    
})

// function validate()