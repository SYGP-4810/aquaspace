// $( document ).ready(function() {


// $('#add-to-cart').click(function () {
//     console.log("fuck");
//   var url = new URL(window.location.href);
//   var id = url.searchParams.get("id");

//   var req = { id: id };
//   $.ajax({
//     type: "POST",
//     url: setUrl("Reg/Reg/addToCart"),
//     contentType: "application/json; charset=utf-8",
//     dataType: "json",
//     data: JSON.stringify(req),
//     success: function (data) {
//       console.log(JSON.stringify(data));
    
     
//     },
//     error: function (errMsg) {
//       window.location.replace("../src/Error" + errMsg.status + ".html");
//     },
//   });
// });

// });
$('.report-btn').click(function(){
  $('.report-box').toggleClass("active");
})

$('#submit-report').click(function(){
  $('.confirm-report').css("display","block")
})
$('#btn1,#btn2').click(function(){
  $('.confirm-report').css("display","none");
  $('.report-box').css("display","none")
})
function addToCart(){
    console.log("fuck");
  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  var qty = $('#item-qty').val();

  var req = { 
    id: id,
    quantity : qty 
  };

  $.ajax({
    type: "POST",
    url: setUrl("Reg/Reg/addToCart"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(req),
    success: function (data) {
      console.log(JSON.stringify(data));
    
     
    },
    // error: function (errMsg) {
    //   window.location.replace("../src/Error" + errMsg.status + ".html");
    // },
  });
};