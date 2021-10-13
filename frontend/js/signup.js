//api setter
function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

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
                url: setUrl("Authentication/emailVerificationTokenCreate"),
                data: JSON.stringify(req),
                acync:false, //check if keyword are correct
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    alert(data.msg);
                    if(data.status == 1){
                        location.reload();
                    }else if(data.status == 2){
                        location.reload();
                    }

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
    var erFlag = 0;
    var errors = [];
    //validation criteria
    if(tp == ""){
        errors.push("telephone number is required");
        $("#tp1").focus();
        erFlag++;
    }
    if(!($('#checkbox1').is(':checked'))){
        errors.push("you have to agree to the terms and conditions");
        $("#checkbox1").focus();
        erFlag ++;
    }
    if(!isEmail(email)){
        errors.push("enter email with correct format");
        $("#email").focus();
        erFlag ++;
    }
    if(password != cPassword){
        errors.push("password and confirm password should be the same");
        $("#password1").focus();
        $("#cPassword1").focus();
        erFlag ++;
    }
    if(password == ""){
        errors.push("enter the password");
        $("#password1").focus();
        erFlag ++;
    }
    if(cPassword == ""){
        errors.push("enter confirm password");
        $("#cPassword1").focus();
        erFlag ++;
    }
     //password should contains atleast one simple letter
     var lower = /(?=.*[a-z])/;
     if (!lower.test(password)){
         errors.push("password should contain atlest one simple letter");
         $("#password1").focus();
         erFlag ++;
     }
     //password should contain atleast 8 characters
     if(password.length < 8) {
         errors.push("Password must be at least 8 characters long");
         $("#password1").focus();
         erFlag ++;
     }
     
     var upper = /(?=.*[A-Z])/;
     //password should contain atleast one capital letter
     if(!upper.test(password)){
         errors.push("password should contain atleast one capital letter");
         $("#password1").focus();
         erFlag ++;
     }
      //password should contain atleast one number digit
     const regDig = /\d/;
     if(!regDig.test(password)){
         errors.push("password should contain atleast one digit");
         $("#password1").focus();
         erFlag ++;
     }
 
     //password should contain atleast one special character
     var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
     if(!format.test(password)){
         errors.push("password should contain atleast one special character");
         $("#password1").focus();
         erFlag ++;
     }
     if(fName == ""){
         errors.push("first name is required");
         $("#fName1").focus();
         erFlag ++;
     }
     if(lName == ""){
         errors.push("last name is required");
         $("#lName1").focus();
         erFlag ++;
     }
     if(address == ""){
         errors.push("address is required");
         $("#address1").focus();
         erFlag ++;
     }
     if(city == ""){
         errors.push("city is required");
         $("#city1").focus();
         erFlag ++;
     }
     if(emailToken == ""){
         errors.push("email verification code is required");
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
            url: setUrl("Authentication/signUpRegularUser"),
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                if(data.status ==1){
                    alert("please login");
                    window.location.replace("../src/login.html");
                    }else{
                        alert(JSON.stringify(data.error));
                    }
            },
            error: function(errMsg) {
                window.location.replace("../src/Error/"+errMsg.status+".html");
                //console.log(errMsg);
            }
        });
     }else{
         alert(JSON.stringify(errors));
     }
});

var qualificationExtension;
var qualificationFile;
//get the file extension of qualifications
$("#qualifications").change(function (e) {
    var fileName = e.target.files[0].name;
    fileExtension = fileName.split('.').pop();
    qualificationExtension = fileExtension.toLowerCase();
    qualificationFile = e.target.files[0];

 });

