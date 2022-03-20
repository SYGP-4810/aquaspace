$(document).ready(function () {
  // jQuery methods go here...

  $("#fish").click(function () {
    $(".fish").css("display", "block");
    $("#fish").css("color", "rgb(61, 61, 61)");
    $(".items").css("display", "none");
    $("#items").css("color", "#aaaaaa");
    $(".build").css("display", "none");
    $("#build").css("color", "#aaaaaa");
  });

  $("#items").click(function () {
    $(".items").css("display", "block");
    $("#items").css("color", "rgb(61, 61, 61)");
    $(".fish").css("display", "none");
    $("#fish").css("color", "#aaaaaa");
    $(".build").css("display", "none");
    $("#build").css("color", "#aaaaaa");
  });

  $(".proceed-1").click(function () {
    $(".items").css("display", "block");
    $("#items").css("color", "rgb(61, 61, 61)");
    $(".fish").css("display", "none");
    $("#fish").css("color", "#aaaaaa");
    $(".build").css("display", "none");
    $("#build").css("color", "#aaaaaa");
  });

  $("#build").click(function () {
    $(".build").css("display", "block");
    $("#build").css("color", "rgb(61, 61, 61)");
    $(".fish").css("display", "none");
    $("#fish").css("color", "#aaaaaa");
    $(".items").css("display", "none");
    $("#items").css("color", "#aaaaaa");
  });

  $(".proceed-2").click(function () {
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
function setUrl(text) {
  return "/aquaspace/backend/public/index.php?" + text;
}
let a = "a";
let b = "b";
var array = {};
array.a = "dasda";
array.b = "dasdas";
delete array.a;
console.log(array);
// var index = array.indexOf("dasdas");
// console.log(index)
// array.splice(index, 1);
// console.log(array)

function selectFish(data) {
  $("#auto").val($(data).html());
  $("#fish_list").hide();
  // console.log($("#auto").val());

  let name = $("#auto").val();
  var req = { name: name };

  $.ajax({
    type: "POST",
    url: setUrl("Reg/Reg/getFishDataImage"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(req),
    success: function (data) {
      if (data != false) {
        $("#img-question").css("display", "block");
        $("#db-img").attr("src", "../../images/" + data.img_1);
        $("#db-data").html(`${data.description}`);
      } else {
        $("#img-question").css("display", "none");
      }
    },
  });
}

$("#auto").keyup(function () {
  if($("#auto").val()==""){
    $("#fish_list").hide();
  }
  let name = $("#auto").val();
  var req = { name: name };
  console.log(name)
  $.ajax({
    type: "POST",
    url: setUrl("Reg/Reg/getFishDataImage"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(req),
    success: function (data) {
      console.log(data)
      if (data != false) {
        
        $("#img-question").css("display", "block");
        $("#db-img").attr("src", "../../images/" + data.img_1);
        $("#db-data").html(`${data.description}`);
      } else {
        $("#img-question").css("display", "none");
      }
    },
  });
});

function searchFish() {
  $("#fish_list").show();
  let keyword = $("#auto").val().toLowerCase();
  let list = $("#fish_list li");
  // console.log(list[0]);
  for (let i = 0; i < list.length; i++) {
    let td = list[i].innerText.toLowerCase();
    if (td.includes(keyword)) {
      list.eq(i).show();
    } else {
      list.eq(i).hide();
    }
  }
}

$.ajax({
  type: "GET",
  url: setUrl("Reg/Reg/getFishData"),
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (data) {
    console.log(data);
    data.forEach((element) => {
      $("#fish_list").append(`
        <li onclick="selectFish(this)">${element.name}</li>`);
    });
  },
});

