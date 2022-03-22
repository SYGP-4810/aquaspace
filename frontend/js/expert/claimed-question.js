$('#blog-topic').click(function(){
    window.location.href = "questions.html"; 
})

$('#fish-topic').click(function(){
    window.location.href = "claimed-questions.html"; 
})

$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: setUrl("Expert/Expert/getClaimedQuestions"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            data.forEach(element =>{
                let name = element.first_name + " " + element.last_name;
                $(".questions").append(`<a style="text-decoration: none;" href="view-answer.html?question=${element.question}&reply=${element.reply}">
                <div class="question">
                <h4>${name}</h4>
                <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${element.question}
                </p>
            </div></a>`);
            });
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    }); 
});