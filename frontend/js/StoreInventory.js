//api setter
function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

// create image and extention varibales
var imgExtension1, imgExtension2, imgExtension3, imgExtension4;
var imgFile1, imgFile2, imgFile3, imgFile4;
// get image
$("#inventory-img1").change(function (e) {
    var fileName = e.target.files[0].name;
    fileExtension = fileName.split('.').pop();
    imgExtension1 = fileExtension;
    imgFile1 = e.target.files[0];

 });

 $("#inventory-img2").change(function (e) {
    var fileName = e.target.files[0].name;
    fileExtension = fileName.split('.').pop();
    imgExtension2 = fileExtension;
    imgFile2 = e.target.files[0];

 });

 $("#inventory-img3").change(function (e) {
    var fileName = e.target.files[0].name;
    fileExtension = fileName.split('.').pop();
    imgExtension3 = fileExtension;
    imgFile3 = e.target.files[0];

 });

 $("#inventory-img4").change(function (e) {
    var fileName = e.target.files[0].name;
    fileExtension = fileName.split('.').pop();
    imgExtension4 = fileExtension;
    imgFile4 = e.target.files[0];

 });

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
        let file1 = "", file2 = "", file3 = "", file4 = "";
        var id =[];
        let imgId;
        let reader1 = new FileReader();
        reader1.readAsDataURL(imgFile1);
        reader1.onload = function () {
            file1 = reader1.result;

            var req = {
                "productName" : productName,
                "productCategory" : productCategory,
                "price" : price,
                "quantity" : quantity,
                "details" : details,
                "deliveryMode" : deliveryMode,
                "pic1" :file1.replace(/^data:image\/[a-z]+;base64,/, ""),
                "exen1" : imgExtension1
            }

            $.ajax({
                type: "POST",
                url:setUrl("Store/Store/addInventory"),
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    id.push(data.id);
                },
                error: function(errMsg) {
                    // window.location.replace("../src/Error"+errMsg.status+".html");
                }
            })
        }

        console.log(Object.id);
        console.log(typeof(id));

        let reader2 = new FileReader();
        reader2.readAsDataURL(imgFile2);
        reader2.onload = function () {
            file2 = reader2.result;
            // var req = {
            //     "id" : id,
            //     "pic2" :file2.replace(/^data:image\/[a-z]+;base64,/, ""),
            //     "exen2" : imgExtension2
            // }

            // $.ajax({
            //     type: "POST",
            //     url:setUrl("Store/Store/addInventoryPic"),
            //     data: JSON.stringify(req),
            //     contentType: "application/json; charset=utf-8",
            //     dataType: "json",
            //     success: function(data){
            //         console.log(data);
            //     },
            //     error: function(errMsg) {
            //         // window.location.replace("../src/Error"+errMsg.status+".html");
            //     }
            // })
        }
        let reader3 = new FileReader();
        reader3.readAsDataURL(imgFile3);
        reader3.onload = function () {
            file3 = reader2.result;
        }
        let reader4 = new FileReader();
        reader4.readAsDataURL(imgFile4);
        reader4.onload = function () {
            file4 = reader2.result;
        }   

    }
    else{
        alert(JSON.stringify(errors));
    }

});