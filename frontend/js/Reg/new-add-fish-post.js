function selectFish(data) {
  $("#auto").val($(data).html());
  $("#fish_list").hide();
  // console.log($("#auto").val());

  let name = $("#auto").val();
  var req = { name: name };

  $.ajax({
    type: "POST",
    url: setUrl("Reg/Reg/getFishImage"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(req),
    success: function (data) {
      if (data != false) {
        $("#img-question").css("display", "block");
        $("#radio").css("display", "block");
        $("#db-img").attr("src", "../../images/fish_article/" + data.img_1);
      } else {
        $("#img-question").css("display", "none");
        $("#radio").css("display", "none");
      }
    },
  });
}

$("#auto").keyup(function () {
  let name = $("#auto").val();
  var req = { name: name };

  if ($("#auto").val() == "") {
    $("#fish_list").hide();
  }

  $.ajax({
    type: "POST",
    url: setUrl("Reg/Reg/getFishImage"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(req),
    success: function (data) {
      if (data != false) {
        $("#img-question").css("display", "block");
        $("#radio").css("display", "block");
        $("#db-img").attr("src", "../../images/fish_article/" + data.img_1);
      } else {
        $("#img-question").css("display", "none");
        $("#radio").css("display", "none");
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

function searchbleh() {
  $("#fish_list").show();
  searchFish();
}

$.ajax({
  type: "GET",
  url: setUrl("Reg/Reg/getFishNames"),
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (data) {
    console.log(data);
    var names = [];
    data.forEach((element) => {
      $("#fish_list").append(`
        <li onclick="selectFish(this)">${element.name}</li>
        `);
    });
  },
});

$("#chkBox").change(function () {
  if ($("#chkBox").is(":checked")) {
    $.ajax({
      type: "GET",
      url: setUrl("Reg/Reg/getAddress"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        $("#address").val(data.address);
      },
    });
  }
});

$("#location-btn").click(function () {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      $("#lat").val(position.coords.latitude);
      $("#lang").val(position.coords.longitude);
    });
  } else {
    console.log("Browser doesn't support geolocation!");
  }
});

//api setter
function setUrl(text) {
  return "/aquaspace/backend/public/index.php?" + text;
}

$("#price").change(function () {
  let price = $("#price").val();
  if ($("#price").val() != 0) {
    req = {
      price: price,
    };
    $.ajax({
      type: "POST",
      url: setUrl("Reg/Reg/getRegUserRates"),
      data: JSON.stringify(req),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (data) {
        var i = 1;
        data.forEach((element) => {
          if (i < 4) {
            $("#rate" + i).text(i + " weeks (" + element.rate + ")");
          } else {
            $("#rate" + i).text(i - 3 + " months (" + element.rate + ")");
          }
          i++;
        });
      },
      error: function (errMsg) {
        // window.location.replace("../src/Error"+errMsg.status+".html");
      },
    });
  } else {
    $("#rate1").text("1 weeks (Please enter the price to view the charges)");
    $("#rate2").text("2 weeks");
    $("#rate3").text("3 weeks");
    $("#rate4").text("1 months");
    $("#rate5").text("2 months");
    $("#rate6").text("3 months");
  }
});

// get extention varibales
var imgExtension1 = "";
var imgExtension2 = "";
var imgExtension3 = "";
var imgExtension4 = "";

$("#img1").change(function (e) {
  var fileName = e.target.files[0].name;
  fileExtension = fileName.split(".").pop();
  imgExtension1 = fileExtension;
  // console.log(imgExtension1);
});

$("#img2").change(function (e) {
  var fileName = e.target.files[0].name;
  fileExtension = fileName.split(".").pop();
  imgExtension2 = fileExtension;
});

$("#img3").change(function (e) {
  var fileName = e.target.files[0].name;
  fileExtension = fileName.split(".").pop();
  imgExtension3 = fileExtension;
});

$("#img4").change(function (e) {
  var fileName = e.target.files[0].name;
  fileExtension = fileName.split(".").pop();
  imgExtension4 = fileExtension;
});

// get images
var imagebase64_1 = "";
var imagebase64_2 = "";
var imagebase64_3 = "";
var imagebase64_4 = "";

function encodeImageFileAsURL1(element) {
  let file = element.files[0];
  let reader = new FileReader();
  reader.onloadend = function () {
    imagebase64_1 = reader.result;
  };
  reader.readAsDataURL(file);
}

function encodeImageFileAsURL2(element) {
  let file = element.files[0];
  let reader = new FileReader();
  reader.onloadend = function () {
    imagebase64_2 = reader.result;
  };
  reader.readAsDataURL(file);
}

function encodeImageFileAsURL3(element) {
  let file = element.files[0];
  let reader = new FileReader();
  reader.onloadend = function () {
    imagebase64_3 = reader.result;
  };
  reader.readAsDataURL(file);
}

function encodeImageFileAsURL4(element) {
  let file = element.files[0];
  let reader = new FileReader();
  reader.onloadend = function () {
    imagebase64_4 = reader.result;
  };
  reader.readAsDataURL(file);
}

$("#btn").click(function () {
  let name = $("#auto").val();
  let duration = $("#duration").val();
  let description = $("#description").val();
  let quantity = $("#quantity").val();
  let category = $("#category").val();
  let price = $("#price").val();
  let address = $("#address").val();
  let lat = $("#lat").val();
  let lan = $("#lang").val();
  let question = 0;
  let errors = [];
  let errFlag = 0;
  // let status = 1;

  if ($("#radio_1").is(":checked")) {
    question = $("#radio_1").val();
  }

  if ($("#radio_2").is(":checked")) {
    question = $("#radio_2").val();
  }

  if (name == "") {
    errors.push("Name is required");
    errFlag++;
  }
  if (category == "") {
    errors.push("Category required");
    errFlag++;
  }
  if (price == "") {
    errors.push("Price is required");
    errFlag++;
  }
  if (quantity == "") {
    errors.push("Quantity is required");
    errFlag++;
  }
  if (description == "") {
    errors.push("details required");
    errFlag++;
  }
  if (duration == "") {
    errors.push("duration required");
    errFlag++;
  }
  if (address == "") {
    errors.push("address required");
    errFlag++;
  }

  const acceptedFileTypes = ["png", "jpg", "jpeg"];

  // if(imgExtension1)

  if (acceptedFileTypes.indexOf(imgExtension1.toLowerCase()) === -1) {
    errors.push("Image 1 type must be jpg ,jpeg or png");
    errFlag++;
  }

  if (acceptedFileTypes.indexOf(imgExtension2.toLowerCase()) === -1) {
    errors.push("Image 2 type must be jpg ,jpeg or png");
    errFlag++;
  }

  if (acceptedFileTypes.indexOf(imgExtension3.toLowerCase()) === -1) {
    errors.push("Image 3 type must be jpg ,jpeg or png");
    errFlag++;
  }
  if (acceptedFileTypes.indexOf(imgExtension3.toLowerCase()) === -1) {
    errors.push("Image 4 type must be jpg ,jpeg or png");
    errFlag++;
  }

  if (errFlag == 0) {
    $(".post-details").css("display", "none");
    $(".checkout").css("display", "block");
    $("#Yorder_amount").html(`
          ${price}
    `);
    
    $("#order").click(function () {
      $("#item_name").val(name);
      $("#item_amount").val(price);
      var req = {
        product_name: name,
        duration: duration,
        description: description,
        price: price,
        question: question,
        category: category,
        address: address,
        lat: lat,
        lan: lan,
        quantity: quantity,
        img1: imagebase64_1.replace(/^data:image\/[a-z]+;base64,/, ""),
        img2: imagebase64_2.replace(/^data:image\/[a-z]+;base64,/, ""),
        img3: imagebase64_3.replace(/^data:image\/[a-z]+;base64,/, ""),
        img4: imagebase64_4.replace(/^data:image\/[a-z]+;base64,/, ""),
        exen1: imgExtension1,
        exen2: imgExtension2,
        exen3: imgExtension3,
        exen4: imgExtension4,
        type: 1,
      };
console.log(req)
      $.ajax({
        type: "POST",
        url: setUrl("Reg/Reg/addPost"),
        data: JSON.stringify(req),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          console.log(data);
          successMsg(["Added Fish"]);
          // delay(function () {
          //   window.location.replace(
          //     "/aquaspace/frontend/src/Reg/add-fish-post.html"
          //   );
          // }, 5000);
        },
        error: function (errMsg) {
          // window.location.replace("../src/Error"+errMsg.status+".html");
        },
      });
    });
  } else {
    alert(JSON.stringify(errors));
  }
});

// let item_name = $("#auto").val();
// let item_amount = "450.00";
// $("#item_name").val(item_name);
// $("#item_amount").val(item_amount);

