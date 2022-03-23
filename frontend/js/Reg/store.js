$(document).ready(function(){

  //get store Details

  let url = new URL(window.location.href);
  let id = url.searchParams.get("store_id");
  let req = {
    'id' : id
  }
  loading();
  $.ajax({
    type: "POST",
    url: setUrl("Reg/Reg/getStoreDetails"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(req),
    success: function (data) {
      loadingFinish();
    console.log("store detail",data);
    },
    error: function (errMsg) {
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