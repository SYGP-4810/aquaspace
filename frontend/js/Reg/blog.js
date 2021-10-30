$("#fish").click(function(){ window.location.href = "fish-data.html"; });
$("#items").click(function(){ window.location.href = "articles.html"; });

$("#details .like").click(function(){
    $('.like').html(`
    <i style="color: "class="fas fa-heart"></i>`)
})