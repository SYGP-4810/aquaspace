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
                                      <td><input type="checkbox" class="chkbox" id="${element.id}" value="${element.product_id}"></td>
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


  /*--------- when proceed button is clicked, this function would take all the ids and push it into
  an array for all the checked items in the shopping cart---------- */
  $("#proceed").click(function () {
    let array = [];
    $("input[type=checkbox]").each(function () {
      if (this.checked) {
        // array.push($(this).attr("id"));
        var req = { id: $(this).attr("value") };
        var item_id = $(this).attr("id") ;

        $.ajax({
          type: "POST",
          async: false,
          url: setUrl("Reg/Reg/getProduct"),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          data: JSON.stringify(req),
          success: function (data) {
            let id = item_id;
            let product_id = req.id;
            let auth_id = data.auth_id;
            let result = { id,product_id,auth_id};

            array.push(result);
          },
          error: function (errMsg) {
            window.location.replace("../src/Error" + errMsg.status + ".html");
          },
        });
      }
    });

    /*-------------- take the array with the ids of the shopping cart items in the json form and group 
    them by the sellers id-------------*/

    var o = {};
    var map = array.reduce(function (r, el) {
      if (!o[el.auth_id]) {
        o[el.auth_id] = {
          auth_id: el.auth_id,
          id: [],
          product_id: [],
        };
        r.push(o[el.auth_id]);
      }
      o[el.auth_id].id.push(el.id);
      o[el.auth_id].product_id.push(el.product_id);
      return r;
    }, []);

    console.log(map);
    console.log(map[0]);
    let i;
    for (i = 0; i < map[0].id.length; i++) {
      console.log(map[0].id[i]);
    }

    /*----------- $.ajax({
      type: "POST",
      async: false,
      url: setUrl("Reg/Reg/makeOrder"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(map),
      success: function (data) {

        console.log("ys yes")
        console.log(data);
        
      },
      // error: function (errMsg) {
      //   window.location.replace("../src/Error" + errMsg.status + ".html");
      // },
    });
    -------------*/



  });
});
