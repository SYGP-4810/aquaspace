
$("#btn1").click(function () { 

var fish = $("#fish").val();
var qty = $("#quantity").val();
  console.log("hello");

  $("#fish-list").append(`
  <div class="fish-item">
                    <h4>${fish}</h4>
                    <img src="../../images/tank/${fish}.jpg" style="width: 150px;" alt="">
                    
                </div>
  `);
});