// form submission expert
$("#signUp2").click(function(){
    var email = $("#email").val();
    var password = $("#password2").val();
    var cPassword = $("#cPassword2").val();
    var fName = $("#fName2").val();
    var lName = $("#lName2").val();
    var city = $("#city2").val();
    var address = $("#address2").val();
    var emailToken = $("#code2").val();
    var tp = $("#tp2").val();
    var erFlag = 0;
    var errors = [];
    //validation criteria
    if(tp == ""){
        errors.push("telephone number is required");
        $("#tp2").focus();
        erFlag++;
    }
    if(!($('#checkbox2').is(':checked'))){
        errors.push("You have to agree to the terms and conditions");
        $("#checkbox2").focus();
        erFlag ++;
    }
    if(!isEmail(email)){
        errors.push("Please enter a valid email address");
        $("#email").focus();
        erFlag ++;
    }
    if(password != cPassword){
        errors.push("password and confirm password shoud be equal");
        $("#password2").focus();
        $("#cPassword2").focus();
        erFlag ++;
    }
    if(password == ""){
        errors.push("password is required");
        $("#password2").focus();
        erFlag ++;
    }
    if(cPassword == ""){
        errors.push("Confirm password password is required"); 
        $("#cPassword2").focus();
        erFlag ++;
    }
     //password should contains atleast one simple letter
     var lower = /(?=.*[a-z])/;
     if (!lower.test(password)){
         errors.push("password should contain atlest one simple letter");
         $("#password2").focus();
         erFlag ++;
     }
     //password should contain atleast 8 characters
     if(password.length < 8) {
         errors.push("password must contain at least 8 characters");
         $("#password2").focus();
         erFlag ++;
     }
     
     var upper = /(?=.*[A-Z])/;
     //password should contain atleast one capital letter
     if(!upper.test(password)){
         errors.push("password should contain at least one capital letter");
         $("#password2").focus();
         erFlag ++;
     }
 
     //password should contain atleast one number digit
     const regDig = /\d/;
     if(!regDig.test(password)){
         errors.push("password should contain at least one digit");
         $("#password2").focus();
         erFlag ++;
     }
 
     //password should contain atleast one special character
     var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
     if(!format.test(password)){
         errors.push("password should contain atleast one special character");
         $("#password2").focus();
         erFlag ++;
     }
     if(fName == ""){
         errors.push("first name is required");
         $("#fName2").focus();
         erFlag ++;
     }
     if(lName == ""){
         errors.push("last name is required");
         $("#lName2").focus();
         erFlag ++;
     }
     if(address == ""){
         errors.push("address is required");
         $("#address2").focus();
         erFlag ++;
     }
     if(city == ""){
         errors.push("city is required");
         $("#city2").focus();
         erFlag ++;
     }
     if(emailToken == ""){
         errors.push("email verification code is required");
         $("#code2").focus();
         erFlag ++;
     }
    
     //check if the file name is taken;
     const acceptedFileTypes = ["png", "jpg", "jpeg"];
     if(acceptedFileTypes.indexOf(qualificationExtension)===-1){
         errors.push("qualification file type must be jpg ,jpeg or png");
         $("#qualifications").focus();
         erFlag ++;
     }
     if(erFlag == 0){
         //convert image to base64
        var file = ""; 
        var reader = new FileReader();
        reader.readAsDataURL(qualificationFile);
        reader.onload = function () {
        //console.log(reader.result);//base64encoded string
            file = reader.result;
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
                "tp":tp,
                "qualifications":file,
                "qualificationExtension": qualificationExtension
            }
        
          $.ajax({
            type: "POST",
            url:setUrl("Authentication/signUpExpert"),
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                if(data.status ==1){
                alert("wait until admin verify you may have email about confirm");
                window.location.replace("/aquaspace/frontend/src/");
                }else{
                    if(data.stastus ==1){
                        window.location.replace("../src/login.html");
                        }else{
                            alert(JSON.stringify(data.error));
                        }
                }

            },
            error: function(errMsg) {
               window.location.replace("../src/Error/"+errMsg.status+".html");
            }
        });
        }
        reader.onerror = function (error) {
         //console.log('Error: ', error);
            alert(error);
            //window.location.replace("../src/Error/"+errMsg.status+".html");

        }
        
     }else{
         alert(JSON.stringify(errors));
     }

});


