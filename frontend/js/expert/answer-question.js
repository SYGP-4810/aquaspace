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

$('#send').click(function(){
    window.location.href = "claimed-questions.html"; 
 })
 $('#blog-topic').click(function(){
    window.location.href = "questions.html"; 
})

$('#fish-topic').click(function(){
    window.location.href = "claimed-questions.html"; 
})