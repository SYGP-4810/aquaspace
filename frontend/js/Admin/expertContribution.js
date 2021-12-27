// $(document).ready(function() {

// var totalNumberOfQuestion;
// var totalNumberOfArticle;
// var totlaNumberOfPost;


// $.ajax({
//     type: "GET",
//     url:setUrl("Admin/Admin/tNumberOfArticle"),
//     contentType: "application/json; charset=utf-8",
//     dataType: "json",
//     success: function(data){
//         totalNumberOfArticle = data;
        
//     },
//     error: function(errMsg) {
//         window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
//     }
// });


// $.ajax({
//     type: "GET",
//     url:setUrl("Admin/Admin/tNumPost"),
//     contentType: "application/json; charset=utf-8",
//     dataType: "json",
//     success: function(data){
//         totlaNumberOfPost = data;
        
//     },
//     error: function(errMsg) {
//         window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
//     }
// });


// $.ajax({
//     type: "GET",
//     url:setUrl("Admin/Admin/tNumQuestion"),
//     contentType: "application/json; charset=utf-8",
//     dataType: "json",
//     success: function(data){
//         totalNumberOfQuestion = data;
//     },
//     error: function(errMsg) {
//         window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
//     }
// });



// });

$("#payNow").click(function(){
    loading();
    delay(function(){
        loadingFinish();
    },5000);
})