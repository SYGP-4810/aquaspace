$(document).ready(function(){

    // jQuery methods go here...
   
      $("#fish").click(function(){
        $(".fish").css("display", "block");
        $("#fish").css("color", "rgb(61, 61, 61)");
        $(".items").css("display", "none");
        $("#items").css("color", "#aaaaaa");
        $(".build").css("display", "none");
        $("#build").css("color", "#aaaaaa");

      });

      $("#items").click(function(){
        $(".items").css("display", "block");
        $("#items").css("color", "rgb(61, 61, 61)");
        $(".fish").css("display", "none");
        $("#fish").css("color", "#aaaaaa");
        $(".build").css("display", "none");
        $("#build").css("color", "#aaaaaa");
      });

      $(".proceed-1").click(function(){
        $(".items").css("display", "block");
        $("#items").css("color", "rgb(61, 61, 61)");
        $(".fish").css("display", "none");
        $("#fish").css("color", "#aaaaaa");
        $(".build").css("display", "none");
        $("#build").css("color", "#aaaaaa");
      });

      $("#build").click(function(){
        $(".build").css("display", "block");
        $("#build").css("color", "rgb(61, 61, 61)");
        $(".fish").css("display", "none");
        $("#fish").css("color", "#aaaaaa");
        $(".items").css("display", "none");
        $("#items").css("color", "#aaaaaa");
      });

      $(".proceed-2").click(function(){
        $(".build").css("display", "block");
        $("#build").css("color", "rgb(61, 61, 61)");
        $(".fish").css("display", "none");
        $("#fish").css("color", "#aaaaaa");
        $(".items").css("display", "none");
        $("#items").css("color", "#aaaaaa");
      });

      // $(".col-4").click(function(){
      //   $(".col-4").addClass("selected")
      // })

});  