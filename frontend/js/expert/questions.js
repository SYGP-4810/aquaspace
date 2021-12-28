$('#blog-topic').click(function(){
    window.location.href = "questions.html"; 
})

$('#fish-topic').click(function(){
    window.location.href = "claimed-questions.html"; 
})

$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: setUrl("Expert/Expert/getQuestion"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            data.forEach(element =>{
                let name = element.first_name + " " + element.last_name;
                $("#content-section").append(`<div class="questions">
                <div><a href='answer-question.html?id=${element.id}'><button id="claim">claim</button></a>
                    <div class="question">
                        <h4>${name}</h4>
                        <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${element.question}
                        </p>
                    </div>
                </div>`);
            });
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});
