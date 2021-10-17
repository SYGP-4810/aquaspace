$(document).ready(function() {

  $.ajax({
    type: "GET",
    url:setUrl("Reg/Reg/getFishNames"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
      var names = [];
      data.forEach(element => {
          names.push(element.name);
      });
      // console.log(names);
      $("#auto").autocomplete({
      source: names 
  });
  }
});


$('#auto').change(function() {
  let name = $("#auto").val();
  
  var req = {"name" : name};

  console.log(req);
  $.ajax({
    type: "POST",
    url:setUrl("Reg/Reg/getFishDetails"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(req),
    success: function(data){
      // console.log(data.description);
      $("#description").val(data.description);
  }
  });
});


  $('#chkBox').change(function () {
    if ($('#chkBox').is(':checked')) {
      $.ajax({
              type: "GET",
              url:setUrl("Reg/Reg/getAddress"),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                $("#address").val(data.address);   
            }
          });
        }
});

  
//api setter
function setUrl(text){
  return "/aquaspace/backend/public/index.php?"+text;
}

// get extention varibales
var imgExtension1, imgExtension2, imgExtension3, imgExtension4;

$("#img1").change(function (e) {
  var fileName = e.target.files[0].name;
  fileExtension = fileName.split('.').pop();
  imgExtension1 = fileExtension;
});

$("#img2").change(function (e) {
  var fileName = e.target.files[0].name;
  fileExtension = fileName.split('.').pop();
  imgExtension2 = fileExtension;
});

$("#img3").change(function (e) {
  var fileName = e.target.files[0].name;
  fileExtension = fileName.split('.').pop();
  imgExtension3 = fileExtension;
});

$("#img4").change(function (e) {
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




  $("#btn").click(function(){
    let product = $("#product").val();
    let duration = $("#duration").val();
    let message = $("#message").val();
    let quantity = $("#quantity").val();
    let category = $("#category").val();
    let price = $("#price").val();
    let address = $("#address").val();
    let erFlag = 0;
    //validation criteria
   
    if(product == ""){
        alert("enter product name");
        $("#product").focus();
        erFlag ++;
    }
    if(duration == ""){
        alert("enter post duration");
        $("#duration").focus();
        erFlag ++;
    }
     if(price == ""){
         alert("enter price");
         $("#price").focus();
         erFlag ++;
     }
     if(category == ""){
      alert("enter category");
      $("#category").focus();
      erFlag ++;
  }
     if(address == ""){
         alert("enter address");
         $("#address").focus();
         erFlag ++;
     }
     if(quantity == ""){
      alert("enter price");
      $("#quantity").focus();
      erFlag ++;
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
          var req = {
            "product_name": product,
            "duration": duration,
            "message": message, 
            "price":price ,
            "category":category,
            "address": address, 
            "image":file,
            "img1Extension": img1Extension,
              "quantity" : quantity,
              "img1" :imagebase64_1.replace(/^data:image\/[a-z]+;base64,/, ""),
              "img2" :imagebase64_2.replace(/^data:image\/[a-z]+;base64,/, ""),
              "img3" :imagebase64_3.replace(/^data:image\/[a-z]+;base64,/, ""),
              "img4" :imagebase64_4.replace(/^data:image\/[a-z]+;base64,/, ""),
              "ex1" : imgExtension1,
              "ex2" : imgExtension2,
              "ex3" : imgExtension3,
              "ex4" : imgExtension4
          }

          $.ajax({
              type: "POST",
              url:setUrl("Reg/Reg/addPost"),
              data: JSON.stringify(req),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){
                  window.location.replace("/aquaspace/frontend/src/index.html")
              },
              error: function(errMsg) {
                  window.location.replace("../src/Error"+errMsg.status+".html");
              }
          });
      }
  else{
      alert(JSON.stringify(errors));
  }

});


})


// ------------------------------------------------
