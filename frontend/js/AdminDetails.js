$( document ).ready(function() {
    
var url = new URL(window.location.href);
var id = url.searchParams.get("id");
var req = {"id":id};
loading();
    $.ajax({
        type: "POST",
        url:setUrl("Admin/Admin/getAdminDetails"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(req),
        success: function(data){
            loadingFinish();
            if(data.profile_img != ""){
                $("#profilePic").attr("src",`/aquaspace/frontend/images/profile/${data.profile_img}`);
            }
            let name = data.fName + " " + data.lName;
            $("#profile-table").html(`
            <tr>
            <td class="title-text">Name</td>
            <td>${name}</td>
        </tr>
        <tr>
            <td class="title-text">Email</td>
            <td>${data.email}</td>
        </tr>
        <tr>
            <td class="title-text">Address</td>
            <td>${data.address}</td>
        </tr>
        <tr>
            <td class="title-text">Telephone No</td>
            <td>${data.tp}</td>
        </tr>
        <tr>
            <td class="title-text">City</td>
            <td>${data.city}</td>
        </tr>
            `);
        },
        error: function(errMsg) {
            loadingFinish();
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});