//form submit store
$("#signUp3").click(function(){
    var email = $("#email").val();
    var password = $("#password3").val();
    var cPassword = $("#cPassword3").val();
    var address = $("#address3").val();
    var emailToken = $("#code3").val();
    var tp = $("#tp3").val();
    var cName =  $("#cName").val();
    var manNIC = $("#manNIC").val();
    var mName = $("#manName").val();
    var regNo = $("#regNo").val();
    var city = $("#city3").val();
    var deliveryMethod = 0;
    if(($('#inStorePickUp').is(':checked'))){
        deliveryMethod+= 1;
    }
    if(($('#inStoreDelivery').is(':checked'))){
        deliveryMethod+= 2
    }
    if(($('#thirdPartyDelivery').is(':checked'))){
        deliveryMethod+= 4;
    }

    var erFlag = 0;
    var errors = [];
    //validation criteria
    if(cName == ""){
        errors.push("company name is required");
        $("#cName").focus();
        erFlag ++;
    }
    if(manNIC == ""){
        errors("manager NIC is required");
        $("#manNIC").focus();
        erFlag ++;
    }
    if(mName == ""){
        errors.push("manager name is required");
        $("#manName").focus();
        erFlag ++;
    }
    if(regNo == ""){
        $("#regNo").focus();
        errors.push("registration Number is required");
        erFlag ++;
    }
    if(tp == ""){
        errors.push("telephone number is required");
        $("#tp3").focus();
        erFlag++;
    }
    if(!($('#checkbox3').is(':checked'))){
        errors.push("You have to agree to the terms and conditions");
        $("#checkbox3").focus();
        erFlag ++;
    }
    if(!isEmail(email)){
        errors.push("enter email with correct format");
        $("#email").focus();
        erFlag ++;
    }
    if(password != cPassword){
        errors.push("password and confirm password shoud be equal");
        $("#password3").focus();
        $("#cPassword3").focus();
        erFlag ++;
    }
    if(password == ""){
        errors.push("enter password");
        $("#password3").focus();
        erFlag ++;
    }
    if(cPassword == ""){
        errors.push("enter confirm password");
        $("#cPassword3").focus();
        erFlag ++;
    }
     //password should contains atleast one simple letter
     var lower = /(?=.*[a-z])/;
     if (!lower.test(password)){
         errors.push("password should contain atlest one simple letter");
         $("#password3").focus();
         erFlag ++;
     }
     //password should contain atleast 8 characters
     if(password.length < 8) {
        errors.push("password must contain at least 8 characters long");
         $("#password3").focus();
         erFlag ++;
     }
     
     var upper = /(?=.*[A-Z])/;
     //password should contain atleast one capital letter
     if(!upper.test(password)){
         errors.push("password should contain at least one capital letter");
         $("#password3").focus();
         erFlag ++;
     }
 
     //password should contain atleast one number digit
     const regDig = /\d/;
     if(!regDig.test(password)){
         errors.push("password should contain atleast one digit");
         $("#password3").focus();
         erFlag ++;
     }
 
     //password should contain atleast one special character
     var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
     if(!format.test(password)){
         errors.push("password should contain atleast one special character");
         $("#password3").focus();
         erFlag ++;
     }
     if(address == ""){
         errors.push("address is required");
         $("#address3").focus();
         erFlag ++;
     }
     if(city == ""){
         errors.push("city is required");
         $("#city3").focus();
         erFlag ++;
     }
     if(emailToken == ""){
         errors.push("email verification code is required");
         $("#code3").focus();
         erFlag ++;
     }
     if(erFlag == 0){
         
        var req = {
            "email": email,
            "password": password,
            "cPassword":cPassword ,
            "cName": cName,  
            "address": address,
            "city": city,
            "emailToken": emailToken,
            "tp":tp,
            "manNIC": manNIC,
            "manName":mName,
            "regNo": regNo,
            "deliveryMethod": deliveryMethod
        }
          $.ajax({
            type: "POST",
            url: setUrl("Authentication/signUpStore"),
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                if(data.status ==1){
                    alert("wait until admin verify you may have email about confirm");
                    window.location.replace("/aquaspace/frontend/src/");
                    }else{
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

