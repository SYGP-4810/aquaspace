$('#fish-topic').click(function(){
    $('#data').css("display","block");
    $('#fish-topic').css("color","rgb(61, 61, 61)");
    $('#blog-topic').css("color","#888888");
    $('#blog').css("display","none");
});

$('#blog-topic').click(function(){
    $('#data').css("display","none");
    $('#fish-topic').css("color","#888888");
    $('#blog-topic').css("color","rgb(61, 61, 61)");
    $('#blog').css("display","block");

});

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: setUrl("Expert/Expert/viewArticleList"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            data.forEach(element =>{
                $(".blogs-section").append(`
                <div class="blog-card">
                    <img src="../../images/article/${element.pic}" class="blog-image" alt="${element.title}">
                    <h4 class="blog-title">${element.title}</h4>
                        <p class="blog-overview">${element.summary}</p>
                        <a href="/aquaspace/frontend/src/Reg/read-article.html?id=${element.id}" class="btn dark">read</a>
                </div>
                `)
            });
        },
        // error: function(errMsg) {
        //     window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        // }
    });

    $.ajax({
        type: "GET",
        url: setUrl("Expert/Expert/viewFishArticleList"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            data.forEach(element =>{
                $("#fishDataRow").append(`
                <a href="/aquaspace/frontend/src/Reg/read-fish.html?id=${element.id}">
                    <div class="col-4">
                        <img src="../../images/fish_article/${element.img_1}" alt="${element.name}" />
                        <h4>${element.name}</h4>
                    </div>
                </a>
                
                `)
            });
        },
        // error: function(errMsg) {
        //     window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        // }
    });
});