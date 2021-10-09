// var slider = document.getElementById('slider');
// var active = document.getElementById('active');
// var line1 = document.getElementById('line1');
// var line2 = document.getElementById('line2');
// var line3 = document.getElementById('line3');
// var line4 = document.getElementById('line4');

//api setter
function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
  }

line1.onclick = function() {
    slider.style.transform = 'translateX(0)';
    active.style.top = '0px';
}

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

var userType = 0;

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
$(document).ready(function(){

    // jQuery methods go here...
    $.ajax({
        type: "POST",
        url:setUrl("Authentication/userTypeIdentify"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
          if(data.status == 1){
              loggedIn = true;
              userType = data.type;
              userId = data.id;
              foo(true);

          }else{
              foo(false);
          }
        },
        error: function(errMsg) {
            window.location.replace("../src/Error/"+errMsg.status+".html");
        }
    });



    
  });

  $(".default_option").click(function(){
    $(".dropdown ul").addClass("active");
  });
  
  $(".dropdown ul li").click(function(){
    var text = $(this).text();
    $(".default_option").text(text);
    $(".dropdown ul").removeClass("active");
  });

  $("#logOut").click(function(){
    $.ajax({
        type: "GET",
        url:setUrl("Authentication/requestLogout"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
          window.location.replace("/aquaspace/frontend/src/");
        },
        error: function(errMsg) {
            window.location.replace("../src/Error/"+errMsg.status+".html");
        }
    });
  });

$("#profile").click(function(){
    if(userType == 1){
        window.location.replace("/aquaspace/frontend/src/Reg/RegularUserDashboard.html");
    }
    else if(userType == 2){
        window.location.replace("/aquaspace/frontend/src/Expert/ExpertDashboard.html");
    }
    else if(userType == 3){
        window.location.replace("/aquaspace/frontend/src/Store/StoreDashboard.html");
    }
    else if(userType == 4){
        window.location.replace("/aquaspace/frontend/src/Admin/AdminDashboard.html");
    }
    else{
        window.location.replace("#");
    }
});



