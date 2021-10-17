$(document).ready(function(){

    // jQuery methods go here...
   
      $("#coins").click(function(){
        $(".coins").css("display", "block");
        $("#coins").css("color", "rgb(61, 61, 61)");
        $(".checkout").css("display", "none");
        $("#checkout").css("color", "#aaaaaa");
        $(".complete").css("display", "none");
        $("#complete").css("color", "#aaaaaa");

      });

      $("#checkout").click(function(){
        $(".checkout").css("display", "block");
        $("#checkout").css("color", "rgb(61, 61, 61)");
        $(".coins").css("display", "none");
        $("#coins").css("color", "#aaaaaa");
        $(".complete").css("display", "none");
        $("#complete").css("color", "#aaaaaa");
      });

      $("#complete").click(function(){
        $(".complete").css("display", "block");
        $("#complete").css("color", "rgb(61, 61, 61)");
        $(".coins").css("display", "none");
        $("#coins").css("color", "#aaaaaa");
        $(".checkout").css("display", "none");
        $("#checkout").css("color", "#aaaaaa");
      });

      $("#proceed").click(function(){
        $(".checkout").css("display", "block");
        $("#checkout").css("color", "rgb(61, 61, 61)");
        $(".coins").css("display", "none");
        $("#coins").css("color", "#aaaaaa");
        $(".complete").css("display", "none");
        $("#complete").css("color", "#aaaaaa");
      });

      $("#order").click(function(){
        $(".complete").css("display", "block");
        $("#complete").css("color", "rgb(61, 61, 61)");
        $(".coins").css("display", "none");
        $("#coins").css("color", "#aaaaaa");
        $(".checkout").css("display", "none");
        $("#checkout").css("color", "#aaaaaa");
      });


      $({ Counter: 0 }).animate({
        Counter: $('.coin-count').text()
      }, {
        duration: 1000,
        easing: 'swing',
        step: function() {
          $('.coin-count').text(Math.ceil(this.Counter));
        }
      });

});  