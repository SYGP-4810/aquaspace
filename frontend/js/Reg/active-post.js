function setUrl(text) {
  return "/aquaspace/backend/public/index.php?" + text;
}

$.ajax({
  type: "POST",
  url: setUrl("Reg/Reg/getActivePosts"),
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (data) {
    console.log(data);
    data.forEach((element) => {
      let post_status;
      let duration;
      if (element.status == 1) {
        post_status = "Active";
      }
      if (element.status == 2) {
        post_status = "Disabled";
      }

      if (element.duration == 1) {
        duration = "1 weeks";
      } else if (element.duration == 2) {
        duration = "2 weeks";
      } else if (element.duration == 3) {
        duration = "3 weeks";
      } else if (element.duration == 2) {
        duration = "2 weeks";
      } else if (element.duration == 4) {
        duration = "1 month";
      } else if (element.duration == 5) {
        duration = "2 months";
      } else if (element.duration == 6) {
        duration = "3 months";
      }

      if (element.status == 1) {
        $(".small-container").append(`

        <div class="product">
            <img src="../../images/product/${element.img1}" alt="" />
            <div class="product-info">
                <h4 class="title">${element.product_name}</h4>
                <p class="price">Rs ${element.price}</p>
                <div class="info">
                    <span>Created Date : </span>
                    <p class="date">${element.created_date}</p>
                </div>
                <div class="info">
                    <span>Status : </span>
                    <p class="date">${post_status}</p>
                </div>
                <div class="info">
                    <span>Duration : </span>
                    <p class="date">${duration}</p>
                </div>
                <div class="info">
                    <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">View post</a>
                </div>
                <button id="${element.id}" onclick="foo(event)">Remove</button>
            </div>
        </div>
        
`);
      }
      else {
        $(".small-container").append(`

        <div class="product">
            <img src="../../images/product/${element.img1}" alt="" />
            <div class="product-info">
                <h4 class="title">${element.product_name}</h4>
                <p class="price">Rs ${element.price}</p>
                <div class="info">
                    <span>Created Date : </span>
                    <p class="date">${element.created_date}</p>
                </div>
                <div class="info">
                    <span>Status : </span>
                    <p class="date">${post_status}</p>
                </div>
                <div class="info">
                    <span>Duration : </span>
                    <p class="date">${duration}</p>
                </div>
                <div class="info">
                    <a href="/aquaspace/frontend/src/Reg/product-page.html?id=${element.id}">View post</a>
                </div>
            </div>
        </div>
        
`);
      }
    });

    // if(data.length/4 )
  },
  error: function (errMsg) {
    //   window.location.replace("../src/Error"+errMsg.status+".html");
  },
});

function foo(event) {
  let id = event.srcElement.id;
  let req = {
    id: id,
  };
  let text =
    "Are you sure you want to remove this post? This cannot be undone!";
  if (confirm(text) == true) {
    $.ajax({
      type: "POST",
      url: setUrl("Reg/Reg/removeMyPost"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(req),
      success: function (data) {},
    });
  }
}
