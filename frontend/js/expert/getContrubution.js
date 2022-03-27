$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: setUrl("Expert/Expert/getContribution"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            let persentage = 100*(data.productCount*2+data.questionCount*3+data.articleCount*10+data.bCount*5)/(data.allPost*2+data.allQuestion*3+data.articleCount*10+data.aBcount*5)
            $(".con-details").append(`
            <br>
            <br>
            <dl>
                <dt>Name : </dt>
                <dd>${data.first_name} ${data.last_name}</dd>
                <dt>No of post verification : </dt>
                <dd> ${data.productCount}</dd>
                <dt>No of fish articles added : </dt>
                <dd>${data.articleCount}</dd>
                <dt>No of blog articles added : </dt>
                <dd>${data.bCount}</dd>
                <dt>No of questions answered : </dt>
                <dd>${data.questionCount}</dd>
                <dt>Percentage : </dt>
                <dd>${parseInt(persentage)}%</dd>
                </dl>`); 
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
    
});