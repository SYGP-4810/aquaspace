function unblockProduct(id) {
  let req = { productId: id };
  $.ajax({
    type: "POST",
    url: setUrl("Admin/Admin/unblockProduct"),
    data: JSON.stringify(req),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log(data);
      successMsg(["successfully unblock the product"]);
      delay(function () {
        window.location.reload();
      }, 3000);
    },
    error: function (errMsg) {
      window.location.replace(
        "/aquaspace/frontend/src/Error/" + errMsg.status + ".html"
      );
    },
  });
}

function declineProduct(id) {
  let req = { productId: id };
  $.ajax({
    type: "POST",
    url: setUrl("Admin/Admin/declineAppeal"),
    data: JSON.stringify(req),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      successMsg(["successfully decline the appeal"]);
      delay(function () {
        window.location.reload();
      }, 3000);
    },
    error: function (errMsg) {
      window.location.replace(
        "/aquaspace/frontend/src/Error/" + errMsg.status + ".html"
      );
    },
  });
}

var appeal, email, img, userType, UserId;
$(document).ready(function () {
  let url_string = window.location.href;
  let url = new URL(url_string);
  appeal = url.searchParams.get("appeal");
  email = url.searchParams.get("email");
  img = url.searchParams.get("img");
  userType = url.searchParams.get("userType");
  userId = url.searchParams.get("userId");
  $(".iss-profile").html(`<div class="admin">
    <img src="/aquaspace/frontend/images/profile/${img}">
    <div class="text">
        <span class="name">${email}</span>
        <br>
        <span>${userType}</span>
    </div>
</div>`);
  $("#appeal").html(`<span>${appeal}</span>`);
  let req = {
    email: email,
  };
  $.ajax({
    type: "POST",
    url: setUrl("Admin/Admin/getProductsBlocked"),
    data: JSON.stringify(req),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      data.forEach((element) => {
        let req = {
          productId: element.id,
        };
        $.ajax({
          type: "POST",
          url: setUrl("Admin/Admin/getReasonsAppeal"),
          data: JSON.stringify(req),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (data1) {
            let reasonsList = "";
            data1.forEach((el) => {
              if (el.report == 1) reasonsList += "<li>False information</li>";
              if (el.report == 2) reasonsList += "<li>Illeagal selling</li>";
              if (el.report == 3)
                reasonsList += "<li>Shoul not be in aquaspace</li>";
              if (el.report == 4) reasonsList += "<li>Other</li>";
            });
            $("#product-list").append(`
                <div style="display: flex; margin-top: 30px;">
                  <div style="width: 250px;"><img style="height: 135px;" src="../../images/product/${element.img1}" alt=""></div>
                  
                  <div style="margin-left: 20px; font-size: 17px; font-weight: 500;">Product Name : <span
                      style="font-size: 15px; font-weight: 400;">${element.product_name} </span> <a
                      style="font-size: 15px; font-weight: 400; text-decoration: underline;" target="_blank" href="/aquaspace/frontend/src/reg/view-product-page.html?id=${element.id}">link</a> <br>
                        <ul>
                            ${reasonsList}
                        </ul>
                      </div>
                    <div style="position:relative; left: 40px;">
                        <button class="button" onclick="unblockProduct(${element.id})">Unblock</button>
                        <button class="button" style="background-color: #8B0000;" onclick="declineProduct(${element.id})">Decline</button>                    
                    </div>
                </div>
       `);
          },
          error: function (errMsg) {
            window.location.replace(
              "/aquaspace/frontend/src/Error/" + errMsg.status + ".html"
            );
          },
        });
      });
    },
    error: function (errMsg) {
      window.location.replace(
        "/aquaspace/frontend/src/Error/" + errMsg.status + ".html"
      );
    },
  });
});

$("#unblockAccount").click(function () {
  let req = {
    email: email,
  };
  $.ajax({
    type: "POST",
    url: setUrl("Admin/Admin/unblockAccountForAppeal"),
    data: JSON.stringify(req),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log("data: " + data);
      successMsg(["successfully decline the appeal"]);
      delay(function () {
        window.location.replace(
          "/aquaspace/frontend/src/Admin/AdminIssuesUser.html"
        );
      }, 3000);
    },
    error: function (errMsg) {
      // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    },
  });
});
$("#declineAccount").click(function () {
  let req = {
    email: email,
  };
  console.log(req);
  $.ajax({
    type: "POST",
    url: setUrl("Admin/Admin/declineAccountForAppeal"),
    data: JSON.stringify(req),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log(data);
      successMsg(["successfully decline the appeal"]);
      delay(function () {
        window.location.replace(
          "/aquaspace/frontend/src/Admin/AdminIssuesUser.html"
        );
      }, 3000);
    },
    error: function (errMsg) {
      window.location.replace(
        "/aquaspace/frontend/src/Error/" + errMsg.status + ".html"
      );
    },
  });
});
