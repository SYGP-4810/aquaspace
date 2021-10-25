$('#bell').click(function(){
    $('.notification_dd').toggleClass("activee");
})


// $(".notifications #bell").click(function(){
//     // $(this).parent().toggleClass("active");
//     $(".notifications").toggleClass("active");
//      // $(".profile").removeClass("active");
//   });

$(".show_all .link").click(function(){
    $(".notifications").removeClass("active");
    $(".popup").show();
  });
  
  $(".close, .shadow").click(function(){
    $(".popup").hide();
  });