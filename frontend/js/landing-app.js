// var slider = document.getElementById('slider');
// var active = document.getElementById('active');
// var line1 = document.getElementById('line1');
// var line2 = document.getElementById('line2');
// var line3 = document.getElementById('line3');
// var line4 = document.getElementById('line4');

// line1.onclick = function() {
//     slider.style.transform = 'translateX(0)';
//     active.style.top = '0px';
// }

// line2.onclick = function() {
//     slider.style.transform = 'translateX(-25%)';
//     active.style.top = '80px';
// }

// line3.onclick = function() {
//     slider.style.transform = 'translateX(-50%)';
//     active.style.top = '160px';
// }

// line4.onclick = function() {
//     slider.style.transform = 'translateX(-75%)';
//     active.style.top = '240px';
// }

$(document).ready(function(){

    // jQuery methods go here...
    $(".default_option").click(function(){
        $(".dropdown ul").addClass("active");
      });
      
      $(".dropdown ul li").click(function(){
        var text = $(this).text();
        $(".default_option").text(text);
        $(".dropdown ul").removeClass("active");
      });
  });


let loggedIn = true;
let before = document.getElementsByClassName('before');
let after = document.getElementsByClassName('after');
function foo(loggedIn){
    if(loggedIn){
        for (var i=0;i<before.length;i+=1){
            before[i].style.display = 'none';
        }   
        for (var i=0;i<after.length;i+=1){
            after[i].style.display = 'block';
        } 
    }
    else {
        for (var i=0;i<before.length;i+=1){
            before[i].style.display = 'block';
        }   
        for (var i=0;i<after.length;i+=1){
            after[i].style.display = 'none';
        } 
    }
}

foo(loggedIn);