function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

$("#updatePass").click(function(){
    console.log("Update");
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
        $.ajax({
            type: "POST",
            url:setUrl("Store/Store/updatePassword"),
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                if(data.status == 1){
                    errorShow([data.msg]);
                }
                else if(data.status == 2){
                    errorShow([data.msg]);
                }else if(data.status == 3){
                    alertMsg([data.msg]);
                    delay(function(){
                        window.location.replace("/aquaspace/frontend/src/Store/StoreHome.html");
                    },5000);
                   
                }
        
            },
            error: function(errMsg) {
                window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
            }
        });

    }
    else{
        errorShow(errors);
    }


    
});