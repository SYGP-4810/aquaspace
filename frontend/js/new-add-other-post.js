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

// get extention varibales
var imgExtension1 = "";
var imgExtension2 = "";
var imgExtension3 = "";
var imgExtension4 = "";

$("#img1").change(function (e) {
  var fileName = e.target.files[0].name;
  fileExtension = fileName.split(".").pop();
  imgExtension1 = fileExtension;
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
  let name = $("#name").val();
  let duration = $("#duration").val();
  let description = $("#description").val();
  let quantity = $("#quantity").val();
  let category = 3;
  let price = $("#price").val();
  let address = $("#address").val();
  let lat = $("#lat").val();
  let lan = $("#lang").val();
  //   let question = 0;
  let errors = [];
  let errFlag = 0;
  //validation criteria

  if (name == "") {
    errors.push("Name is required");
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
  // if(description == ''){
  //   errors.push("details required");
  //   errFlag++;
  // }
  // if(question == 0){
  //   errors.push("deliveryMode required");
  //   errFlag++;
  // }

  const acceptedFileTypes = ["png", "jpg", "jpeg"];
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

    $("#order").click(function () {
      var req = {
        product_name: name,
        duration: duration,
        description: description,
        price: price,
        // "question":question,
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
      };
      console.log(req);
      $.ajax({
        type: "POST",
        url: setUrl("Reg/Reg/addPost"),
        data: JSON.stringify(req),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          alert("Payment successful!");
          window.location.replace("/aquaspace/frontend/src/index.html");
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
