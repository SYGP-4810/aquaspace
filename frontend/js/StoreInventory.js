//api setter
function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

// get extention varibales
var imgExtension1, imgExtension2, imgExtension3, imgExtension4;

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



$("#InventorySave").click(function(){
    let productName = $("#productname").val();
    let productCategory = $("#productcategory").val();
    let price = $("#price").val();
    let quantity = $("#quantity").val();
    let details = $("#details").val();
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
                "productName" : productName,
                "productCategory" : productCategory,
                "price" : price,
                "quantity" : quantity,
                "details" : details,
                "deliveryMode" : deliveryMode,
                "pic1" :imagebase64_1.replace(/^data:image\/[a-z]+;base64,/, ""),
                "pic2" :imagebase64_2.replace(/^data:image\/[a-z]+;base64,/, ""),
                "pic3" :imagebase64_3.replace(/^data:image\/[a-z]+;base64,/, ""),
                "pic4" :imagebase64_4.replace(/^data:image\/[a-z]+;base64,/, ""),
                "exen1" : imgExtension1,
                "exen2" : imgExtension2,
                "exen3" : imgExtension3,
                "exen4" : imgExtension4
            }

            $.ajax({
                type: "POST",
                url:setUrl("Store/Store/addInventory"),
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    console.log(data);
                },
                error: function(errMsg) {
                    // window.location.replace("../src/Error"+errMsg.status+".html");
                }
            });
        }
    else{
        alert(JSON.stringify(errors));
    }

});