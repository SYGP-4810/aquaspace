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
      $("#cvrPic").html(`
      <div class="image-preview" style=" background-image: url('/aquaspace/frontend/images/profile/${data.storeDetails.cover_img}');" id="store-pic" ></div>
      `);
      $('#pPic').html(`
      <div class="image-preview" style=" background-image: url('/aquaspace/frontend/images/profile/${data.storeDetails.profile_img}');" id="profile-pic"></div>
      `);
      $("#dSince").html(`${data.storeDetails.create_date}`);
      $(".address").html(`<i class="fas fa-map-marker-alt"></i>
      <span id="address">${data.storeDetails.address}</span>`);
      $("#about").html(`${data.storeDetails.about}`);

      data.productList.forEach((element) => {
        $("#newlyAddedFishContent").append(`<div class="col-4">
           <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
   
             <img src="/aquaspace/frontend/images/product/${element.img1}" alt="${element.product_name}" />    
             <h3>${element.product_name}</h3>
           </a>
           <p>Price : ${element.price}</p>
         </div>`);
      });
    },
    error: function (errMsg) {
      // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    }
  });

    // //get product details
    // $.ajax({
    //     type: "GET",
    //     url:setUrl("Common/getLandingPagePost"),
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "json",
    //     success: function(data){
    //      console.log(data);
    //      //append new posts
    //      data.newPost.forEach(element => {
           
    //     });      
             
    //     },
    //     error: function(errMsg) {
    //         window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    //     }
    // }); 
    
    
});