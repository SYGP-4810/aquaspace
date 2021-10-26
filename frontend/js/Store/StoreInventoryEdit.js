function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

$(document).ready(function(){
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    var req = {"id":id}
    console.log(req);
        // $.ajax({
        //     type: "POST",
        //     url:setUrl("Admin/Admin/getAdminDetails"),
        //     contentType: "application/json; charset=utf-8",
        //     dataType: "json",
        //     data: JSON.stringify(req),
        //     success: function(data){

        //     },
        //     error: function(errMsg) {
        //         // window.location.replace("../src/Error"+errMsg.status+".html");
        //     }
        // })
})