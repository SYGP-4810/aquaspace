function initImageUpload(box) {
    let uploadField = box.querySelector('.image-upload');
  
    uploadField.addEventListener('change', getFile);
  
    function getFile(e){
      let file = e.currentTarget.files[0];
      checkType(file);
    }
    
    function previewImage(file){
      let thumb = box.querySelector('.image-preview'),
          reader = new FileReader();
  
      reader.onload = function() {
        thumb.style.backgroundImage = 'url(' + reader.result + ')';
      }
      reader.readAsDataURL(file);
      thumb.className += ' image-preview-default';
    }
  
    function checkType(file){
      let imageType = /image.*/;
      if (!file.type.match(imageType)) {
        throw 'Select an image file';
      } else if (!file){
        throw 'Image not selected';
      } else {
        previewImage(file);
      }
    }
    
  }
  
  // initialize box-scope
  var boxes = document.querySelectorAll('.box');
  
  for (let i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    initDropEffect(box);
    initImageUpload(box);
  }
  
  /// drop-effect
  function initDropEffect(box){
    let area, drop, areaWidth, areaHeight, maxDistance, dropWidth, dropHeight, x, y;
    
    // get clickable area for drop effect
    area = box.querySelector('.image-preview');
    area.addEventListener('click', fireRipple);
    
    function fireRipple(e){
      area = e.currentTarget
      // create drop
      if(!drop){
        drop = document.createElement('span');
        drop.className = 'drop';
        this.appendChild(drop);
      }
      // reset animate class
      drop.className = 'drop';
      
      // calculate dimensions of area (longest side)
      areaWidth = getComputedStyle(this, null).getPropertyValue("width");
      areaHeight = getComputedStyle(this, null).getPropertyValue("height");
      maxDistance = Math.max(parseInt(areaWidth, 10), parseInt(areaHeight, 10));
  
      // set drop dimensions to fill area
      drop.style.width = maxDistance + 'px';
      drop.style.height = maxDistance + 'px';
      
      // calculate dimensions of drop
      dropWidth = getComputedStyle(this, null).getPropertyValue("width");
      dropHeight = getComputedStyle(this, null).getPropertyValue("height");
      
      // calculate relative coordinates of click
      // logic: click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center
      x = e.pageX - this.offsetLeft - (parseInt(dropWidth, 10)/2);
      y = e.pageY - this.offsetTop - (parseInt(dropHeight, 10)/2) - 30;
      
      // position drop and animate
      drop.style.top = y + 'px';
      drop.style.left = x + 'px';
      drop.className += ' animate';
      e.stopPropagation();
      
    }
  }


function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url:setUrl("Store/Store/getStoreFront"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function(data){
            if(data.profilePic != null){
                $("#profile-pic").css("background-image", `url(/aquaspace/frontend/images/profile/${data.profilePic})`);
            }
            if(data.coverPic != null){
              $("#store-pic").css("background-image", `url(/aquaspace/frontend/images/profile/${data.coverPic})`);
            }
            $("#name").text(data['SName']);
            $("#date").text('member since '+data['date']);
            $("#address").text(data['address']);
            $("#about").text(data['about']);

        },
        error: function(errMsg) {
             window.location.replace("../src/Error"+errMsg.status+".html");
        }
    });

    $.ajax({
      type: "GET",
      url:setUrl("Store/Store/getInventory"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
        // console.log(data);
          data.forEach(element => {
                if(element.status == 1){
                  $("#stroe-item").append(`
            <div class="item">
              <img src="/aquaspace/frontend/images/product/${element.img1}">
              <label for="text">
                  <span style="font-weight: 600;">Name: -</span>
                  <span>${element.product_name}</</span>
              </label>
              <label for="text">
                  <span style="font-weight: 600;">Price: -</span>
                  <span>Rs ${element.price}</span>
              </label>
          </div>`);
                }
              
          });
      },
      error: function(errMsg) {
          window.location.replace("../src/Error"+errMsg.status+".html");
      }
  });
});

var imgExtension1 = " ", imgExtension2 = " ";
let profileImgFlag = 0;
let bgImgFlag = 0;

$("#img1").change(function (e) {
  var fileName = e.target.files[0].name;
  fileExtension = fileName.split('.').pop();
  imgExtension1 = fileExtension;
  bgImgFlag++;
});

$("#img2").change(function (e) {
  var fileName = e.target.files[0].name;
  fileExtension = fileName.split('.').pop();
  imgExtension2 = fileExtension;
  profileImgFlag++;
});

var imagebase64_1 = "";
var imagebase64_2 = "";

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

$("#store-save").click(function(){
    
  let about = $("#about").text();
  let errors = [];
  let errFlag = 0;
  if(about == "") {
    errors.push("About is required");
    errFlag++;
  }
  
  const acceptedFileTypes = ["png", "jpg", "jpeg"];
  
  var req = {
    "about": about,
  }

  if(bgImgFlag > 0){
    if(acceptedFileTypes.indexOf(imgExtension1.toLowerCase())===-1){ //bg image
      errors.push("BackGround Image type must be jpg ,jpeg or png");
      errFlag++;
    }
    
    req["bgImgFlag"] = 1;
    req["bgImage"] = imagebase64_1.replace(/^data:image\/[a-z]+;base64,/, "");
    req["extn1"] = imgExtension1;
      
  }else if(bgImgFlag == 0){
      req["bgImgFlag"] = 0;

  }
  if(profileImgFlag > 0){
    if(acceptedFileTypes.indexOf(imgExtension2.toLowerCase())===-1){  //profileimage
      errors.push("Profile Image type must be jpg ,jpeg or png"); 
      errFlag++;
    }

    req["profileImgFlag"] = 1;
    req["profileImage"] = imagebase64_2.replace(/^data:image\/[a-z]+;base64,/, "");
    req["extn2"] = imgExtension2;

  }else if(profileImgFlag == 0){
      
    req["profileImgFlag"] = 0;
  }

  if(errFlag == 0){
          $.ajax({
              type: "POST",
              url:setUrl("Store/Store/editStoreFront"),
              data: JSON.stringify(req),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function(data){         
                  successMsg(["Save Changes"]);
                  delay(function(){
                  window.location.replace("/aquaspace/frontend/src/Store/StoreStoreFront.html")
                  },5000);
              },
              error: function(errMsg) {
                  window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
              }
          });
      }
  else{
      errorShow(errors);
      alert(JSON.stringify(errors));
  }

});