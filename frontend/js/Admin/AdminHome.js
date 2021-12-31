$(document).ready(function(){
    $.ajax({
        type: "GET",
        url:setUrl("Admin/Admin/getDetailsToHome"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            $("#countAdmin").html(`${data.numberOfActiveAdmins}`);
            $("#expertRequestCount").html(`${data.numberOfExpertVerification}`);
            $("#storeRequestCount").html(`${data.numberOfStoreVerification}`);
            $("#appealAccountCount").html(`${data.numberOfAccountAppeal}`);
            $("#ProductBlockCount").html(`${data.numberOfProductAppeal}`);
           
        },
        error: function(errMsg) {
             window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
     
});