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
            
            // The key needs to match your method's input parameter (case-sensitive).
            var req = {"email": email};
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1/aquaspace/backend/public/index.php?Authentication/emailVerificationTokenCreate",
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    alert(data.msg);
                },
                error: function(errMsg) {
                    window.location.replace("../src/Error/"+errMsg.status+".html");
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

});




// form submission regular user
$("#signUp1").click(function(e){
    var email = $("#email").val();
    var password = $("#password1").val();
    var cPassword = $("#cPassword1").val();
    var fName = $("#fName1").val();
    var lName = $("#lName1").val();
    var city = $("#city1").val();
    var address = $("#address1").val();
    var emailToken = $("#code1").val();
    var tp = $("#tp1").val();
    alert(tp);
    var erFlag = 0;
    //validation criteria
    if(tp == ""){
        alert("telephone number is required");
        $("#tp").focus();
        erFlag++;
    }
    if(!($('#checkbox1').is(':checked'))){
        alert("you have to agree to the term and conditions");
        $("#checkbox1").focus();
        erFlag ++;
    }
    if(!isEmail(email)){
        alert("enter email with correct format");
        $("#email").focus();
        erFlag ++;
    }
    if(password != cPassword){
        alert("password and confirm password shoud be equal");
        $("#password1").focus();
        $("#cPassword1").focus();
        erFlag ++;
    }
    if(password == ""){
        alert("enter password");
        $("#password1").focus();
        erFlag ++;
    }
    if(cPassword == ""){
        alert("enter confirm password");
        $("#cPassword1").focus();
        erFlag ++;
    }
     //password should contains atleast one simple letter
     var lower = /(?=.*[a-z])/;
     if (!lower.test(password)){
         alert("password should contain atlest one simple letter");
         $("#password1").focus();
         erFlag ++;
     }
     //password should contain atleast 8 characters
     if(password.length < 8) {
         alert("Password must be at least 8 characters long");
         $("#password1").focus();
         erFlag ++;
     }
     
     var upper = /(?=.*[A-Z])/;
     //password should contain atleast one capital letter
     if(!upper.test(password)){
         alert("password should contain atleast one capital letter");
         $("#password1").focus();
         erFlag ++;
     }
 
     //password should contain atleast one number digit
     const regDig = /\d/;
     if(!regDig.test(password)){
         alert("password should contain atleast one digit");
         $("#password1").focus();
         erFlag ++;
     }
 
     //password should contain atleast one special character
     var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
     if(!format.test(password)){
         alert("password should contain atleast one special character");
         $("#password1").focus();
         erFlag ++;
     }
     if(fName == ""){
         alert("first name is required");
         $("#fName1").focus();
         erFlag ++;
     }
     if(lName == ""){
         alert("last name is required");
         $("#lName1").focus();
         erFlag ++;
     }
     if(address == ""){
         alert("address is required");
         $("#address1").focus();
         erFlag ++;
     }
     if(city == ""){
         alert("city is required");
         $("#city1").focus();
         erFlag ++;
     }
     if(emailToken == ""){
         alert("email verification code is required");
         $("#code1").focus();
         erFlag ++;
     }
     if(erFlag == 0){
        // The key needs to match your method's input parameter (case-sensitive).
        var req = {
            "email": email,
            "password": password,
            "cPassword":cPassword ,
            "fName": fName, 
            "lName": lName, 
            "address": address,
            "city": city,
            "emailToken": emailToken,
            "tp":tp
        }
          $.ajax({
            type: "POST",
            url: "http://127.0.0.1/aquaspace/backend/public/index.php?Authentication/signUpRegularUser",
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                alert("please login");
                window.location.replace("../src/login.html");
            },
            error: function(errMsg) {
                window.location.replace("../src/Error/"+errMsg.status+".html");
            }
        });
     }
});



