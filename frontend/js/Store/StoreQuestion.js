function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

$( document ).ready(function() {
    let url = new URL(window.location.href);
    let img = url.searchParams.get('img');
    let name = url.searchParams.get("name");
    let price = url.searchParams.get("price");
    let question = url.searchParams.get("question");

    $("#p-card").append(`
        <div class="imgbox">
        <img src="../../images/product/${img}">
        </div>
        <div class="textbox">
            <label for="text"">
                <span style="font-weight: 600;">Name: -</span>
                <span>${name}</span>
            </label>
            <label for="text">
                <span style="font-weight: 600;">Price: -</span>
                <span>${price}</span>
            </label>
        </div>
     `);

    $("#question").append(`${question}
    `);
});


$("#send").click(function(){
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    let answer = $("#answer").val();
    let errors = [];
    let errFlag = 0;

    if(answer.length == 16){
        errors.push("Not Enter the Answer");
        errFlag++;
    }

    var req = {
        "id" : id,
        "answer" : answer
    }

    if(errFlag == 0){
        $.ajax({
            type: "POST",
            url:setUrl("Store/Store/replyQuestion"),
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                successMsg(["Send Replay"]);
                delay(function(){
                window.location.replace("/aquaspace/frontend/src/Store/StoreQuestion.html")
                },5000);
            },
            error: function(errMsg) {
                window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
            }
        });
    }
    else{
        errorShow(errors);
        (JSON.stringify(errors));
    }

});