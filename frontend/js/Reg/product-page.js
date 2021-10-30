




$(document).ready(function(){
var ProductImg = document.getElementById("ProductImg");
var img1 = document.getElementById("img1");
var img2 = document.getElementById("img2");
var img3 = document.getElementById("img3");
var img4 = document.getElementById("img4");

img1.onclick = function () {
    ProductImg.src = img1.src;
}
img2.onclick = function () {
    ProductImg.src = img2.src;
}
img3.onclick = function () {
    ProductImg.src = img3.src;
}
img4.onclick = function () {
    ProductImg.src = img4.src;
}    
    // jQuery methods go here...
   
      $("#reviews").click(function(){
        $(".reviews").css("display", "block");
        $(".questions").css("display", "none");
      });
      $("#questions").click(function(){
        $(".questions").css("display", "block");
        $(".reviews").css("display", "none");
      });

});    