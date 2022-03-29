var compatibleFishes = [];
var otherName = [];
var nativeTo = [];

// get extention varibales
var imgExtension1 = " ", imgExtension2 = " ", imgExtension3 = " ", imgExtension4 = " ";

$("#inventory-img1").change(function (e) {
    var fileName = e.target.files[0].name;
    fileExtension = fileName.split('.').pop();
    imgExtension1 = fileExtension;
 });

 $("#inventory-img2").change(function (e) {
    var fileName = e.target.files[0].name;
    fileExtension = fileName.split('.').pop();
    imgExtension2 = fileExtension;
 });

 $("#inventory-img3").change(function (e) {
    var fileName = e.target.files[0].name;
    fileExtension = fileName.split('.').pop();
    imgExtension3 = fileExtension;
 });

 $("#inventory-img4").change(function (e) {
    var fileName = e.target.files[0].name;
    fileExtension = fileName.split('.').pop();
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
    reader.onloadend = function() {  
        imagebase64_1 = reader.result;  
    }  
    reader.readAsDataURL(file);  
}

function encodeImageFileAsURL2(element) {  
    let file = element.files[0];  
    let reader = new FileReader();  
    reader.onloadend = function() {  
        imagebase64_2 = reader.result;  
    }  
    reader.readAsDataURL(file);  
}

function encodeImageFileAsURL3(element) {  
    let file = element.files[0];  
    let reader = new FileReader();  
    reader.onloadend = function() {  
        imagebase64_3 = reader.result;  
    }  
    reader.readAsDataURL(file);  
}

function encodeImageFileAsURL4(element) {  
    let file = element.files[0];  
    let reader = new FileReader();  
    reader.onloadend = function() {  
        imagebase64_4 = reader.result;  
    }  
    reader.readAsDataURL(file);  
}



function getValuesOfFish(data) {
  $("#auto").val($(data).html());
  $('#fish_list').hide();
  // console.log($("#auto").val());

}



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
    url: setUrl("Expert/Expert/getCompatibleFish"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      var names = [];
      data.forEach((element) => {
        $("#fish_list").append(`
          <li onclick="getValuesOfFish(this)">${element.name}</li>`);
      });
    },
  });

$("#add").click(function () {
  let name = $("#auto").val();
  $("#auto").val('');
  if(name != ''){
    compatibleFishes.push(name);
  $('#compatible-fish-list').append(`
    <div class="compatible-fish-list-item">
                            ${name}
                        </div>`);
  }
})
  
$("#addOtherFishName").click(function(){
  let fName = $("#otherName").val();
  $("#otherName").val('');
  if(fName != ''){
    otherName.push(fName);
  $("#otherFishNames").append(`<div class="compatible-fish-list-item">
  ${fName}
</div>`);
  }
  

});

$("#nativeToBtn").click(function(){
  let country = $("#nativeTo").val();
  $("#nativeTo").val('');
  if(country != ''){
    nativeTo.push(country);
  $("#nativeToDiv").append(`<div class="compatible-fish-list-item">
  ${country}
</div>`);
  }

});

$("#save").click(function(){
  let fishName = $("#fishName").val();
  let description = $("#description").val();
  let maxWaterTemp = $("#maxWaterTemp").val();
  let petMaxLength = $("#petMaxLength").val();
  let maxPh = $("#maxPh").val();
  let diet = $("#diet").val();
  let minPh = $("#minPh").val();
  let environment = $("#environment").val();
  let careLevel = $("#careLevel").val();
  let tankCapacity = $("#tankCapacity").val();
  let abilityToSell = 0;
  let minWaterTemp = $("#minWaterTemp").val();
  if($("#abilityToSell").is(":checked")){
    abilityToSell = 1;
  }
  let abiltiyToRelease = 0;
  if($("#abilityToRelease").is(":checked")){
    abiltiyToRelease = 1;
  }
  let errFlag = 0;
  let errors = [];

  //validate before insert a fish article
  if(fishName == ""){
    errors.push("fish name is required");
    errFlag++;
  }
  if(description == ""){
    errors.push("description is required");
    errFlag++;
  }
  if(maxWaterTemp == undefined){
    errors.push("max water temparature is required");
    errFlag++;
  }
  if(petMaxLength == undefined){
    errors.push("pet max length is required");
    errFlag++;
  }
  if(maxPh == undefined){
    errors.push("max ph is required");
    errFlag++;
  }
  if(diet == undefined){
    errors.push("diet is required");
    errFlag++;
  }
  if(minPh == undefined){
    errors.push("min ph is required");
    errFlag++;
  }
  if(environment == undefined){
    errors.push("environment is required");
    errFlag++;
  }
  if(careLevel == undefined){
    errors.push("care level is required");
    errFlag++;
  }
  if(tankCapacity == undefined){
    errors.push("tank capacity is required");
    errFlag++;
  }
  if(nativeTo.length < 1){
    errors.push("atleast on of country need to be specified");
    errFlag++;
  }
  if(otherName < 5){
    errors.push("atleast enter five different names");
    errFlag++;
  }
  if(minWaterTemp == undefined){
    errors.push("minimum water temp is undefined");
    errFlag++;
  }
  const acceptedFileTypes = ["png", "jpg", "jpeg"];
    if(acceptedFileTypes.indexOf(imgExtension1.toLowerCase())===-1){
        errors.push("Image 1 type must be jpg ,jpeg or png");
        errFlag++;
    }
    if(acceptedFileTypes.indexOf(imgExtension2.toLowerCase())===-1){
        errors.push("Image 2 type must be jpg ,jpeg or png");
        errFlag++;
    }
    if(acceptedFileTypes.indexOf(imgExtension3.toLowerCase())===-1){
        errors.push("Image 3 type must be jpg ,jpeg or png");
        errFlag++;
    }
    if(acceptedFileTypes.indexOf(imgExtension3.toLowerCase())===-1){
        errors.push("Image 4 type must be jpg ,jpeg or png");
        errFlag++;
    }
  if(errFlag == 0){
    let req = {'fishName' : fishName,
              'description' : description,
              'maxWaterTemp' : maxWaterTemp,
              'petMaxLength' : petMaxLength,
              'maxPh' : maxPh,
              'minPh' : minPh,
              'environment' : environment,
              'careLevel' : careLevel,
              'tankCapacity': tankCapacity,
              'abilityToSell' : abilityToSell,
              'abiltyToRelease' : abiltiyToRelease,
              'compatibleFishes' : compatibleFishes,
              'otherNames' : otherName,
              'nativeTo' : nativeTo,
              'minWaterTemp' : minWaterTemp,
              'diet' : diet,
              "pic1" :imagebase64_1.replace(/^data:image\/[a-z]+;base64,/, ""),
              "pic2" :imagebase64_2.replace(/^data:image\/[a-z]+;base64,/, ""),
              "pic3" :imagebase64_3.replace(/^data:image\/[a-z]+;base64,/, ""),
              "pic4" :imagebase64_4.replace(/^data:image\/[a-z]+;base64,/, ""),
              "exen1" : imgExtension1,
              "exen2" : imgExtension2,
              "exen3" : imgExtension3,
              "exen4" : imgExtension4
            }
            // console.log(req);
    $.ajax({
        type: "POST",
        url:setUrl("Expert/Expert/addFishArticle"),
        data: JSON.stringify(req),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
          console.log(data);
          successMsg(["successfully added new fish article"]);
          delay(function(){
            window.location.replace("/aquaspace/frontend/src/Expert/articles.html");
          },3000);
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });

  }else{
    errorShow(errors);
  }
  
});
  