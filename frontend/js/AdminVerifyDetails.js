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
                    let name = data.first_name + " " + data.last_name;
                    $("#Verify-list-details").append(`
                        <tr>
                            <td>User Name</td>
                            <td>${name}</td>
                        <tr>
                        <tr>
                            <td>Qulification</td>
                            <td><img src="/aquaspace/frontend/images/qualifications/${data.qualification}" alt="qualification"></td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>${data.city}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>${data.address}</td>
                        </tr>
                    `);
                    
               
            },
            error: function(errMsg) {
                //window.location.replace("../src/Error"+errMsg.status+".html");
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
                //window.location.replace("../src/Error"+errMsg.status+".html");
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
                window.location.replace("/aquaspace/frontend/src/Admin/AdminVerify.html")       
               
            },
            error: function(errMsg) {
                window.location.replace("../src/Error"+errMsg.status+".html");
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
                window.location.replace("/aquaspace/frontend/src/Admin/AdminVerify.html")       
            },
            error: function(errMsg) {
                window.location.replace("../src/Error"+errMsg.status+".html");
            }
        });
});