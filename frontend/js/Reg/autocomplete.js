
$("#btn1").click(function () { 

var fish = $("#fishtype").val();
var qty = $("#quantity").val();
  console.log(fish);

  $("#profile-table").append(`
  <tr  style="border-bottom: 1px rgb(153, 153, 153) solid; " >
                        <td><img style="width:150px;" src="../../images/tank/${fish}.jpg"></td>
                        <td style="border: none;font-size: 15px; color: black; font-weight: 500; " class="title-text">${fish}</td>
                        <td style="border: none;font-size: 15px; color: black; font-weight: 500; " class="title-text">${qty}</td>
                    </tr>
  `);
});
