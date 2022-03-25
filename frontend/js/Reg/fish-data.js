function setUrl(text) {
  return "/aquaspace/backend/public/index.php?" + text;
}

$.ajax({
  type: "GET",
  url: setUrl("Reg/Reg/getFishData"),
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (data) {
    console.log(data);
    data.forEach((element) => {
      $(".small-container-1").append(`
                <div class="col-4">
                <a href="/aquaspace/frontend/src/Reg/read-fish.html?id=${element.id}"><img src="../../images/fish_article/${element.img_1}" alt=""></a> 
                <h3>${element.name}</h3>
            </div>
                    `);
    });
  },
  error: function (errMsg) {
    // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
  },
});

if ($("#search-fish").val() == " ") {
  $(".small-container-1").show();
}
function searchFishData() {
  $("#no-result").hide();
  $(".small-container-1").show();
  let keyword = $("#search-fish").val().toLowerCase();
  let list = $(".small-container-1 .col-4");
  console.log(list[0]);
  let flag = 0;
  for (let i = 0; i < list.length; i++) {
    let td = list[i].innerText.toLowerCase();
    if (td.includes(keyword)) {
      list.eq(i).show();
      flag++;
    } else {
      list.eq(i).hide();
    }
  }
  if (flag == 0) {
    $(".small-container-1").hide();
    $("#no-result").show();
  }
}
