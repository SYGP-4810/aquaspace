//api setter

function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
  }

  $( document ).ready(function() {
    $.ajax({
        type: "GET",
        url:setUrl("/Reg/Reg/getPosts"),
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