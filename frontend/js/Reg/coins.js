// $(document).ready(function(){

//     // jQuery methods go here...
   
//       $("#coins").click(function(){
//         $(".coins").css("display", "block");
//         $("#coins").css("color", "rgb(61, 61, 61)");
//         $(".checkout").css("display", "none");
//         $("#checkout").css("color", "#aaaaaa");
//         $(".complete").css("display", "none");
//         $("#complete").css("color", "#aaaaaa");

//       });

//       $("#checkout").click(function(){
//         $(".checkout").css("display", "block");
//         $("#checkout").css("color", "rgb(61, 61, 61)");
//         $(".coins").css("display", "none");
//         $("#coins").css("color", "#aaaaaa");
//         $(".complete").css("display", "none");
//         $("#complete").css("color", "#aaaaaa");
//       });

//       $("#complete").click(function(){
//         $(".complete").css("display", "block");
//         $("#complete").css("color", "rgb(61, 61, 61)");
//         $(".coins").css("display", "none");
//         $("#coins").css("color", "#aaaaaa");
//         $(".checkout").css("display", "none");
//         $("#checkout").css("color", "#aaaaaa");
//       });

//       $("#proceed").click(function(){
//         $(".checkout").css("display", "block");
//         $("#checkout").css("color", "rgb(61, 61, 61)");
//         $(".coins").css("display", "none");
//         $("#coins").css("color", "#aaaaaa");
//         $(".complete").css("display", "none");
//         $("#complete").css("color", "#aaaaaa");
//       });

//       $("#order").click(function(){
//         $(".complete").css("display", "block");
//         $("#complete").css("color", "rgb(61, 61, 61)");
//         $(".coins").css("display", "none");
//         $("#coins").css("color", "#aaaaaa");
//         $(".checkout").css("display", "none");
//         $("#checkout").css("color", "#aaaaaa");
//       });




// });  



function setUrl(text) {
  return "/aquaspace/backend/public/index.php?" + text;
}
var url = new URL(window.location.href);
var coins = url.searchParams.get("count");
var rate = url.searchParams.get("rate");
var req1 = {
  no_of_coins: coins,
};

$('#coin-amount').append(`
<td>Coin Amount</td>
                                    <td>${coins}</td>
`)

$('#coin-rate').append(`
<td>Coin Rate</td>
                                    <td>${rate}.00</td>

`)

$('#total').append(`
<td>Total</td>
                                    <td>${coins*rate}.00</td>
`)

$('#form-amount').val(coins*rate);

function addCoins(){
  $.ajax({
    type: "POST",
    url: setUrl("Reg/Reg/addCoins"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(req1),
    success: function (data) {
        console.log(data)
      
    },
    error: function (errMsg) {
        window.location.replace(
          "/aquaspace/frontend/src/Error/" + errMsg.status + ".html"
        );
    },
  });
}
