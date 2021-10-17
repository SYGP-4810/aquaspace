//api setter

function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

$( document ).ready(function() {
    $.ajax({
        type: "GET",
        url:setUrl("Admin/Admin/getAdminList"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            var name = '';
            data.forEach(element => {
                name = element.first_name + " " + element.last_name;
                $("#adminadminstable").append(`<tr>
            <td>
                <a href="AdminDetails.html?id=${element.id}">
                    <div class="admin">
                    <img src="../../images/profile.jpg">                                
                    <div class="text">
                    <span class="name">${name}</span>
                    </div>
                    </div>
                </a>
                
            </td>
        </tr>`);
                
            });
            
        },
        error: function(errMsg) {
            //window.location.replace("../src/Error"+errMsg.status+".html");
        }
    });
});

/*
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
*/

