function setUrl(text) {
  return "/aquaspace/backend/public/index.php?" + text;
}

$(document).ready(function () {
  // jQuery methods go here...

  $("#cart").click(function () {
    $(".shopping-cart").css("display", "block");
    $("#cart").css("color", "rgb(61, 61, 61)");
    $(".checkout").css("display", "none");
    $("#checkout").css("color", "#aaaaaa");
    $(".complete").css("display", "none");
    $("#complete").css("color", "#aaaaaa");
  });

  $("#checkout").click(function () {
    $(".checkout").css("display", "block");
    $("#checkout").css("color", "rgb(61, 61, 61)");
    $(".shopping-cart").css("display", "none");
    $("#cart").css("color", "#aaaaaa");
    $(".complete").css("display", "none");
    $("#complete").css("color", "#aaaaaa");
  });

  $("#complete").click(function () {
    $(".complete").css("display", "block");
    $("#complete").css("color", "rgb(61, 61, 61)");
    $(".shopping-cart").css("display", "none");
    $("#cart").css("color", "#aaaaaa");
    $(".checkout").css("display", "none");
    $("#checkout").css("color", "#aaaaaa");
  });

  $("#proceed").click(function () {
    $(".checkout").css("display", "block");
    $("#checkout").css("color", "rgb(61, 61, 61)");
    $(".shopping-cart").css("display", "none");
    $("#cart").css("color", "#aaaaaa");
    $(".complete").css("display", "none");
    $("#complete").css("color", "#aaaaaa");
  });

  $("#order").click(function () {
    $(".complete").css("display", "block");
    $("#complete").css("color", "rgb(61, 61, 61)");
    $(".cart").css("display", "none");
    $("#cart").css("color", "#aaaaaa");
    $(".checkout").css("display", "none");
    $("#checkout").css("color", "#aaaaaa");
  });

  console.log("djsakj");
  $.ajax({
    type: "GET",
    url: setUrl("Reg/Reg/showCart"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log(JSON.stringify(data));

      data.forEach((element) => {
        let total = element.price * element.quantity;
        $(".shopping-cart .table-responsive tbody").append(
          `
                                   <tr>
                                      <td><input type="checkbox" id="${element.product_id}"></td>
                                      <td>${element.product_name}</td>
                                      <td>${element.price}</td>
                                      <td>${element.quantity}</td>
                                      <td>${total}</td>
                                      <td><i class="far fa-trash-alt"></i></td>
                                  </tr>
              `
        );
       

      });
     
    },
    // error: function (errMsg) {
    //   window.location.replace("../src/Error" + errMsg.status + ".html");
    // },
  });
});
