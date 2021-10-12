//api setter
function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
  }
//email validat
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

$("#save").click(function(){
    let fName = $("#fName").val();
    let lName = $("#lName").val();
    let email = $("#email").val();
    let address = $("#address").val();
    let telNo = $("#telNo").val();
    let city = $("#city").val();
    //validate process
    var errFlag = 0;
    var errors = {};
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
        $.ajax({
            type: "POST",
            url:setUrl("Admin/Admin/addAdmin"),
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
            alert("addmin was added");
        
            },
            error: function(errMsg) {
                window.location.replace("../src/Error"+errMsg.status+".html");
            }
        });

    }else{
        alert(errors);
    }


});