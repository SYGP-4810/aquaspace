//api setter

function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
  }

var url = new URL(window.location.href);
var id = url.searchParams.get("id");
var type = url.searchParams.get("type");
var tel = url.searchParams.get("tel");
var typeString = '';

$(document).ready(function(e){
    if(type == 2){
        let req = {"id":id};
        $.ajax({
            type: "POST",
            url:setUrl("Admin/Admin/getAdminVerifyDetailsExpert"),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(req),
            success: function(data){
                    console.log(data);                   
                    let name = data.expert.first_name + " " + data.expert.last_name;
                    $("#Verify-list-details").append(`
                        <tr>
                            <td>User Name</td>
                            <td>${name}</td>
                        <tr>
                        <tr>
                            <td>Email</td>
                            <td>${data.user.email}</td>
                        </tr>
                        <tr>
                            <td>Telephone</td>
                            <td>${data.user.tp}</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>${data.expert.city}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>${data.expert.address}</td>
                        </tr>
                        <tr>
                            <td>Bank Name</td>
                            <td>${data.expert.bank_name}</td>
                        </tr>
                        <tr>
                            <td>Branch Code</td>
                            <td>${data.expert.branch_id}</td>
                        </tr>
                        <tr>
                            <td>Account number</td>
                            <td>${data.expert.account_no}</td>
                        </tr>
                        <tr>
                            <td>Qualification</td>
                            <td><img src="/aquaspace/frontend/images/qualifications/${data.expert.qualification}" alt="qualification" style="width:60%"></td>
                        </tr>
                    `);
                    
               
            },
            error: function(errMsg) {
                window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
            }
        });

    }else if(type == 3){
        let req = {"id":id};
        $.ajax({
            type: "POST",
            url:setUrl("Admin/Admin/getAdminVerifyDetailsStore"),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(req),
            success: function(data){
                    $("#Verify-list-details").html(`<tr>
                        <td>Company Name</td>
                        <td>${data.company_name}</td>
                    </tr>
                    <tr>
                        <td>Registration No</td>
                        <td>${data.registration_num}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>${data.address}</td>
                    </tr>
                    <tr>
                        <td>Telephone NO</td>
                        <td>${tel}</td>
                    </tr>
                    <tr>
                        <td>Manager Name</td>
                        <td>${data.man_name}</td>
                    </tr>
                    <tr>
                        <td>Manager NIC</td>
                        <td>${data.man_nic}</td>
                    </tr>
                    <tr>
                        <td>Bank Name</td>
                        <td>${data.bank_name}</td>
                    </tr>
                    <tr>
                        <td>Branch Id</td>
                        <td>${data.branch_id}</td>
                    </tr>
                    <tr>
                        <td>Account No</td>
                        <td>${data.account_no}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>${data.city}</td>
                    </tr>`);

                    
               
            },
            error: function(errMsg) {
                window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
            }
        });

    }

});

$("#acceptReq").click(function() {
    let req = {"id":id};
        $.ajax({
            type: "POST",
            url:setUrl("Admin/Admin/getAdminVerifyDetailsAccept"),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(req),
            success: function(data){
                successMsg(["successfully inserted"]);
                delay(function(){
                window.location.replace("/aquaspace/frontend/src/Admin/AdminVerify.html")       
                },5000);
               
            },
            error: function(errMsg) {
                window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
            }
        });


});
$("#rejReq").click(function() {
    let req = {"id":id, "type" : type};
        $.ajax({
            type: "POST",
            url:setUrl("Admin/Admin/getAdminVerifyDetailsReject"),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(req),
            success: function(data){ 
                successMsg(["successfully rejected"]);
                delay(function(){
                window.location.replace("/aquaspace/frontend/src/Admin/AdminVerify.html")       
                },5000);      
            },
            error: function(errMsg) {
                window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
            }
        });
});