// form submission expert
$("#signUp2").click(function(){
    var email = $("#email").val();
    var password = $("#password").val();
    var cPassword = $("#cPassword2").val();
    var fName = $("#fName2").val();
    var lName = $("#lName2").val();
    var city = $("#city2").val();
    var address = $("#address2").val();
    var emailToken = $("#code2").val();
    var tp = $("#tp2").val();
    alert(tp);
    var erFlag = 0;
    //validation criteria
    if(tp == ""){
        alert("telephone number is required");
        $("#tp").focus();
        erFlag++;
    }
    if(!($('#checkbox1').is(':checked'))){
        alert("you have to agree to the term and conditions");
        $("#checkbox1").focus();
        erFlag ++;
    }
    if(!isEmail(email)){
        alert("enter email with correct format");
        $("#email").focus();
        erFlag ++;
    }
    if(password != cPassword){
        alert("password and confirm password shoud be equal");
        $("#password1").focus();
        $("#cPassword1").focus();
        erFlag ++;
    }
    if(password == ""){
        alert("enter password");
        $("#password1").focus();
        erFlag ++;
    }
    if(cPassword == ""){
        alert("enter confirm password");
        $("#cPassword1").focus();
        erFlag ++;
    }
     //password should contains atleast one simple letter
     var lower = /(?=.*[a-z])/;
     if (!lower.test(password)){
         alert("password should contain atlest one simple letter");
         $("#password1").focus();
         erFlag ++;
     }
     //password should contain atleast 8 characters
     if(password.length < 8) {
         alert("Password must be at least 8 characters long");
         $("#password1").focus();
         erFlag ++;
     }
     
     var upper = /(?=.*[A-Z])/;
     //password should contain atleast one capital letter
     if(!upper.test(password)){
         alert("password should contain atleast one capital letter");
         $("#password1").focus();
         erFlag ++;
     }
 
     //password should contain atleast one number digit
     const regDig = /\d/;
     if(!regDig.test(password)){
         alert("password should contain atleast one digit");
         $("#password1").focus();
         erFlag ++;
     }
 
     //password should contain atleast one special character
     var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
     if(!format.test(password)){
         alert("password should contain atleast one special character");
         $("#password1").focus();
         erFlag ++;
     }
     if(fName == ""){
         alert("first name is required");
         $("#fName1").focus();
         erFlag ++;
     }
     if(lName == ""){
         alert("last name is required");
         $("#lName1").focus();
         erFlag ++;
     }
     if(address == ""){
         alert("address is required");
         $("#address1").focus();
         erFlag ++;
     }
     if(city == ""){
         alert("city is required");
         $("#city1").focus();
         erFlag ++;
     }
     if(emailToken == ""){
         alert("email verification code is required");
         $("#code1").focus();
         erFlag ++;
     }
     if(erFlag == 0){
        var req = {
            "email": email,
            "password": password,
            "cPassword":cPassword ,
            "fName": fName, 
            "lName": lName, 
            "address": address,
            "city": city,
            "emailToken": emailToken,
            "tp":tp
        }
          $.ajax({
            type: "POST",
            url: "http://127.0.0.1/aquaspace/backend/public/index.php?Authentication/signUpRegularUser",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                alert("please login");
                window.location.replace("../src/login.html");
            },
            error: function(errMsg) {
                window.location.replace("../src/Error/"+errMsg.status+".html");
            }
        });
     }

});


//form submit store
$("#signUp3").click(function(){
    var email = $("#email").val();
    var password = $("#password1").val();
    var cPassword = $("#cPassword1").val();
    var fName = $("#fName1").val();
    var lName = $("#lName1").val();
    var city = $("#city1").val();
    var address = $("#address1").val();
    var emailToken = $("#code1").val();
    var tp = $("#tp1").val();
    alert(tp);
    var erFlag = 0;
    //validation criteria
    if(tp == ""){
        alert("telephone number is required");
        $("#tp").focus();
        erFlag++;
    }
    if(!($('#checkbox1').is(':checked'))){
        alert("you have to agree to the term and conditions");
        $("#checkbox1").focus();
        erFlag ++;
    }
    if(!isEmail(email)){
        alert("enter email with correct format");
        $("#email").focus();
        erFlag ++;
    }
    if(password != cPassword){
        alert("password and confirm password shoud be equal");
        $("#password1").focus();
        $("#cPassword1").focus();
        erFlag ++;
    }
    if(password == ""){
        alert("enter password");
        $("#password1").focus();
        erFlag ++;
    }
    if(cPassword == ""){
        alert("enter confirm password");
        $("#cPassword1").focus();
        erFlag ++;
    }
     //password should contains atleast one simple letter
     var lower = /(?=.*[a-z])/;
     if (!lower.test(password)){
         alert("password should contain atlest one simple letter");
         $("#password1").focus();
         erFlag ++;
     }
     //password should contain atleast 8 characters
     if(password.length < 8) {
         alert("Password must be at least 8 characters long");
         $("#password1").focus();
         erFlag ++;
     }
     
     var upper = /(?=.*[A-Z])/;
     //password should contain atleast one capital letter
     if(!upper.test(password)){
         alert("password should contain atleast one capital letter");
         $("#password1").focus();
         erFlag ++;
     }
 
     //password should contain atleast one number digit
     const regDig = /\d/;
     if(!regDig.test(password)){
         alert("password should contain atleast one digit");
         $("#password1").focus();
         erFlag ++;
     }
 
     //password should contain atleast one special character
     var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
     if(!format.test(password)){
         alert("password should contain atleast one special character");
         $("#password1").focus();
         erFlag ++;
     }
     if(fName == ""){
         alert("first name is required");
         $("#fName1").focus();
         erFlag ++;
     }
     if(lName == ""){
         alert("last name is required");
         $("#lName1").focus();
         erFlag ++;
     }
     if(address == ""){
         alert("address is required");
         $("#address1").focus();
         erFlag ++;
     }
     if(city == ""){
         alert("city is required");
         $("#city1").focus();
         erFlag ++;
     }
     if(emailToken == ""){
         alert("email verification code is required");
         $("#code1").focus();
         erFlag ++;
     }
     if(erFlag == 0){
        var req = {
            "email": email,
            "password": password,
            "cPassword":cPassword ,
            "fName": fName, 
            "lName": lName, 
            "address": address,
            "city": city,
            "emailToken": emailToken,
            "tp":tp
        }
          $.ajax({
            type: "POST",
            url: "http://127.0.0.1/aquaspace/backend/public/index.php?Authentication/signUpRegularUser",
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                alert("please login");
                window.location.replace("../src/login.html");
            },
            error: function(errMsg) {
                window.location.replace("../src/Error/"+errMsg.status+".html");
            }
        });
     }
});

