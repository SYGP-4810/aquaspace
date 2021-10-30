function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
  }


$(document).ready(function(){

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
           $("#newlyAddedFishContent").append(`<div class="col-4">
           <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
   
             <img src="/aquaspace/frontend/images/product/${element.img1}" alt="product image" />    
             <h3>${element.product_name}</h3>
           </a>
           <p>Price : ${element.price}</p>
         </div>`);
        });      
             
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });    
});