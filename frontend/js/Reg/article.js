function setUrl(text) {
  return "/aquaspace/backend/public/index.php?" + text;
}
$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: setUrl("Reg/Reg/getArticles"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      $("#category0").addClass("active-category");
      console.log(data);
      data.forEach((element) => {
        $(".container-2").append(`
                <div class="col-3">
                <a href="/aquaspace/frontend/src/Reg/read-article.html?id=${element.id}"><img src="../../images/article/${element.pic}" alt=""></a>
                <h3>${element.title}</h3>
                <h4>${element.summary}</h4>
                <div id="details">
                    <h5>Posted on : ${element.date}</h5>
                </div>
            </div>
                    `);
      });

      $("#category1").click(function () {
        $("#category1").addClass("active-category");
        $("#category0,#category2,#category3").removeClass("active-category");
        $(".container-2").html(``);
        data.forEach((element) => {
          if (element.category == 1) {
            $(".container-2").append(`
                    <div class="col-3">
                    <a href="/aquaspace/frontend/src/Reg/read-article.html?id=${element.id}"><img src="../../images/${element.pic}" alt=""></a>
                    <h3>${element.title}</h3>
                    <h4>${element.summary}</h4>
                    <div id="details">
                        <h5>Posted on : ${element.date}</h5>
                    </div>
                </div>
                        `);
          }
        });
      });

      $("#category2").click(function () {
        $("#category2").addClass("active-category");
        $("#category0,#category1,#category3").removeClass("active-category");
        $(".container-2").html(``);
        data.forEach((element) => {
          if (element.category == 2) {
            $(".container-2").append(`
                    <div class="col-3">
                    <a href="/aquaspace/frontend/src/Reg/read-article.html?id=${element.id}"><img src="../../images/${element.pic}" alt=""></a>
                    <h3>${element.title}</h3>
                    <h4>${element.summary}</h4>
                    <div id="details">
                        <h5>Posted on : ${element.date}</h5>
                    </div>
                </div>
                        `);
          }
        });
      });

      $("#category3").click(function () {
        $("#category3").addClass("active-category");
        $("#category0,#category2,#category1").removeClass("active-category");
        $(".container-2").html(``);
        data.forEach((element) => {
          if (element.category == 3) {
            $(".container-2").append(`
                    <div class="col-3">
                    <a href="/aquaspace/frontend/src/Reg/read-article.html?id=${element.id}"><img src="../../images/${element.pic}" alt=""></a>
                    <h3>${element.title}</h3>
                    <h4>${element.summary}</h4>
                    <div id="details">
                        <h5>Posted on : ${element.date}</h5>
                    </div>
                </div>
                        `);
          }
        });
      });
      $("#category0").click(function () {
        $("#category0").addClass("active-category");
        $("#category1,#category2,#category3").removeClass("active-category");
        $(".container-2").html(``);
        data.forEach((element) => {
          $(".container-2").append(`
                    <div class="col-3">
                    <a href="/aquaspace/frontend/src/Reg/read-article.html?id=${element.id}"><img src="../../images/${element.pic}" alt=""></a>
                    <h3>${element.title}</h3>
                    <h4>${element.summary}</h4>
                    <div id="details">
                        <h5>Posted on : ${element.date}</h5>
                    </div>
                </div>
                        `);
        });
      });
    },
    error: function (errMsg) {
      // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    },
  });

  

  $.ajax({
    type: "GET",
    url: setUrl("Reg/Reg/getLatestArticles"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log(data);
      data.forEach((element) => {
        $('#newly-added').append(`
        <a href="/aquaspace/frontend/src/Reg/read-article.html?id=${element.id}" style="color:black;"> <h4>${element.title}</h4></a>
        
          `)
      });

     
     
    },
    error: function (errMsg) {
      // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    },
  });
});
