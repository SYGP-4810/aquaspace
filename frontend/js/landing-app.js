var userType = 0;


  function foo(loggedIn) {
    if (loggedIn) {
      $("#login").css("display", "none");
      $("#signup").css("display", "none");
      $("#account").css("display", "block");
      $("#bell").css("display", "block");
      $("#post").css("display", "block");
      $("#cart").css("display", "block");
    }
  }

  function notRegAccount() {
    if (loggedIn) {
      $("#login").css("display", "none");
      $("#signup").css("display", "none");
      $("#cart").css("display", "none");
      $("#post").css("display", "none");
      $("#account").css("display", "block");
      $("#bell").css("display", "block");
    }
  }

  loading();
  $.ajax({
    type: "POST",
    url: setUrl("Authentication/userTypeIdentify"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      loadingFinish();
      if (data.status == 1) {
        loggedIn = true;
        userType = data.type;
        userId = data.id;
        if (userType == 1) {
          foo(true);
          getNotification(true);

  //         var interval = 5000;
 
  //   function doAjax(){
  //     $.ajax({
  //     type: "GET",
  //     url: setUrl("Reg/Reg/getNotifs"),
  //     contentType: "application/json; charset=utf-8",
  //     dataType: "json",
  //     success: function (data) {
  
  //       $('#notifs').html(``);
  //       console.log(data);
    
  //       let count = 0;
  //       if(data.length == 0){
  //         $("#notifs").append(`
  //       <li class="show_all" >
  //                   <p class="link">You have no notifications</p>
  //                 </li>`)
  //       }
  //       else{
  //         data.forEach((element) => {
  //         count++;
  //         $("#notifs").append(`
  //             <li onmouseover=popup(this) onmouseleave=closepopup()>
  //             <div class="notify_icon">
  //               <img src="../images/notif${count}.png" alt="">
  //             </div>
  //             <div class="notify_data">
  //               <div class="sub_title">
  //                 ${element.msg}
  //               </div>
               
  //             </div>
  //            <div class="close_btn" value="${element.id}"  onclick=hideNotif(this.getAttribute("value"))>
  //                       <img src="../images/cross.png" alt="">
  //                     </div>
  //           </li>
  //             `);
  //       });
    
  //       $("#notifs").append(`
  //       <li class="show_all" onclick=readAll()>
  //                   <p class="link">Read All</p>
  //                 </li>`)
  //       }
        
  //     },
  //     complete: function (data) {
  //       // Schedule the next
  //       setTimeout(doAjax, interval);
  //   },
  //     error: function (errMsg) {
  //       window.location.replace("../src/Error/" + errMsg.status + ".html");
  //     },
  //   });

  //   }
    
  // setTimeout(doAjax, interval);

  
        } else {
          notRegAccount();
        }
      } else {
        foo(false);
      }
    },
    error: function (errMsg) {
      window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    },
  });

  //get product details
  loading();
  $.ajax({
    type: "GET",
    url: setUrl("Common/getLandingPagePost"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log(data);
      loadingFinish();
      //append new posts
      data.newPost.forEach((element) => {
        $("#newlyAddedFishContent").append(`<div class="col-4">
           <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
   
             <img src="/aquaspace/frontend/images/product/${element.img1}" alt="product image" />    
             <h3>${element.product_name}</h3>
           </a>
           <p>Price : ${element.price}</p>
         </div>`);
      });
      //append fish post

      data.fishPost.forEach((element) => {
        let sum = element.sumOfRating;
        let count = element.countOfRating;
        let htmlToRating = `<div class="rating">`;
        let remainder = sum % count;
        for (let i = 0; i < 5 - remainder; i++) {
          htmlToRating += `<i class="fa fa-star"></i>`;
        }
        for (let i = 0; i < remainder; i++) {
          htmlToRating += `<i class="far fa-star"></i>`;
        }
        htmlToRating += `</div>`;

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
      data.plantPost.forEach((element) => {
        let sum = element.sumOfRating;
        let count = element.countOfRating;
        let htmlToRating = `<div class="rating">`;
        let remainder = sum % count;
        for (let i = 0; i < 5 - remainder; i++) {
          htmlToRating += `<i class="fa fa-star"></i>`;
        }
        for (let i = 0; i < remainder; i++) {
          htmlToRating += `<i class="far fa-star"></i>`;
        }
        htmlToRating += `</div>`;

        $("#plantContent").append(`<div class="col-4">
           <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
   
             <img src="/aquaspace/frontend/images/product/${element.img1}" alt="product image" />    
             <h3>${element.product_name}</h3>
           </a>
           ${htmlToRating}
           <p>Price : ${element.price}</p>
         </div>`);
      });
      //append equipment post
      data.eqPost.forEach((element) => {
        let sum = element.sumOfRating;
        let count = element.countOfRating;
        let htmlToRating = `<div class="rating">`;
        let remainder = sum % count;
        for (let i = 0; i < 5 - remainder; i++) {
          htmlToRating += `<i class="fa fa-star"></i>`;
        }
        for (let i = 0; i < remainder; i++) {
          htmlToRating += `<i class="far fa-star"></i>`;
        }
        htmlToRating += `</div>`;

        $("#equipmentContent").append(`<div class="col-4">
           <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
   
             <img src="/aquaspace/frontend/images/product/${element.img1}" alt="product image" />    
             <h3>${element.product_name}</h3>
           </a>
           ${htmlToRating}
           <p>Price : ${element.price}</p>
         </div>`);
      });

      //append to the adopt post
      data.adopt.forEach((element) => {
        $("#adopt").append(`<div class="col-4">
         <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">
 
           <img src="/aquaspace/frontend/images/product/${element.img1}" alt="product image" />    
           <h3>${element.product_name}</h3>
         </a>
         <p>Price : ${element.price}</p>
       </div>`);
      });
    },
    error: function (errMsg) {
      window.location.replace(
        "/aquaspace/frontend/src/Error/" + errMsg.status + ".html"
      );
    },
  });


$(".default_option").click(function () {
  $(".dropdown ul").addClass("active");
});

$(".dropdown ul li").click(function () {
  var text = $(this).text();
  $(".default_option").text(text);
  $(".dropdown ul").removeClass("active");
});

$("#logOut").click(function () {
  loading();
  $.ajax({
    type: "GET",
    url: setUrl("Authentication/requestLogout"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      loadingFinish();
      window.location.replace("/aquaspace/frontend/src/");
    },
    error: function (errMsg) {
      window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    },
  });
});

$("#profile").click(function () {
  if (userType == 1) {
    window.location.replace(
      "/aquaspace/frontend/src/Reg/account-overview.html"
    );
  } else if (userType == 2) {
    window.location.replace("/aquaspace/frontend/src/Expert/home.html");
  } else if (userType == 3) {
    window.location.replace("/aquaspace/frontend/src/Store/StoreHome.html");
  } else if (userType == 4) {
    window.location.replace("/aquaspace/frontend/src/Admin/AdminHome.html");
  } else {
    window.location.replace("#");
  }
});

function getNotification(loggedIn){
  var interval = 2000;
  if(loggedIn == 1){
    function doAjax(){
      // no need of loading since continuesly checking
      $.ajax({
      type: "GET",
      url: setUrl("Reg/Reg/getNotifs"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        $('#notifs').html(``);
        console.log(data);
    
        let count = 0;
        if(data.length == 0){
          $("#notifs").append(`
        <li class="show_all" >
                    <p class="link">You have no notifications</p>
                  </li>`)
        }
        else{
          data.forEach((element) => {
          count++;
          $("#notifs").append(`
              <li onmouseover=popup(this) onmouseleave=closepopup()>
              <div class="notify_icon">
                <img src="../images/notif${count}.png" alt="">
              </div>
              <div class="notify_data">
                <div class="sub_title">
                  ${element.msg}
                </div>
               
              </div>
             <div class="close_btn" value="${element.id}"  onclick=hideNotif(this.getAttribute("value"))>
                        <img src="../images/cross.png" alt="">
                      </div>
            </li>
              `);
        });
    
        $("#notifs").append(`
        <li class="show_all" onclick=readAll()>
                    <p class="link">Read All</p>
                  </li>`)
        }
        
      },
      complete: function (data) {
        // Schedule the next
        setTimeout(doAjax, interval);
    },
      error: function (errMsg) {
        window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
      },
    });

    }
    
  

  }
  setTimeout(doAjax, interval);

}


function readAll(){
  loading();
  $.ajax({
    type: "GET",
    url: setUrl("Reg/Reg/readAll"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      
      console.log(data)
      $.ajax({
        type: "GET",
        url: setUrl("Reg/Reg/getNotifs"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          loadingFinish();
          $('#notifs').html(``);
          console.log(data);
      
          let count = 0;
          if(data.length == 0){
            $("#notifs").append(`
          <li class="show_all" >
                      <p class="link">You have no notifications</p>
                    </li>`)
          }
          else {
            data.forEach((element) => {
              count++;
              $("#notifs").append(`
                  <li onmouseover=popup(this) onmouseleave=closepopup()>
                  <div class="notify_icon">
                    <img src="../images/notif${count}.png" alt="">
                  </div>
                  <div class="notify_data">
                    <div class="sub_title">
                      ${element.msg}
                    </div>
                   
                  </div>
                 <div class="close_btn" value="${element.id}" onclick=hideNotif(this)>
                            <img src="../images/cross.png" alt="">
                          </div>
                </li>
                  `);
            });
            $("#notifs").append(`
          <li class="show_all" onclick=readAll()>
                      <p class="link">Read All</p>
                    </li>`)
          }
          
        
      
          
        },
        error: function (errMsg) {
          window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        },
      });

    },
    error: function (errMsg) {
      window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    },
  });


}

function hideNotif(data){
  console.log(data);
  let req = {
    id : data,
  }

  console.log(req);
  //no need of loading since it need to check continuesly
  $.ajax({
    type: "POST",
    url: setUrl("Reg/Reg/hideNotif"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(req),
    success: function (data) {
      console.log(data)
      $.ajax({
        type: "GET",
        url: setUrl("Reg/Reg/getNotifs"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          $('#notifs').html(``);
          console.log(data);
      
          let count = 0;
          if(data.length == 0){
            $("#notifs").append(`
          <li class="show_all" >
                      <p class="link">You have no notifications</p>
                    </li>`)
          }
          else {
            data.forEach((element) => {
              count++;
              $("#notifs").append(`
                  <li onmouseover=popup(this) onmouseleave=closepopup()>
                  <div class="notify_icon">
                    <img src="../images/notif${count}.png" alt="">
                  </div>
                  <div class="notify_data">
                    <div class="sub_title">
                      ${element.msg}
                    </div>
                   
                  </div>
                 <div class="close_btn" value="${element.id}" onclick=hideNotif(this)>
                            <img src="../images/cross.png" alt="">
                          </div>
                </li>
                  `);
            });
            $("#notifs").append(`
          <li class="show_all" onclick=readAll()>
                      <p class="link">Read All</p>
                    </li>`)
          }
          
        },
        error: function (errMsg) {
          window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        },
      });

    },
    error: function (errMsg) {
      window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    },
  });
}

function popup(data){
   $('#view_notif').css('display','block');
  let content = $((data).querySelector('.notify_data .sub_title')).html();
  $('#view_notif').html(`
  ${content}
  `)
  // console.log($((data).querySelector('.notify_data .sub_title')).html())
}

function closepopup(){
  $('#view_notif').css('display','none');
}

