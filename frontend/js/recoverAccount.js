$("#reset-password").click(function(){
    var errors = [];
    var password = $("#pwd").val();
    var cPassword = $("#con-pwd").val();

    var errFlag =  0;
    if(cPassword != password){
        errors.push("password and confirm password should be equal");
        $("#pwd").focus();
        $("#con-pwd").focus();
        errFlag++;
    }

    //password should contains atleast one simple letter
    var lower = /(?=.*[a-z])/;
    if (!lower.test(password)){
        errors.push("Please enter a valid password");
        $("#pwd").focus();
        errFlag++;
    }
    //password should contain atleast 8 characters
    if(password.length < 8) {
        errors.push("Password must be at least 8 characters long");
        $("#pwd").focus();
        errFlag++;
    }

    //password should contain atleast one capital letter
    var upper = /(?=.*[A-Z])/;
  //password should contain atleast one capital letter
  if(!upper.test(password)){
      errors.push("password should contain atleast one capital letter");
      $("#pwd").focus();
      errFlag++;
  }

    //password should contain atleast one number digit
    const regDig = /\d/;
    if(!regDig.test(password)){
        errors.push("password should contain atleast one digit")
        $("#pwd").focus();
        errFlag++;
    }

    //password should contain atleast one special character
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(!format.test(password)){
        errors.push("password should contain atleast one special character")
        $("#pwd").focus();
        errFlag++;
    }
    if(errFlag == 0){
        var url_string = window.location.href;
        var url = new URL(url_string);
        let id = url.searchParams.get("id");
        var req = {"id":id,
        "password":password,
        "cPassword":cPassword
        };
        loading();
        $.ajax({
            type: "POST",
            url:setUrl("Authentication/recover"),
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                loadingFinish();
                if(data.status == 1){
                    alert(data.msg);
                }else if(data.status == 2){
                    alert(data.msg);
                    $("#pwd").focus();
                }else if(data.status == 3){
                    alert(data.msg);
                    alert("please login");
                    window.location.replace("/aquaspace/frontend/src/login.html");
                }
                
              
        
            },
            error: function(errMsg) {
                window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
            }
        });
    }else{
        errorShow(errMsg);
    }
    
});