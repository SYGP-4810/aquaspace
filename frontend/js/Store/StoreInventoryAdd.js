 //api setter
function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

$( document ).ready(function() {
    $.ajax({
        type: "GET",
        url:setUrl("Store/Store/checkDeliveryOption"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            // console.log(data);
            let mode =data.del_mode;
            
            if(mode >= 4){
                $("#delivery-mode").append(`<div class="row">
                <input type="checkbox" name="delivery" id="thirdPartyDelivery" checked><p>Third Party Delivery Service</p>
            </div>`);
                mode-=4;
            }
            if(mode >= 2){
                $("#delivery-mode").append(`<div class="row">
                <input type="checkbox" name="delivery" id="inStoreDelivery" checked><p>In Store Delivery Service</p>
            </div>`);
                mode-=2; 
            }
            if(mode >= 1){
                $("#delivery-mode").append(`<div class="row">
                <input type="checkbox" name="delivery" id="inStorePickUp" checked><p>In Store Pick-up</p>
            </div>`); 
            }

        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});




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



$("#InventorySaveE").click(function(){
    let productName = $("#productname").val();
    let productCategory = $("#productcategory").val();
    let price = $("#price").val();
    let quantity = $("#quantity").val();
    let details = $("#details").val();
    let weight = $("#weight").val();
    let deliveryMode = 0;
    let errors = [];
    let errFlag = 0;
    let width = $("#width").val();
    let height = $("#height").val();
    let length = $("#length").val();
    let capacity = $("#capacity").val();

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

    if(productName == ''){
        errors.push("Product name required");
        errFlag++;
    }
    if(productCategory == ''){
        errors.push("product Category required");
        errFlag++;
    }
    if(price == ''){
        errors.push("price required");
        errFlag++;
    }
    if(quantity == ''){
        errors.push("quantity  required");
        errFlag++;
    }
    if(details == ''){
        errors.push("details required");
        errFlag++;
    }
    if(deliveryMode == 0){
        errors.push("deliveryMode required");
        errFlag++;
    }
    if(weight == 0){
        errors.push("weight required");
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
    if(acceptedFileTypes.indexOf(imgExtension4.toLowerCase())===-1){
        errors.push("Image 4 type must be jpg ,jpeg or png");
        errFlag++;
    }

    if(errFlag == 0){
            var req = {
                "Name" : productName,
                "Category" : productCategory,
                "price" : price,
                "quantity" : quantity,
                "details" : details,
                "deliveryMode" : deliveryMode,
                "weight" :weight,
                "capacity" : capacity,
                "height" : height,
                "width" : width,
                "length" : length,
                "pic1" :imagebase64_1.replace(/^data:image\/[a-z]+;base64,/, ""),
                "pic2" :imagebase64_2.replace(/^data:image\/[a-z]+;base64,/, ""),
                "pic3" :imagebase64_3.replace(/^data:image\/[a-z]+;base64,/, ""),
                "pic4" :imagebase64_4.replace(/^data:image\/[a-z]+;base64,/, ""),
                "exen1" : imgExtension1,
                "exen2" : imgExtension2,
                "exen3" : imgExtension3,
                "exen4" : imgExtension4,
                "type" : "3"
            }
            // console.log(req);
            $.ajax({
                type: "POST",
                url:setUrl("Store/Store/addInventory"),
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    //  console.log(data);
                    if(data.flag == 1){
                        errorShow([data.msg,"Update Package"]);
                        delay(function(){
                        window.location.replace("/aquaspace/frontend/src/Store/StoreEdit.html#sub")
                        },4000)
                    }else if(data.flag == 2){
                        errorShow([data.msg,"Buy Relevent Package"]);
                        delay(function(){
                        window.location.replace("/aquaspace/frontend/src/Store/StoreEdit.html#sub")
                        },4000)
                    }else if(data.flag == 0){
                        successMsg([data.msg]);
                        delay(function(){
                        window.location.replace("/aquaspace/frontend/src/Store/StoreInventory.html")
                        },5000)
                    }
                    
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

$("#InventorySaveF").click(function(){
    let fishName = $("#fishname").val();
    let fishCategory = $("#fishcategory").val();
    let price = $("#price").val();
    let quantity = $("#quantity").val();
    let details = $("#details").val();
    let weight = $("#weight").val();
    let deliveryMode = 0;
    let errors = [];
    let errFlag = 0;


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

    if(fishName == ''){
        errors.push("Fish name required");
        errFlag++;
    }
    if(fishCategory == ''){
        errors.push("Fish Category required");
        errFlag++;
    }
    if(price == ''){
        errors.push("price required");
        errFlag++;
    }
    if(quantity == ''){
        errors.push("quantity  required");
        errFlag++;
    }
    if(details == ''){
        errors.push("details required");
        errFlag++;
    }
    if(deliveryMode == 0){
        errors.push("delivery Mode required");
        errFlag++;
    }
    if(weight == ''){
        errors.push("weight required");
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
    if(acceptedFileTypes.indexOf(imgExtension4.toLowerCase())===-1){
        errors.push("Image 4 type must be jpg ,jpeg or png");
        errFlag++;
    }
    if(errFlag == 0){
            var req = {
                "Name" : fishName,
                "Category" : fishCategory,
                "price" : price,
                "quantity" : quantity,
                "details" : details,
                "deliveryMode" : deliveryMode,
                "weight" : weight,
                "height" : "0",
                "width" : "0",
                "length" : "0",
                "capacity" :"0",
                "pic1" :imagebase64_1.replace(/^data:image\/[a-z]+;base64,/, ""),
                "pic2" :imagebase64_2.replace(/^data:image\/[a-z]+;base64,/, ""),
                "pic3" :imagebase64_3.replace(/^data:image\/[a-z]+;base64,/, ""),
                "pic4" :imagebase64_4.replace(/^data:image\/[a-z]+;base64,/, ""),
                "exen1" : imgExtension1,
                "exen2" : imgExtension2,
                "exen3" : imgExtension3,
                "exen4" : imgExtension4,
                "type" : "1"
            }
            console.log(req);
            $.ajax({
                type: "POST",
                url:setUrl("Store/Store/addInventory"),
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    console.log(data);
                    if(data.flag == 1){
                        errorShow([data.msg,"Update Package"]);
                        delay(function(){
                        window.location.replace("/aquaspace/frontend/src/Store/StoreEdit.html#sub")
                        },4000)
                    }else if(data.flag == 2){
                        errorShow([data.msg,"Buy Relevent Package"]);
                        delay(function(){
                        window.location.replace("/aquaspace/frontend/src/Store/StoreEdit.html#sub")
                        },4000);
                    }else if(data.flag == 0){
                        successMsg([data.msg]);
                        delay(function(){
                        window.location.replace("/aquaspace/frontend/src/Store/StoreInventory.html")
                        },5000)
                    }else if(data.flag == 3){
                        errorShow([data.msg,"Give the location to proceed"]);
                        delay(function(){
                        window.location.replace("/aquaspace/frontend/src/Store/StoreEdit.html#lat")
                        },4000)
                    }
                },
                error: function(errMsg) {
                    // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
                }
            });
        }
    else{
        errorShow(errors);
        // alert(JSON.stringify(errors));
    }
});

$("#InventorySaveP").click(function(){
    let plantName = $("#plantname").val();
    let plantCategory = $("#plantcategory").val();
    let price = $("#price").val();
    let quantity = $("#quantity").val();
    let details = $("#details").val();
    let weight = $("#weight").val();
    let deliveryMode = 0;
    let errors = [];
    let errFlag = 0;
    
    
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

    if(plantName == ''){
        errors.push("Plant name required");
        errFlag++;
    }
    if(plantCategory == ''){
        errors.push("Plant Category required");
        errFlag++;
    }
    if(price == ''){
        errors.push("price required");
        errFlag++;
    }
    if(quantity == ''){
        errors.push("quantity  required");
        errFlag++;
    }
    if(details == ''){
        errors.push("details required");
        errFlag++;
    }
    if(deliveryMode == 0){
        errors.push("deliveryMode required");
        errFlag++;
    }
    if(weight == ''){
        errors.push("weight required");
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
    if(acceptedFileTypes.indexOf(imgExtension4.toLowerCase())===-1){
        errors.push("Image 4 type must be jpg ,jpeg or png");
        errFlag++;
    }

    if(errFlag == 0){
            var req = {
                "Name" : plantName,
                "Category" : plantCategory,
                "price" : price,
                "quantity" : quantity,
                "details" : details,
                "deliveryMode" : deliveryMode,
                "weight" : weight,
                "height" : "0",
                "width" : "0",
                "length" : "0",
                "capacity" :"0",
                "pic1" :imagebase64_1.replace(/^data:image\/[a-z]+;base64,/, ""),
                "pic2" :imagebase64_2.replace(/^data:image\/[a-z]+;base64,/, ""),
                "pic3" :imagebase64_3.replace(/^data:image\/[a-z]+;base64,/, ""),
                "pic4" :imagebase64_4.replace(/^data:image\/[a-z]+;base64,/, ""),
                "exen1" : imgExtension1,
                "exen2" : imgExtension2,
                "exen3" : imgExtension3,
                "exen4" : imgExtension4,
                "type" : "2"
            }
            //  console.log(req);
            $.ajax({
                type: "POST",
                url:setUrl("Store/Store/addInventory"),
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    // console.log(data);
                    if(data.flag == 1){
                        errorShow([data.msg,"Update Package"]);
                        delay(function(){
                        window.location.replace("/aquaspace/frontend/src/Store/StoreEdit.html#sub")
                        },4000)
                    }else if(data.flag == 2){
                        errorShow([data.msg,"Buy Relevent Package"]);
                        delay(function(){
                        window.location.replace("/aquaspace/frontend/src/Store/StoreEdit.html#sub")
                        },4000)
                    }else if(data.flag == 0){
                        successMsg([data.msg]);
                        delay(function(){
                        window.location.replace("/aquaspace/frontend/src/Store/StoreInventory.html")
                        },5000)
                    }
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
