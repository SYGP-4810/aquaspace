$(document).ready(function() {
    $.ajax({
        type: "GET",
        url:setUrl("Reg/Reg/getQuestionForExpert"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
           console.log(data);
           data.forEach(element => {
           let reply = "";
            if(element.reply) reply = element.reply;
           $(".questions").append(`<div class="question">
           <h4>Question</h4>
           <p>${element.question}
           </p>
           <h4>Answer</h4>
           <p>${reply}</p>
       </div>`);
           });            
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});