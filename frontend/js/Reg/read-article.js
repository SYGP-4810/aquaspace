$(document).ready(function() {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get("id");
    let req = {
        "id" : id
    }
    $.ajax({
        type: "POST",
        url:setUrl("Reg/Reg/getArticle"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(req),
        success: function(data){
            console.log(data);
            $(".article").html(`${data.article}`);
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    }); 
});