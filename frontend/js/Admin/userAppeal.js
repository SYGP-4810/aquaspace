$(document).ready(function() {
    $.ajax({
        type: "GET",
        url:setUrl("Admin/Admin/getUserAppeal"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            data.forEach(element => {
                var userType;
                if(element.user_type == 1){
                    userType = "Regular User";
                }
                else if(element.user_type == 2){
                    userType = "Experience user";
                }
                else if(element.user_type == 3){
                    userType = "Store";
                }else if(element.user_type == 4){
                    userType = "Admin";
                }

                $(".block-list").append(`
                <tr>
                    <td>
                        <div class="admin">
                            <img src="/aquaspace/frontend/images/profile/${element.profile_img}">
                            <div class="text">
                                <span class="name">${element.email}</span>
                                <br>
                                <span>${userType}</span>
                            </div>
                        </div>
                    </td>   
                    <td>
                        <a href="../Admin/AdminIssuesUserAppeal.html?email=${element.email}&userType=${userType}&appeal=${element.appeal}&img=${element.profile_img}&userId=${element.auth_id}" class="button">View appeal</a>
                    </td>
                </tr>
                `);    
            });
            
            
        },
        error: function(errMsg) {
            //window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});