//email validate
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

$("#save123").click(function(){
    let fName = $("#fName").val();
    let lName = $("#lName").val();
    let email = $("#email").val();
    let address = $("#address").val();
    let telNo = $("#telNo").val();
    let city = $("#city").val();
    //validate process
    var errFlag = 0;
    var errors = [];
    if(fName ==''){
        errors.push("First Name required");
        errFlag++;
    }
    if(lName == ''){
        errors.push("last name required");
        errFlag++;
    }
    if(email == ''){
        errors.push("email is required");
        errFlag++;
    }
    if(!isEmail(email)){
        errors.push("email is not in correct format");
        errFlag++;
    }
    if(address == ''){
        errors.push("address is required");
        errFlag++;
    }
    if(telNo == ''){
        errors.push("telephone number is required");
        errFlag++;
    }
    if(city == ''){
        errors.push("city is required");
        errFlag++;
    }
    if(errFlag == 0){
        var req = {
            "fName" : fName,
            "lName" : lName,
            "email" : email,
            "address" : address,
            "telNo" : telNo,
            "city" : city

        }
        loading();
        $.ajax({
            type: "POST",
            url:setUrl("Admin/Admin/addAdmin"),
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
               loadingFinish();
                if(data.status == 1){
                    $("#email").focus();
                    errorShow([data.msg]);
                }else if(data.status == 2){
                    alertMsg([data.msg]);
                    delay(function(){
                        window.location.replace("/aquaspace/frontend/src/Admin/AdminAdmins.html");
                    },5000);
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

$("#updatePass").click(function(){
    let currentPassword = $("#cupass").val();
    let newPass = $("#newpass").val();
    let cPass = $("#conpass").val();
    let errors = [];
    let errFlag = 0;
    if(newPass == currentPassword) {
        $("#cupass").focus();
        $("#newpass").focus();
        errors.push("new password should not be equal to the current password");
    }
    if(newPass != cPass){
        errors.push("new password should be equal to the new confirms password");
        $("#conpass").focus();
        $("newpass").focus();
    }
    //password should contains atleast one simple letter
    var lower = /(?=.*[a-z])/;
    if (!lower.test(newPass)){
        errors.push("Please enter a valid password");
        $("#newpass").focus();
        errFlag++;
    }
    //password should contain atleast 8 characters
    if(newPass.length < 8) {
        errors.push("Password must be at least 8 characters long");
        $("#newpass").focus();
        errFlag++;
    }

    //password should contain atleast one capital letter
    var upper = /(?=.*[A-Z])/;
  //password should contain atleast one capital letter
  if(!upper.test(newPass)){
      errors.push("password should contain atleast one capital letter");
      $("#newpass").focus();
      errFlag++;
  }

    //password should contain atleast one number digit
    const regDig = /\d/;
    if(!regDig.test(newPass)){
        errors.push("password should contain atleast one digit");
        $("#newpass").focus();
        errFlag++;
    }
    //password should contain atleast one special character
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(!format.test(newPass)){
        errors.push("password should contain atleast one special character")
        $("#newpass").focus();
        errFlag++;
    }
    if(errFlag == 0){
        let req = {
            "currentPassword" : currentPassword,
            "newPassword" : newPass
        }
        loading();
        $.ajax({
            type: "POST",
            url:setUrl("Admin/Admin/updatePassword"),
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                loadingFinish();
                if(data.status == 1){
                    errorShow([data.msg]);
                }
                else if(data.status == 2){
                    errorShow([data.msg]);
                }else if(data.status == 3){
                    alertMsg([data.msg]);
                    delay(function(){
                        window.location.replace("/aquaspace/frontend/src/Admin/AdminHome.html");
                    },5000);
                   
                }
        
            },
            error: function(errMsg) {
                loadingFinish();
                window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
            }
        });

    }
    else{
        errorShow(errors);
    }


    
});