function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

$(document).ready(function(){
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    var req = {"id":id}
        // get delivery
        $.ajax({
            type: "GET",
            url:setUrl("Store/Store/checkDeliveryOption"),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function(data){
                // console.log(data);
                let mode =data.del_mode;
                
                if(mode >= 4){
                    $("#delivery-mode").append(`<div class="row">
                    <input type="checkbox" name="delivery" id="thirdPartyDelivery" ><p>Third Party Delivery Service</p>
                </div>`);
                    mode-=4;
                }
                if(mode >= 2){
                    $("#delivery-mode").append(`<div class="row">
                    <input type="checkbox" name="delivery" id="inStoreDelivery" ><p>In Store Delivery Service</p>
                </div>`);
                    mode-=2; 
                }
                if(mode >= 1){
                    $("#delivery-mode").append(`<div class="row">
                    <input type="checkbox" name="delivery" id="inStorePickUp" ><p>In Store Pick-up</p>
                </div>`); 
                }
            },
            error: function(errMsg) {
                //window.location.replace("../src/Error"+errMsg.status+".html");
            }
        });

        $.ajax({
            type: "POST",
            url:setUrl("Store/Store/getEditInventory"),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(req),
            async: false,
            success: function(data){
                let delivery = data.delivery;
                $("#inventory-img1").css("background-image", `url(/aquaspace/frontend/images/product/${data.img1})`);
                $("#inventory-img2").css("background-image", `url(/aquaspace/frontend/images/product/${data.img2})`);
                $("#inventory-img3").css("background-image", `url(/aquaspace/frontend/images/product/${data.img3})`);
                $("#inventory-img4").css("background-image", `url(/aquaspace/frontend/images/product/${data.img4})`);
                $("#name").val(data.product_name);
                $("#price").val(data.price);
                $("#quantity").val(data.quantity);
                if(data.status == 1){
                    $('#status').prop('checked', true);
                }
                $("#details").val(data.description);
                $('#weight').val(data.weight);

                if(data.type == 3){
                    $("#dime").append(`<td>Package Dimension</td>
                    <td>
                        <div class="diam">
                            <p>WIDTH (cm)</p> <input type="number" id="width" name="width" min="0" value=${data.width}>
                            <p>HEIGHT (cm)</p> <input type="number" id="height" name="height" min="0" value=${data.height}>
                            <p>LENGTH (cm)</p> <input type="number" id="length" name="length" min="0" value=${data.length}>
                        </div>
                    </td>`);
                    $("#cap").append(`<td>Capacity(Liter)</td>
                    <td><input type="number" id="capacity" name="capacity" min="0" value=${data.capacity}></td>
                            `);

                }

                if(delivery >= 4){
                    $('#thirdPartyDelivery').prop('checked', true);
                    delivery-=4;
                }
                if(delivery >= 2){
                    $('#inStoreDelivery').prop('checked', true);
                    delivery-=2;
                }
                if(delivery >= 1){
                    $('#inStorePickUp').prop('checked', true);
                }
                // console.log(data);
            },
            error: function(errMsg) {
                // window.location.replace("../src/Error"+errMsg.status+".html");
            }
        });
        
})

// edit save not complete

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

// update edit inventory not complete yet

$("#invent-save").click(function(){
    var url = new URL(window.location.href);
    let id = url.searchParams.get("id");

    let Name = $("#name").val();
    let price = $("#price").val();
    let quantity = $("#quantity").val();
    let details = $("#details").val();
    let weight = $("#weight").val();
    let deliveryMode = 0;
    let errors = [];
    let errFlag = 0;
    let status,width = 0,height =0,length = 0,capacity = 0;

    if($('#status').is(':checked')){
        status =1;
    }
    else{
        status =2;
    }

    if (document.getElementById('width')) {
            let width = $("#width").val();
    }
    if (document.getElementById('height')) {
            let height = $("#height").val();
    }
    if (document.getElementById('length')) {
            let length = $("#length").val();
    }
    if (document.getElementById('capacity')) {
            let capacity = $("#capacity").val();
    }


    if (document.getElementById('inStorePickUp')) {
        if($('#inStorePickUp').is(':checked')){
            deliveryMode += 1;
        }
    }
    if (document.getElementById('inStoreDelivery')) {
        if($('#inStoreDelivery').is(':checked')){
            deliveryMode += 2;
        }
    }
    if (document.getElementById('thirdPartyDelivery')) {
        if($('#thirdPartyDelivery').is(':checked')){
            deliveryMode += 4;
        }
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
                "id" :id,
                "Name" : Name,
                "price" : price,
                "quantity" : quantity,
                "details" : details,
                "deliveryMode" : deliveryMode,
                "weight" : weight,
                "pic1" :imagebase64_1.replace(/^data:image\/[a-z]+;base64,/, ""),
                "pic2" :imagebase64_2.replace(/^data:image\/[a-z]+;base64,/, ""),
                "pic3" :imagebase64_3.replace(/^data:image\/[a-z]+;base64,/, ""),
                "pic4" :imagebase64_4.replace(/^data:image\/[a-z]+;base64,/, ""),
                "exen1" : imgExtension1,
                "exen2" : imgExtension2,
                "exen3" : imgExtension3,
                "exen4" : imgExtension4,
                "status" :status,  
                "height" : height,
                "width" : width,
                "length" : length,
                "capacity" :capacity,
            }

            $.ajax({
                type: "POST",
                url:setUrl("Store/Store/editInventory"),
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    // console.log(data);
                    successMsg(["Updated Inventory"]);
                    delay(function(){
                    window.location.replace("/aquaspace/frontend/src/Store/StoreInventory.html")
                    },5000);
                },
                error: function(errMsg) {
                    window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
                }
            });
        }
    else{
        errorShow(errors);
        // alert(JSON.stringify(errors));
    }
});
  