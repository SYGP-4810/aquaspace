

$.ajax({
  type: "GET",
  url: setUrl("Reg/Reg/getQuestionForExpert"),
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (data) {
    console.log(data);
    data.forEach((element) => {
      let reply = "";
      if (element.reply) reply = element.reply;
      $(".questions").append(`<div class="question">
           <h4>Question</h4>
           <p>${element.question}
           </p>
           <h4>Answer</h4>
           <p>${reply}</p>
       </div>`);
    });
  },
  error: function (errMsg) {
    window.location.replace(
      "/aquaspace/frontend/src/Error/" + errMsg.status + ".html"
    );
  },
});

$.ajax({
  type: "GET",
  url: setUrl("Reg/Reg/getCoinCount"),
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (data) {
    console.log(data);
    $("#count").html(`${data}`);
    $({ Counter: 0 }).animate({
      Counter: $('#count').text()
    }, {
      duration: 1000,
      easing: 'swing',
      step: function() {
        $('#count').text(Math.ceil(this.Counter));
      }
    });
  },
  error: function (errMsg) {
    //   window.location.replace(
    //     "/aquaspace/frontend/src/Error/" + errMsg.status + ".html"
    //   );
  },
});

$("#btn").mouseover(function () {
  if ($("#count").text() < $("#per-question").val()) {
    $("#btn-popup").html(`
        You do not have enough coins to use this service. You can buy coins and try again
        `);
  } else {
    $("#btn-popup").html(`
        This is great! You have enough coins to ask a question.
        `);
  }
  $("#btn-popup").css("display", "block");

});

$('#btn').click(function(){
    if($("#count").text() < $("#per-question").text()){
        alert("You do not have enough coins to use this service. You can buy coins and try again")
    }
    else{
        window.location.replace(
            "/aquaspace/frontend/src/Reg/ask-question.html")

    }
})
$("#btn").mouseout(function () {
  $("#btn-popup").css("display", "none");
});

$("#buy-coins").click(function () {
  if ($("#coin").val() == 0 || $("#coin").val() == "" || $("#coin").val()<0) {
    alert("Please enter the number of coins you wish to buy");
    return;
  } else {
    let no_of_coins = $("#coin").val();
    let rate = $("#price").text();
    window.location.replace(
      "/aquaspace/frontend/src/Reg/coins.html?count=" +
        no_of_coins +
        "&rate=" +
        rate +
        " "
    );
  }
});
