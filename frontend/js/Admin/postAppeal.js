$(document).ready(function(){
    $.ajax({
        type: "GET",
        url:setUrl("Admin/Admin/getAppeal"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            data.forEach(element => {
            $(".block-list").append(`
            <tr>
                    <td>
                        <div class="admin">
                            <img src="${element.img1}">
                            <div class="text">
                                <span class="name">${element.product_name}</span>
                                <br>
                            </div>
                        </div>
                    </td>   
                    <td>
                        <a href="../Admin/AdminIssuesPostsDetails.html?id=${element.product_id}&appeal=${element.appeal}&img=${element.img1}&productName=${element.product_name}" class="button">View appeal</a>
                    </td>
                </tr>
            `);    
                
                
            });
            
            
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });

});