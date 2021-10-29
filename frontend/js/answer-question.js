$('#send').click(function(){
    if($('#type-answer').val()){
        let msg = $('#type-answer').val();
        console.log(msg);
        // $('.answer').css("display","block");
        $('.chat').append(`
        <div class="answer">${msg}
        </div>
        
        `)

    }
})