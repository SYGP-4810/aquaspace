
//api setter
function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
  }


var userType = 0;

let before = document.getElementsByClassName('before');
let after = document.getElementsByClassName('after');
let notReg = document.getElementsByClassName('notReg');
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
function notRegAccount(){
  for (var i=0;i<before.length;i+=1){
    before[i].style.display = 'none';
}   
for (var i=0;i<after.length;i+=1){
    after[i].style.display = 'block';
}
for(let i=0;i<notRegAccount.length;i+=1){
    notReg[i].style.display = 'none';
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
              if(userType == 1){
                foo(true);
              }else{
                notRegAccount();
              }
              

          }else{
              foo(false);
          }
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });

    //get product details
    $.ajax({
        type: "GET",
        url:setUrl("Common/getLandingPagePost"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
         console.log(data);
         //append new posts
         data.newPost.forEach(element => {
            let sum = element.sumOfRating;
            let count = element.countOfRating;
            let htmlToRating = `<div class="rating">`;
            let remainder = sum%count;
            for(let i = 0; i< 5-remainder; i++) {
               htmlToRating += `<i class="fa fa-star"></i>`;
            }
            for(let i = 0; i< remainder;i++) {
                htmlToRating += `<i class="far fa-star"></i>`;
            }
            htmlToRating  += `</div>`;

           $("#newlyAddedFishContent").append(`<div class="col-4">
           <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
   
             <img src="/aquaspace/frontend/images/product/${element.img1}" alt="product image" />    
             <h3>${element.product_name}</h3>
           </a>
           ${htmlToRating}
           <p>Price : ${element.price}</p>
         </div>`);
        });
        //append fish post
        
        data.fishPost.forEach(element => {
            let sum = element.sumOfRating;
            let count = element.countOfRating;
            let htmlToRating = `<div class="rating">`;
            let remainder = sum%count;
            for(let i = 0; i< 5-remainder; i++) {
               htmlToRating += `<i class="fa fa-star"></i>`;
            }
            for(let i = 0; i< remainder;i++) {
                htmlToRating += `<i class="far fa-star"></i>`;
            }
            htmlToRating  += `</div>`;

           $("#fishContent").append(`<div class="col-4">
           <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
   
             <img src="/aquaspace/frontend/images/product/${element.img1}" alt="product image" />    
             <h3>${element.product_name}</h3>
           </a>
           ${htmlToRating}
           <p>Price : ${element.price}</p>
         </div>`);
        });

        //append plant post
        data.plantPost.forEach(element => {
            let sum = element.sumOfRating;
            let count = element.countOfRating;
            let htmlToRating = `<div class="rating">`;
            let remainder = sum%count;
            for(let i = 0; i< 5-remainder; i++) {
               htmlToRating += `<i class="fa fa-star"></i>`;
            }
            for(let i = 0; i< remainder;i++) {
                htmlToRating += `<i class="far fa-star"></i>`;
            }
            htmlToRating  += `</div>`;

           $("#plantContent").append(`<div class="col-4">
           <a href="/aquaspace/frontend/Reg/product-page.html?id=${element.id}">
   
             <img src="/aquaspace/frontend/images/product/${element.img1}" alt="product image" />    
             <h3>${element.product_name}</h3>
           </a>
           ${htmlToRating}
           <p>Price : ${element.price}</p>
         </div>`);
        });
        //append equipment post
        data.eqPost.forEach(element => {
            let sum = element.sumOfRating;
            let count = element.countOfRating;
            let htmlToRating = `<div class="rating">`;
            let remainder = sum%count;
            for(let i = 0; i< 5-remainder; i++) {
               htmlToRating += `<i class="fa fa-star"></i>`;
            }
            for(let i = 0; i< remainder;i++) {
                htmlToRating += `<i class="far fa-star"></i>`;
            }
            htmlToRating  += `</div>`;

           $("#equipmentContent").append(`<div class="col-4">
           <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
   
             <img src="/aquaspace/frontend/images/product/${element.img1}" alt="product image" />    
             <h3>${element.product_name}</h3>
           </a>
           ${htmlToRating}
           <p>Price : ${element.price}</p>
         </div>`);
        });
         

        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
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
        window.location.replace("/aquaspace/frontend/src/Reg/account-overview.html");
    }
    else if(userType == 2){
        window.location.replace("/aquaspace/frontend/src/Expert/ExpertHome.html");
    }
    else if(userType == 3){
        window.location.replace("/aquaspace/frontend/src/Store/StoreHome.html");
    }
    else if(userType == 4){
        window.location.replace("/aquaspace/frontend/src/Admin/AdminHome.html");
    }
    else{
        window.location.replace("#");
    }
});



