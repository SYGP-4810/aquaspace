function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

$( document ).ready(function() {
    $.ajax({
        type: "GET",
        url:setUrl("Store/Store/getHome"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            $("#countOrders").text(data['order']);
            $("#questionCount").text(data['question']);
            $("#refundCount").text(data['refund']);
            
        },
        error: function(errMsg) {
            // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});