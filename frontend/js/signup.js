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

// form submission regular user
$("#submit1").click(function(e){
    //regular user insert
    var email = $("#email").val();
    var password = $("#password1").val();
    var cPassword = $("#cpassword1").val();
    var fName = $("#fName1").val();
    var lName = $("#lName1").val();
    var city = $("#city1").val();
    var address = $("#address1").val();
    var emailToken = $("#code2").val();
    //validation criteria
    if($('#checkbox1').not(":checked")){
        alert("you have to agree to the term and conditions");
        $("#checkbox1").focus();
        return false;
    }
    if(isEmail(email)){
        alert("enter email with correct format");
        $("#email").focus();
        return false;
    }
    if(password != cPassword){
        alert("password and confirm password shoud be equal");
        $("#password1").focus();
        $("#cPassword1").focus();
        return false;
    }
    if(password == ""){
        alert("enter password");
        $("#password1").focus();
        return false;
    }
    if(cPassword == ""){
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
     if(fName == ""){
         alert("first name is required");
         $("#fName1").focus();
         return false;
     }
     if(lName == ""){
         alert("last name is required");
         $("#lName1").focus();
         return false;
     }
     if(address == ""){
         alert("address is required");
         $("#address1").focus();
         return false;
     }
     if(city == ""){
         alert("city is required");
         $("#city1").focus();
         return false;
     }
     if(emailToken == ""){
         alert("email verification code is required");
         $("#code1").focus();
         return false;
     }
     $.ajax({
        url: "http://127.0.0.1/aquaspace/backend/public/index.php?/Authentication/signUpRegularUser",
        data: {
          email: email,
          password : password,
          cPassword : cPassword,
          address : address,
          fName : fName,
          lName : lName,
          city : city,
          emailToken : token

        },
        success: function( result ) {
        },
        fail: function(xhr, textStatus, errorThrown){
          alert('request failed');
          var status = xhr.status;
          window.location.replace("../src/Error/"+status+".html");
       }
      });

});

// form submission expert
$("#submit2").click(function(){
    var email = $("#email").val();
    var password = $("#password2").val();
    var cPassword = $("#cPassword2").val();
    var city = $("#city2").val();
    var address = $("#address2").val();
    var fName = $("#fName2").val();
    var lName = $("#lName2").val();
    var emailToken = $("#code2").val();
    if($('#checkbox1').not(":checked")){
        alert("you have to agree to the term and conditions");
        return false;
    }
    if(password != cPassword){
        alert("password and confirm password shoud be equal");
        $("#password2").focus();
        $("#cPassword2").focus();
        return false;
    }
    if(isEmail(email)){
        alert("enter email with correct format");
        return false;
    }
    if(password == ""){
        alert("enter password");
        $("#password1").focus();
        return false;
    }
    if(cPassword == ""){
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
     if(fName == ""){
         alert("first name is required");
         $("#fName1").focus();
         return false;
     }
     if(lName == ""){
         alert("last name is required");
         $("#lName1").focus();
         return false;
     }
     if(address == ""){
         alert("address is required");
         $("#address1").focus();
         return false;
     }
     if(city == ""){
         alert("city is required");
         $("#city1").focus();
         return false;
     }
     if(emailToken == ""){
         alert("should enter the verification code");
         $("#code2").focus();
     }
     //file upload
     var fd = new FormData();
     var files = $("#qualifications")[0].files[0];
     fd.append('qualifications',files);
     $.ajax({
        url: "http://127.0.0.1/aquaspace/backend/public/index.php?/Authentication/signUpExper",
        data: {
          fd,
          address : address,
          cPassword : cPassword,
          password : password,
          city : city,
          fName : fName,
          lName : lName,
          emailToken : emailToken

        },
        contentType : false,
        processData : false,
        success: function( result ) {
            
        },
        fail: function(xhr, textStatus, errorThrown){
          alert('request failed');
          var status = xhr.status;
          window.location.replace("../src/Error/"+status+".html");
       }
});

});


//form submit store

