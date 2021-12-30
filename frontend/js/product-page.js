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


/* function to be called when add to cart button is clicked */
function addToCart() {
  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  var qty = $("#item-qty").val();
  var delivery = $("#delivery_method").val();
  var max =document.getElementById("item-qty").max;
  var min =document.getElementById("item-qty").min;
  if(delivery==""){
    alert("Please select the delivey method!");
    return
  }
  if(qty <= 0 ||  qty > max || qty < min){
    alert("Please select the correct quantity!");
    return;
  }
  else {
    var req = {
      id: id,
      quantity: qty,
      delivery: delivery,
    };
  
    $.ajax({
      type: "POST",
      url: setUrl("Reg/Reg/addToCart"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(req),
      success: function (data) {
        alert(data);
      },
      error: function (errMsg) {
        window.location.replace("../src/Error" + errMsg.status + ".html");
      },
    });

  }
  

  
}
