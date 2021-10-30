$("#btn1").click(function () {
  var fish = $("#fishtype").val();
  var qty = $("#quantity").val();
  console.log(fish);

  $("#profile-table").append(`
  <tr  style="border-bottom: 1px rgb(153, 153, 153) solid; " >
                        <td style="width:200px;"><img style="width:150px;" src="../../images/tank/${fish}.jpg"></td>
                        <td style="border: none;font-size: 15px; color: black; font-weight: 500; " class="title-text">${fish}</td>
                        <td style="border: none;font-size: 15px; color: black; font-weight: 500; " class="title-text">${qty}</td>
                    </tr>
  `);
});

$("#tank-q").change(function () {
  if ($("#tank-q").is(":checked")) {
    $(".select-tank").css("display", "none");
  } else {
    $(".select-tank").css("display", "block");
  }
});

$('#tanktype').change(function(){
  let tank = $('#tanktype').val();
  $('#show-tank').html(`
  <td style="width:200px;"><img style="width:250px;" src="../../images/tank/${tank}.jpg"></td>
                        <td style="padding:20px; border: none;font-size: 15px; color: black; font-weight: 600; " class="title-text">Price: Rs.10,000 <br> Description: <p style="font-size:15px; font-weight:400;">Lorem ipsum lorem ipsum
                        Lorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsum
                        psum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumpsum lorem ipsumLorem ipsum lorem ipsum
                        Lorem ipsum lorem ipsumLorem ipsum lorem ipsumpsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsum
                        </p>
                        <button>view product</button></td> `
  )

})

$("#filter-q").change(function () {
  if ($("#filter-q").is(":checked")) {
    $(".select-filter").css("display", "none");
  } else {
    $(".select-filter").css("display", "block");
  }
});

$('#filtertype').change(function(){
  let filter = $('#filtertype').val();
  $('#show-filter').html(`
  <td style="width:200px;"><img style="width:250px;" src="../../images/tank/${filter}.jpg"></td>
                        <td style="padding:20px; border: none;font-size: 15px; color: black; font-weight: 600; " class="title-text">Price: Rs.10,000 <br> Description: <p style="font-size:15px; font-weight:400;">Lorem ipsum lorem ipsum
                        Lorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsum
                        psum lorem ipsumLorem ipsum lorem lorem ipsumpsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsum
                        </p>
                        <button>view product</button></td> `
  )

})

$("#light-q").change(function () {
  if ($("#light-q").is(":checked")) {
    $(".select-light").css("display", "none");
  } else {
    $(".select-light").css("display", "block");
  }
});

$('#lighttype').change(function(){
  let light = $('#lighttype').val();
  $('#show-light').html(`
  <td style="width:200px;"><img style="width:250px;" src="../../images/tank/${light}.jpg"></td>
                        <td style="padding:20px; border: none;font-size: 15px; color: black; font-weight: 600; " class="title-text">Price: Rs.10,000 <br> Description: <p style="font-size:15px; font-weight:400;">Lorem ipsum lorem ipsum
                        Lorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsum
                        psum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem 
                        </p>
                        <button>view product</button></td> `
  )

})


$('.proceed-1').click(function(){
  $('.fish').css("display","none");
  $('.items').css("display","block");
})

$('.proceed-2').click(function(){
  $('.items').css("display","none");
  $('.build').css("display","block");
})