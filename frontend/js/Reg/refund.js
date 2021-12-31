function setUrl(text) {
  return "/aquaspace/backend/public/index.php?" + text;
}
var url = new URL(window.location.href);
var id = url.searchParams.get("id");
var order_id = url.searchParams.get("order");
var product_name = url.searchParams.get("name");
var order_status = url.searchParams.get("status");
var date = url.searchParams.get("date");
var amount = url.searchParams.get("amount");
var req = {
  id: id,
};

$("#table").append(`
<tr>
              <td>#${order_id}</td>
                                    <td>${product_name}</td>
                                    <td>${date}</td>
                                    <td>RS ${amount}.00</td>
                                    <td>${order_status}</td>
                                    </tr>
`);

// get extention varibales
var imgExtension1 = "";
var imgExtension2 = "";
var imgExtension3 = "";

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

// get images
var imagebase64_1 = "";
var imagebase64_2 = "";
var imagebase64_3 = "";

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

$("#btn").click(function () {
  let reason = $("#reason").val();
  let item_status;
  if ($("#delivered").is(":checked")) {
    item_status = $("#delivered").val();
  }
  if ($("#not_delivered").is(":checked")) {
    item_status = $("#not_delivered").val();
  }

  let errors = [];
  let errFlag = 0;

  if (reason == "") {
    errors.push("Reason required");
    errFlag++;
  }


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

  if (errFlag == 0) {
    var req = {
      product_order_id : id,
      deliver_status: item_status,
      reason: reason,
      img1: imagebase64_1.replace(/^data:image\/[a-z]+;base64,/, ""),
      img2: imagebase64_2.replace(/^data:image\/[a-z]+;base64,/, ""),
      img3: imagebase64_3.replace(/^data:image\/[a-z]+;base64,/, ""),
      exen1: imgExtension1,
      exen2: imgExtension2,
      exen3: imgExtension3,
    };

    $.ajax({
      type: "POST",
      url: setUrl("Reg/Reg/refund"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(req),
      success: function (data) {
        console.log(data);
      },
      error: function (errMsg) {
        //   window.location.replace("../src/Error"+errMsg.status+".html");
      },
    });
  } else {
    alert(JSON.stringify(errors));
  }
});
