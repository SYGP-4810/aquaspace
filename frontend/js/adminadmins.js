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
            console.log(data);
            var name = '';
            data.forEach(element => {
                name = element.first_name + " " + element.last_name;
                $("#adminadminstable").append(`<tr>
            <td>
                <a href="AdminDetails.html?id=${element.id}">
                    <div class="admin">
                    <img src="../../images/profile/${element.profile_img}">                                
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
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});

