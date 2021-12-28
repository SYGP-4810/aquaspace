function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

$( document ).ready(function() {
    $.ajax({
        type: "GET",
        url:setUrl("Store/Store/getQuestions"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
             data.forEach(element => {  
                $("#question-all").append(`
                <div class="questions">
                <a style="text-decoration: none;" href="../Store/StoreQuestionAnswer.html?id=${element.id}&amp;img=${element.img1}&amp;name=${element.product_name}&amp;price=${element.price}&amp;question=${element.question}">
                    <div class="question">
                        <h4>${element.product_name}</h4>
                        <p>${element.question}?</p>
                    </div>
                </a>
            </div>
                `);
                
            });
            
        },
        error: function(errMsg) {
            window.location.replace("../src/Error"+errMsg.status+".html");
        }
    });
});