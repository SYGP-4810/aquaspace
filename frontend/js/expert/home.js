function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
  }
  
  $(document).ready(function(){
    $.ajax({
        type: "GET",
        url:setUrl("Expert/Expert/getHome"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            $("#questionCount").text(data['question']);
            $("#requestCount").text(data['product']);
            $("#articalCount").text(data['article']);
            
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });

});