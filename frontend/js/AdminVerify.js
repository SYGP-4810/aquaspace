//api setter

function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
  }
$(document).ready(function(){
    $.ajax({
        type: "GET",
        url:setUrl("Admin/Admin/getAdminVerifyDetails"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            data.forEach(element => {
                let userType = '';
                if(element.user_type == 2){
                    userType = "Expert";
                }else if(element.user_type == 3){
                    userType = "Store";
                }
                $("#Verify-list-table").append(`<tr>
                <td>
                    ${userType}
                </td>
                <td>
                    <div class="admin">
                        <img src="../../images/profile.jpg">
                        <div class="text">
                            <span class="name">${element.email}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <a href="../Admin/AdminVerifyDetails.html?id=${element.id}&type=${element.user_type}&tel=${element.tp}" class="button">View Details</a>
                </td>
            </tr>`);
                
            });
        },
        error: function(errMsg) {
            //window.location.replace("../src/Error"+errMsg.status+".html");
        }
    });
})