$("#sendQuestion").click(function(){
    let question = $("#q").val();
    let errors = [];
    let errFlag = 0;
    if(question == ""){
        errors.push("Question is required.");
        errFlag++;
    }
    if(errFlag == 0){
        let req = {"question":question}
        $.ajax({
            type: "POST",
            url:setUrl("Reg/Reg/postQuestionForExpert"),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(req),
            success: function(data){
                
            },
            error: function(errMsg) {
                window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
            }
        });
    }
});