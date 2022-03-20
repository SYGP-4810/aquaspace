 $( document ).ready(function() {
     loading();
    $.ajax({
        type: "GET",
        url:setUrl("/Reg/Reg/getPosts"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            loadingFinish();
            console.log(data);
            // var name = '';
            // data.forEach(element => {
                
                
                
            // });
            
            
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});