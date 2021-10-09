$(document).ready(function(){

    // jQuery methods go here...
   
      $("#pending").click(function(){
        $(".pending").css("display", "block");
        $("#pending").css("color", "rgb(61, 61, 61)");
        $(".accept").css("display", "none");
        $("#accept").css("color", "#aaaaaa");
        $(".send").css("display", "none");
        $("#send").css("color", "#aaaaaa");
        $(".past").css("display", "none");
        $("#past").css("color", "#aaaaaa");

      });

      $("#accept").click(function(){
        $(".accept").css("display", "block");
        $("#accept").css("color", "rgb(61, 61, 61)");
        $(".pending").css("display", "none");
        $("#pending").css("color", "#aaaaaa");
        $(".send").css("display", "none");
        $("#send").css("color", "#aaaaaa");
        $(".past").css("display", "none");
        $("#past").css("color", "#aaaaaa");

      });

      $("#send").click(function(){
        $(".send").css("display", "block");
        $("#send").css("color", "rgb(61, 61, 61)");
        $(".pending").css("display", "none");
        $("#pending").css("color", "#aaaaaa");
        $(".accept").css("display", "none");
        $("#accept").css("color", "#aaaaaa");
        $(".past").css("display", "none");
        $("#past").css("color", "#aaaaaa");

      });

      $("#past").click(function(){
        $(".past").css("display", "block");
        $("#past").css("color", "rgb(61, 61, 61)");
        $(".pending").css("display", "none");
        $("#pending").css("color", "#aaaaaa");
        $(".send").css("display", "none");
        $("#send").css("color", "#aaaaaa");
        $(".accept").css("display", "none");
        $("#accept").css("color", "#aaaaaa");

      });
      

      
}); 