$(document).ready(function () {
  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  let req = {
    id: id,
  };
  var pics = [];
  $.ajax({
    type: "POST",
    url: setUrl("Reg/Reg/getFishDataPost"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(req),
    success: function (data) {
      console.log(data);
      pics.push("../../images/fish_article/" + data.img_1);
      pics.push("../../images/fish_article/" + data.img_2);
      pics.push("../../images/fish_article/" + data.img_3);
      pics.push("../../images/fish_article/" + data.img_4);
      (function () {
        var i = 0;
        var el = document.getElementById("fish-img");
    
        function toggle() {
          el.src = pics[i]; // set the image
          i = (i + 1) % pics.length; // update the counter
        }
        toggle();
        setInterval(toggle, 3000);
      })();

      $("#fish-title").html(`${data.name}`);
      $("#desc").html(`${data.description}`);
      $("#diet").val(data.special_diet);
      $("#minPh").val(data.min_ph);
      $("#maxPh").val(data.max_ph);
      $("#minWaterTemp").val(data.min_water_temp);
      $("#maxWaterTemp").val(data.max_water_temp);
      $("#environment").val(data.environment);
      $("#careLevel").val(data.care_level);
      $("#tankCapacity").val(data.tank_capacity);
      $("#petMaxLength").val(data.max_length);
      if(data.ability_to_sell){
        $('#abilityToSell').prop('checked', true);
      }
      if(data.ability_to_release){
        $('#abilityToRelease').prop('checked', true);
      }
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
    data: JSON.stringify(req),
    success: function (data) {

      var count = 0;
      data.forEach((element) => {
        if (count == 0) {
          count++;
          $("#other-names").append(`
        ${element.name}
                  `);
        }
        else {
          $("#other-names").append(`
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
    data: JSON.stringify(req),
    success: function (data) {
      var text = "";
      var count = 0;
      data.forEach((element) => {
        if(count==0){
          count++;
          text = text + element.country;
        }
        else{
          text = text + ", " + element.country;
        }
      });

      $("#nativeTo").val(text);
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
    data: JSON.stringify(req),
    success: function (data) {
      console.log(data)
      var text = "";
      var count = 0;
      data.forEach((element) => {
        if(count==0){
          count++;
          text = text + element.name;
        }
        else{
          text = text + ", " + element.name;
        }
      });

      $("#compatible-fish").val(text);
    },
    error: function (errMsg) {
      // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    },
  });
});
