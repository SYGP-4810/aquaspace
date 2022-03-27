function setUrl(text) {
  return "/aquaspace/backend/public/index.php?" + text;
}

var blogArticleIdList = [];

var url = new URL(window.location.href);

//get the number of fish articles we need to render
var no_of_fish = url.searchParams.get("ids");

/* since we pass the names of the fish in the url, here we get the ids of each fish, 
so that we can use it to get the corresponding article for the fish */ 
for (i = 1; i <= no_of_fish; i++) {
  let id = "id" + i;
  var fishName = url.searchParams.get(id);
  req = {
    name: fishName,
  };
  $.ajax({
    type: "POST",
    url: setUrl("Reg/Reg/getFishID"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    data: JSON.stringify(req),
    success: function (data) {
      //for each fish id, i render the html needed for the pdf with different element ids but we no content
      $("#articles").append(`
  <div class="k">
                <h1 id="fish-title${data}"></h1>
                <div class="d">
                    <div class="col-2">
                        <div class="img" style="height: 300px;"><img id="fish-img${data}" src=""
                                alt="">
                        </div>
                    </div>
                    <div class="col-2">
                        <div style="margin-bottom: 10px; ">
                            <span style="font-size: 17px; font-weight: 500;">Other Names
                                :
                            </span>
                            <span id="other-names${data}" style="font-style: italic; font-weight: 400; font-size: 14px;">
                            </span>
                        </div>
                        <div>
                            <span style="font-size: 17px; font-weight: 500;">Desription : </span>
                            <span id="desc${data}" style=" font-weight: 400; font-size: 14px; ">
                            </span>
                        </div>
                    </div>
                </div>
                <div class="form">
                    <label class="label">
                        <span>Pet Max Length <small>(cm)</small></span>
                        <input id="petMaxLength${data}">
                    </label>
                    <label class="label">
                        <span>Diet</span>
                        <input id="diet${data}">
                    </label>
                    <label class="label">
                        <span>Water Parameters-PH Min</span>
                        <input id="minPh${data}" readonly>
                    </label>
                    <label class="label">
                        <span>Water Parameters-PH Max</span>
                        <input id="maxPh${data}" readonly>
                    </label>
                    <label class="label">
                        <span>Min Water Temp</span>
                        <input id="minWaterTemp${data}" readonly>
                    </label>
                    <label class="label">
                        <span>Max water Temp</span>
                        <input id="maxWaterTemp${data}" readonly>
                    </label>
                    <label class="label">
                        <span>Environment</span>
                        <input id="environment${data}" readonly>
                    </label>
                    <label class="label">
                        <span>Native To</span>
                        <input id="nativeTo${data}" readonly>
                    </label>
                    <label class="label">
                        <span>Care Level</span>
                        <input id="careLevel${data}" readonly>
                    </label>
                    <label class="label">
                        <span>Tank Capacity <small>(gallon)</small></span>
                        <input id="tankCapacity${data}" readonly value="10">
                    </label>
                    <label id="name_list">
                        <span>Compatible Fish</span>
                        <input id="compatible-fish${data}" readonly>
                    </label>
                    <label for="abilityToSell">
                        <span>Ability to Sell</span>
                        <input type="checkbox" id="abilityToSell${data}" readonly>
                    </label>
                    <label for="abilityToRelease">
                        <span>Ability to release</span>
                        <input type="checkbox" id="abilityToRelease${data}" readonly>
                    </label>
                </div>
            </div>
            <br>
            <br>
  `);

  //passing the fish id, i call the renderArticle function tht will load up the data in the empty html tags
      renderArticle(data);
      renderBlog(data);

    },
    error: function (errMsg) {
      // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    },
  });
}

function renderArticle(aritcleID) {
  let req = {
    id: aritcleID,
  };

  console.log(req);
  console.log($("#tankCapacity" + aritcleID).val());
  var pics = [];
  $.ajax({
    type: "POST",
    url: setUrl("Reg/Reg/getFishDataPost"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    data: JSON.stringify(req),
    success: function (data) {
      console.log(data)
      pics.push("../../images/fish_article/" + data.img_1);
      pics.push("../../images/fish_article/" + data.img_2);
      pics.push("../../images/fish_article/" + data.img_3);
      pics.push("../../images/fish_article/" + data.img_4);     
        (function () {
          var i = 0;
          var el = document.getElementById("fish-img" + aritcleID);

          console.log(pics[1])
          // function toggle() {
            el.src = pics[i]; // set the image
            // i = (i + 1) % pics.length; // update the counter
          // }
          // toggle();
          // setInterval(toggle, 3000);
        })();

      $("#fish-title" + aritcleID).html(`${data.name}`);
      $("#desc" + aritcleID).html(`${data.description}`);
      $("#diet" + aritcleID).val(data.special_diet);
      $("#minPh" + aritcleID).val(data.min_ph);
      $("#maxPh" + aritcleID).val(data.max_ph);
      $("#minWaterTemp" + aritcleID).val(data.min_water_temp);
      $("#maxWaterTemp" + aritcleID).val(data.max_water_temp);
      $("#environment" + aritcleID).val(data.environment);
      $("#careLevel" + aritcleID).val(data.care_level);
      $("#tankCapacity" + aritcleID).val(data.tank_capacity);
      // $("fish-img"+ aritcleID).val("../../images/fish_article/" + data.img_1);
    },
    error: function (errMsg) {
      // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    },
  });

  $.ajax({
    type: "POST",
    url: setUrl("Reg/Reg/getOtherNameOfFish"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    data: JSON.stringify(req),
    success: function (data) {
      var count = 0;
      data.forEach((element) => {
        if (count == 0) {
          count++;
          $("#other-names" + aritcleID).append(`
        ${element.name}
                  `);
        } else {
          $("#other-names" + aritcleID).append(`
        , ${element.name}
                  `);
        }
      });
    },
    error: function (errMsg) {
      // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    },
  });
  $.ajax({
    type: "POST",
    url: setUrl("Reg/Reg/getNativeCountries"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    data: JSON.stringify(req),
    success: function (data) {
      var text = "";
      var count = 0;
      data.forEach((element) => {
        if (count == 0) {
          count++;
          text = text + element.country;
        } else {
          text = text + ", " + element.country;
        }
      });

      $("#nativeTo" + aritcleID).val(text);
    },
    error: function (errMsg) {
      // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    },
  });
  $.ajax({
    type: "POST",
    url: setUrl("Reg/Reg/getCompatibleFish"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    data: JSON.stringify(req),
    success: function (data) {
      console.log(data);
      var text = "";
      var count = 0;
      data.forEach((element) => {
        if (count == 0) {
          count++;
          text = text + element.name;
        } else {
          text = text + ", " + element.name;
        }
      });

      $("#compatible-fish" + aritcleID).val(text);
    },
    error: function (errMsg) {
      // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    },
  });
}

function renderBlog(fishId){
  let req1 = {
    "id" :fishId
  }
  console.log("req1",req1);

  $.ajax({
    type: "POST",
    url: setUrl("Reg/Reg/getListOfArtcles"),
    data: JSON.stringify(req1),
    async: false,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log("list of article",data);
      data.forEach(element => {
        if(!blogArticleIdList.includes(element.id)){
          blogArticleIdList.push(element.id);
          $("#relatedBlog").append(`
              ${element.article}
              <br>
              <br>
          `);
        }
      })
      
    },
    error: function (errMsg) {
      // window.location.replace("../src/Error"+errMsg.status+".html");
    },
  });

}

