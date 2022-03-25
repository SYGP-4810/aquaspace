function setUrl(text) {
  return "/aquaspace/backend/public/index.php?" + text;
}

console.log(fish)
var url = new URL(window.location.href);
var no_of_fish = url.searchParams.get("ids");

for(i=1;i<=no_of_fish;i++){
    let id = "id"+i;
    var fishName = url.searchParams.get(id);

}

function renderArticle(data){
  var id = data.
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

      pics.push("../../images/" + data.img_1);
      pics.push("../../images/" + data.img_2);
      pics.push("../../images/" + data.img_3);
      pics.push("../../images/" + data.img_4);
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
}


function generatePDF(){
    const element = document.getElementsByTagName("html");
    var opt = {
        margin:       0,
        filename:     'myfile.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' }
      };

    html2pdf()
    .set(opt)
    .from(element)
    .save();
}