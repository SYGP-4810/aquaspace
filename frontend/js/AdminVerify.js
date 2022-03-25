$(document).ready(function(){
    loading();
    $.ajax({
        type: "GET",
        url:setUrl("Admin/Admin/getAdminVerifyDetails"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            loadingFinish();
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
            loadingFinish();
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
})