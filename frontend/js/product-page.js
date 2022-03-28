/* function to be called when add to cart button is clicked */
function addToCart() {
  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  var qty = $("#item-qty").val();
  var delivery = $("#delivery_method").val();
  var max =document.getElementById("item-qty").max;
  var min =document.getElementById("item-qty").min;
  if(delivery==""){
    errorShow(["Please select the deliveRy method!"]);
    return
  }
  // if(qty <= 0 ||  qty > max || qty < min){
  //   errorShow(["Please select the correct quantity!"]);
  //   return;
  // }
  
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
        successMsg([data]);
        delay(function (){
          window.location.reload()
          },3000);
      },
      error: function (errMsg) {
        window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
      }
    });

  

  
}


