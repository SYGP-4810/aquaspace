$('#fish-topic').click(function(){
    $('#data').css("display","block");
    $('#fish-topic').css("color","rgb(61, 61, 61)");
    $('#blog-topic').css("color","#888888");
    $('#blog').css("display","none");
})

$('#blog-topic').click(function(){
    $('#data').css("display","none");
    $('#fish-topic').css("color","#888888");
    $('#blog-topic').css("color","rgb(61, 61, 61)");
    $('#blog').css("display","block");

})