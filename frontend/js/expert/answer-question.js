// $('#send').click(function(){
//     if($('#type-answer').val()){
//         let msg = $('#type-answer').val();
//         console.log(msg);
//         $('.answer').css("display","block");z

//         $('.chat').append(`
//         <div class="answer">${msg}
//         </div>
        
//         `)

//     }
// })

// $('#send').click(function(){
//     window.location.href = "claimed-questions.html"; 
//  })
//  $('#blog-topic').click(function(){
//     window.location.href = "questions.html"; 
// })

// $('#fish-topic').click(function(){
//     window.location.href = "claimed-questions.html"; 
// })
var url = new URL(window.location.href);
var id = url.searchParams.get("id");

$(document).ready(function(){
    let req = {'id':id};
    $.ajax({
        type: "POST",
        url:setUrl("Expert/Expert/getOneQuestion"),
        data: JSON.stringify(req),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            $(".chat").html(`<div class="question">
            ${data.question}
        </div>`)
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });

});

$("#send").click(function(){
    let answer = $("#type-answer").val();
    let errFlag = 0;
    let errors = [];
    if(answer == ''){
        errFlag++;
        errors.push("answer is required");
    }
    if(answer.length > 500){
        errFlag++;
        errors.push("answer is too long");
    }
    if(errFlag > 0){

    }else{
        let req = {"id":id, "answer":answer};
        $.ajax({
            type: "POST",
            url:setUrl("Expert/Expert/writeAnswer"),
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                successMsg(["successfully wrote the answer"]);
                delay(function(){
                    window.location.replace("/aquaspace/frontend/src/expert/claimed-questions.html");
                },5000);
            },
            error: function(errMsg) {
                window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
            }
        });

    }
});