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
            // window.location.replace("../src/Error"+errMsg.status+".html");
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
          });
      },
      error: function(errMsg) {
          //window.location.replace("../src/Error"+errMsg.status+".html");
      }
  });
});
