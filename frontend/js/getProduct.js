//api setter

function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
  }
$( document ).ready(function() {

    $("#reviews").click(function(){
        $(".reviews").css("display", "block");
        $(".questions").css("display", "none");
      });
      $("#questions").click(function(){
        $(".questions").css("display", "block");
        $(".reviews").css("display", "none");
      });
    
var url = new URL(window.location.href);
var id = url.searchParams.get("id");

var req = {"id":id};
    $.ajax({
        type: "POST",
        url:setUrl("Common/getProduct"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(req),
        success: function(data){
    // console.log(JSON.stringify(data));
        $("#column_1").html(`
           <img src="../../images/product/${data.img1}" alt="" width="100%" height="500px" id="ProductImg">

                <div class="small-img-row">
                    <div class="small-img-col">
                        <img id="img1" src="../../images/product/${data.img1}" alt="" width="100%" class="small-img">
                    </div>
                    <div class="small-img-col">
                        <img id="img2" src="../../images/product/${data.img2}" alt="" width="100%" class="small-img">
                    </div>
                    <div class="small-img-col">
                        <img id="img3" src="../../images/product/${data.img3}" alt="" width="100%" class="small-img">
                    </div>
                    <div class="small-img-col">
                        <img id="img4" src="../../images/product/${data.img4}" alt="" width="100%" class="small-img">
                    </div>
                </div>
           `)
        var ProductImg = document.getElementById("ProductImg");
var img1 = document.getElementById("img1");
var img2 = document.getElementById("img2");
var img3 = document.getElementById("img3");
var img4 = document.getElementById("img4");

img1.onclick = function () {
    ProductImg.src = img1.src;
}
img2.onclick = function () {
    ProductImg.src = img2.src;
}
img3.onclick = function () {
    ProductImg.src = img3.src;
}
img4.onclick = function () {
    ProductImg.src = img4.src;
} 

if(data.type == 1 || data.type == 2 )
    {
        $("#column_2").html(`
        <h2 id="name">${data.product_name}</h2>
                <p id="price">Rs. ${data.price}</p>
                <!-- <select>
                    <option>Delivery Option</option>
                    <option>In Store Pick-up</option>
                    <option>In Store Delivery Service</option>
                    <option>Third Party Delivery Service</option>
                </select> -->
                <input type="number" value="1"><span id="quantity">${data.quantity}</span><span>     </span><span>Available</span><br>
                <a href="cart.html" class="btn">Add to Cart</a>
                <a href="wishlist.html" class="btn">Wishlist</a>
                <h3>Product Details</h3>
                <br>
                <p id="description">${data.description}</p>
                <br>
                <h3>Address</h3>
                <p id="address">${data.address}</p>

        `)
    }
    else if(data.type == 3){
        $("#column_2").html(`
        <h2 id="name">${data.product_name}</h2>
                <p id="price">Rs. ${data.price}</p>
                <select>
                    <option>Delivery Option</option>
                    <option>In Store Pick-up</option>
                    <option>In Store Delivery Service</option>
                    <option>Third Party Delivery Service</option>
                </select> 
                <input type="number" value="1"><span id="quantity">${data.quantity}</span><span>     </span><span>Available</span><br>
                <a href="#" class="btn">Add to Cart</a>
                <a href="#" class="btn">Wishlist</a>
                <h3>Product Details</h3>
                <br>
                <p id="description">${data.description}</p>
                <br>
                <h3>Address</h3>
                <p id="address">${data.address}</p>

        `)
    }
   else if(data.type == 4){
    $("#column_2").html(
        `<h2>${data.product_name}</h2>
        <p>${data.address}</p>
        <a href="inquiry.html" class="btn">Inquire</a>
        <h3>Product Details</h3>
        <p>${data.description}</p>

        <div class="tags">
            <div class="tag">tag 1</div>
            <div class="tag">tag 2</div>
            <div class="tag">tag 3</div>
        </div> 
        `
    )
   }

   
        },
        error: function(errMsg) {
            window.location.replace("../src/Error"+errMsg.status+".html");
        }
    });
});

