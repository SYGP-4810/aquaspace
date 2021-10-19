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
            console.log(data);
            // var name = '';
            // data.forEach(element => {
                
                
                
            // });
            
            
        },
        error: function(errMsg) {
            //window.location.replace("../src/Error"+errMsg.status+".html");
        }
    });
});