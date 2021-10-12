$(document).ready(function(){

    // jQuery methods go here...
   
      $("#cart").click(function(){
        $(".shopping-cart").css("display", "block");
        $("#cart").css("color", "rgb(61, 61, 61)");
        $(".checkout").css("display", "none");
        $("#checkout").css("color", "#aaaaaa");
        $(".complete").css("display", "none");
        $("#complete").css("color", "#aaaaaa");

      });

      $("#checkout").click(function(){
        $(".checkout").css("display", "block");
        $("#checkout").css("color", "rgb(61, 61, 61)");
        $(".shopping-cart").css("display", "none");
        $("#cart").css("color", "#aaaaaa");
        $(".complete").css("display", "none");
        $("#complete").css("color", "#aaaaaa");
      });

      $("#complete").click(function(){
        $(".complete").css("display", "block");
        $("#complete").css("color", "rgb(61, 61, 61)");
        $(".shopping-cart").css("display", "none");
        $("#cart").css("color", "#aaaaaa");
        $(".checkout").css("display", "none");
        $("#checkout").css("color", "#aaaaaa");
      });

      $("#proceed").click(function(){
        $(".checkout").css("display", "block");
        $("#checkout").css("color", "rgb(61, 61, 61)");
        $(".shopping-cart").css("display", "none");
        $("#cart").css("color", "#aaaaaa");
        $(".complete").css("display", "none");
        $("#complete").css("color", "#aaaaaa");
      });

      $("#order").click(function(){
        $(".complete").css("display", "block");
        $("#complete").css("color", "rgb(61, 61, 61)");
        $(".cart").css("display", "none");
        $("#cart").css("color", "#aaaaaa");
        $(".checkout").css("display", "none");
        $("#checkout").css("color", "#aaaaaa");
      });


});  