//api setter

function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
  }
$( document ).ready(function() {
    $.ajax({
        type: "GET",
        url:setUrl("Admin/Admin/getAdmin"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
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
            //window.location.replace("../src/Error"+errMsg.status+".html");
        }
    });
});

