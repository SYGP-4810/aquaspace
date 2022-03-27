function setUrl(text) {
  return "/aquaspace/backend/public/index.php?" + text;
}

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
  // if ($("#auto").val() == "") {
  //   $("#fish_list").hide();
  // }
  $("#fish_list").show();
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
        $("#db-img").attr("src", "../../images/fish_article" + data.img_1);
        $("#db-data").html(`${data.description}`);
      } else {
        $("#img-question").css("display", "none");
      }
    },
  });
});
$("#auto").click(function () {
  // if ($("#auto").val() == "") {
  //   $("#fish_list").hide();
  // }
  $("#fish_list").show();
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
        $("#db-img").attr("src", "../../images/fish_article" + data.img_1);
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

var ignoreClickOnMeElement = document.getElementById("auto");

document.addEventListener("click", function (event) {
  var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
  if (!isClickInsideElement) {
    $("#fish_list").hide();
  }
});
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

// let a = "a";
// let b = "b";
// var fishArray = {};
// array.a = "dasda";
// array.b = "dasdas";
// delete array.a;
// console.log(array);

var fishArray = {};
$("#add-fish-btn").click(function () {
  let fishName = $("#auto").val();
  let fishQty = $("#auto-qty").val();
  $("#auto").val("");
  $("#auto-qty").val("");

  if (fishName == "" || fishQty == "") {
    alert(
      "Please select the fish type and the quantity you wish to include in your tank"
    );
  } else {
    fishArray[fishName] = fishQty;
    if (Object.keys(fishArray).length == 1) {
      $(".selected-fish").html(``);
    }
    var req = { name: fishName };
    $.ajax({
      type: "POST",
      url: setUrl("Reg/Reg/getCompatibleFishByName"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(req),
      success: function (data) {
        console.log(data);
        $(".selected-fish").append(`
    <div style="display: flex; justify-content: center; align-items:center; "> 
                    <h4 style="padding-left:20px; font-weight: 400; width:70%; text-align:left; color: rgb(115, 116, 115);">${fishName}</h4>
                    <span style="width: 30%;color: rgb(115, 116, 115);">${fishQty}</span>
                    <i id="${fishName}" class="fas fa-times-circle" onclick=removeFish(this)></i>
                </div>
    `);
        $("#fish_list").html(``);
        data.forEach((element) => {
          $("#fish_list").append(`
            <li onclick="selectFish(this)">${element.name}</li>`);
        });
      },
    });
  }
});

function removeFish(data) {
  delete fishArray[$(data).attr("id")];
  $(".selected-fish").html(``);
  if (Object.keys(fishArray).length == 0) {
    $(".selected-fish").html(`You have not selected any fish`);

    $("#fish_list").html(``);
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
  } else {
    for (var key in fishArray) {
      let value = fishArray[key];
      $(".selected-fish").append(`
    <div style="display: flex; justify-content: center; align-items:center; "> 
    <h4 style="width: 70%; padding-left:20px;text-align:left;  font-weight: 400; color: rgb(115, 116, 115);">${key}</h4>
    <span style="width: 30%;color: rgb(115, 116, 115);">${value}</span>
    <i id="${key}" class="fas fa-times-circle" onclick=removeFish(this)></i>
</div>`);
    }

    var req = { name: Object.keys(fishArray).pop() };
    $.ajax({
      type: "POST",
      url: setUrl("Reg/Reg/getCompatibleFishByName"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(req),
      success: function (data) {
        console.log(data);
        $("#fish_list").html(``);
        data.forEach((element) => {
          $("#fish_list").append(`
            <li onclick="selectFish(this)">${element.name}</li>`);
        });
      },
    });
  }

  console.log(fishArray);
}

let capacity;
$("#section-1 button").click(function () {
  if (Object.keys(fishArray).length == 0) {
    alert("Please select atleast one fish to move to the next step!");
  } else {
    $("#section-1").css("display", "none");
    $("#section-2").css("display", "block");
  }
  req = {};
  for (var key in fishArray) {
    req[key] = fishArray[key];
  }
  console.log(req);
  $.ajax({
    type: "POST",
    url: setUrl("Reg/Reg/getTankCapacity"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(req),
    success: function (data) {
      capacity = data;
      console.log(data);
      $("#capacity-statement").html(`
      (Tank and filter capacity required for the selected fish: ${data}Litres)
      `);
      req = {
        capacity: data,
      };
      console.log(req);
      $.ajax({
        type: "POST",
        url: setUrl("Reg/Reg/getTanks"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(req),
        success: function (data) {
          console.log(data);
          data.forEach((element) => {
            $("#tank_list").append(`
              <li id=${element.id} onclick="selectTank(this)">${element.product_name}</li>`);
          });
        },
      });
      $.ajax({
        type: "POST",
        url: setUrl("Reg/Reg/getFilters"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(req),
        success: function (data) {
          console.log(data);
          data.forEach((element) => {
            $("#filter_list").append(`
              <li id=${element.id} onclick="selectFilter(this)">${element.product_name}</li>`);
          });
        },
      });
    },
  });
});

function selectTank(data) {
  $("#tank-auto").val($(data).html());
  $("#tank_list").hide();

  let id = $(data).attr("id");
  $("#tank-auto").attr("name", id);
  console.log($("#tank-auto").attr("name"));

  var req = { id: id };

  console.log(req);

  $.ajax({
    type: "POST",
    url: setUrl("Reg/Reg/getPostImage"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(req),
    success: function (data) {
      if (data != false) {
        $("#tank-img-question").css("display", "block");
        $("#tank-db-img").attr("src", "../../images/product/" + data.img1);
        $("#tank-db-data").html(`
        <div class=info>
        <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${id}" target="_blank">View post</a>
        </div>
        Price: ${data.price} 
        <br> 
        Description: ${data.description}
        `);
      } else {
        $("#tank-img-question").css("display", "none");
      }
    },
  });
}

$("#tank-auto").click(function (data) {
  $("#tank_list").show();
});

let itemArray = {};
$("#add-tank-btn").click(function () {
  $("#tank-img-question").css("display", "none");
  let tankName = $("#tank-auto").val();
  let tankID = $("#tank-auto").attr("name");
  $("#tank-auto").val("");
  if (tankName == "") {
    alert("Please select a tank you wish to buy");
  } else {
    itemArray["tank"] = $("#tank-auto").attr("name");
    $(".selected-tank").html(`
    <div style="display: flex; justify-content: center; align-items:center; "> 
    <h4 style="padding-left:20px; font-weight: 400; width:70%; text-align:left; color: rgb(115, 116, 115);">${tankName}</h4>
    <span style="width: 30%;color: rgb(115, 116, 115);">1</span>
    <i id="${tankID}" class="fas fa-times-circle" onclick=removeTank()></i>
</div>

  `);
  }
});

function removeTank() {
  itemArray["tank"] = 0;
  $(".selected-tank").html(``);
  $(".selected-tank").html(`You have not selected a tank`);
}

var ignoreTankClickOnMeElement = document.getElementById("tank-auto");

document.addEventListener("click", function (event) {
  var isTankClickInsideElement = ignoreTankClickOnMeElement.contains(
    event.target
  );
  if (!isTankClickInsideElement) {
    $("#tank_list").hide();
  }
});

function selectFilter(data) {
  $("#filter-auto").val($(data).html());
  $("#filter_list").hide();

  let id = $(data).attr("id");
  $("#filter-auto").attr("name", id);
  console.log($("#filter-auto").attr("name"));

  var req = { id: id };

  console.log(req);

  $.ajax({
    type: "POST",
    url: setUrl("Reg/Reg/getPostImage"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(req),
    success: function (data) {
      if (data != false) {
        $("#filter-img-question").css("display", "block");
        $("#filter-db-img").attr("src", "../../images/product/" + data.img1);
        $("#filter-db-data").html(`
        <div class=info>
        <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${id}" target="_blank">View post</a>
        </div>
        Price: ${data.price} 
        <br> 
        Description: ${data.description}
        `);
      } else {
        $("#filter-img-question").css("display", "none");
      }
    },
  });
}

$("#filter-auto").click(function (data) {
  $("#filter_list").show();
});

$("#add-filter-btn").click(function () {
  $("#filter-img-question").css("display", "none");
  let filterName = $("#filter-auto").val();
  let filterID = $("#filter-auto").attr("name");
  $("#filter-auto").val("");
  if (filterName == "") {
    alert("Please select a filter you wish to buy");
  } else {
    itemArray["filter"] = $("#filter-auto").attr("name");
    $(".selected-filter").html(`
    <div style="display: flex; justify-content: center; align-items:center; "> 
    <h4 style="padding-left:20px; font-weight: 400; width:70%; text-align:left; color: rgb(115, 116, 115);">${filterName}</h4>
    <span style="width: 30%;color: rgb(115, 116, 115);">1</span>
    <i id="${filterID}" class="fas fa-times-circle" onclick=removeFilter()></i>
</div>

  `);
  }
});

function removeFilter() {
  itemArray["filter"] = 0;
  $(".selected-filter").html(``);
  $(".selected-filter").html(`You have not selected a filter`);
}

var ignorefilterClickOnMeElement = document.getElementById("filter-auto");

document.addEventListener("click", function (event) {
  var isfilterClickInsideElement = ignorefilterClickOnMeElement.contains(
    event.target
  );
  if (!isfilterClickInsideElement) {
    $("#filter_list").hide();
  }
});

function openMsg(data) {
  $(".btn-div span").css("display", "block");
}

function closeMsg() {
  $(".btn-div span").css("display", "none");
}

$("#btn1").click(function () {
  let flag;
  if (itemArray["tank"] != 0) {
    window.open(
      "/aquaspace/frontend/src/Reg/product-page.html?id=" + itemArray["tank"],
      "_blank"
    );
  }
  if (itemArray["filter"] != 0) {
    window.open(
      "/aquaspace/frontend/src/Reg/product-page.html?id=" + itemArray["filter"],
      "_blank"
    );
  }
 
});

$("#btn2").click(function () {
  let text = "";
  // for (i = 1; i <= Object.keys(fishArray).length; i++) {
  //   let fish = Object.keys(fishArray).pop();
  //   text = text + "id" + i + "=" + fish;
  // }
  let i = 1;
  for (var key in fishArray) {
    text = text + "id" + i + "=" + key + "&";
    i = i + 1;
  }
  text = text + "ids= " + Object.keys(fishArray).length + "&";
  if (itemArray["tank"] != 0) {
    text = text + "tank=" + itemArray["tank"] + "&";
  }
  if (itemArray["filter"] != 0) {
    text = text + "filter=" + itemArray["filter"] + "&";
  }
  text = text + "capacity=" + capacity;

  window.open(
    "/aquaspace/frontend/src/Reg/build-tank-pdf.html?" + text,
    "_blank"
  );
});
