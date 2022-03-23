function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

function subfunction() {
    var x = document.getElementById("package-size").value;
    
    var req = {"sub":x}
    // console.log(req);
    $.ajax({
        type: "POST",
        url:setUrl("Store/Store/getSub"),
        data: JSON.stringify(req),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            // console.log(data);
            $("#amount").val(data.subVal["rate"]);
            $("#order").val(data.subCouont);
            $("#items").val(data.subCouont + data.subVal["rate"]);
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
}




$(document).ready(function() {
    $.ajax({
        type: "GET",
        url:setUrl("Store/Store/getStoreProfile"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            // console.log(data);
            let delivery = data.delMode;
            if(data.profilePic != null){
                $("#profile-pic").css("background-image", `url(/aquaspace/frontend/images/profile/${data.profilePic})`);
            }
            $("#sname").val(data.SName);
            $("#fsname").val(data.SName);
            $("#flname").val(data.SName);
            $("#regno").val(data.RegNo);
            $("#femail").val(data.email);
            $("#tp").val(data.tp);
            $("#ftp").val(data.tp);
            $("#city").val(data.city);
            $("#fcity").val(data.city);
            $("#address").val(data.address);
            $("#faddress").val(data.address);
            $("#lat").val(data.lat);
            $("#lang").val(data.lan);
            $("#oname").val(data.OwnerName);
            $("#onic").val(data.OwnerNIC);

            if(data.subscriptionFlag == 1){
                let subscription;
                if(data.subType == 1){
                    subscription = 100;
                }else if(data.subType == 2){
                    subscription = 200;
                }else if(data.subType == 3){
                    subscription = 500;
                }else if(data.subType == 4){
                    subscription = 1000;
                }else if(data.subType == 5){
                    subscription = 5000;
                }else{
                    subscription = "";
                }

                $(".sub").html(`<label>End of the Subscription :-  </label><p class="date">${data.dateTo}</p>
                <br> <label>Subscription Package is :-  </label><p class="date">${subscription} Items</p>`);
                  
            }
            else{
                $(".sub").html(`<label style="color:rgba(255, 0, 0, 0.822); font-weight:bold">Please Update Your Subscription ! </label>`);
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

            let deliveryPrice= data.delivery;
            for(i=0; i < deliveryPrice.length; i++){
                if(deliveryPrice[i].type == 1 && deliveryPrice[i].range_km == 1){
                    $("#inOneFish").val(deliveryPrice[i].one_kg);
                    $("#inOneAddFish").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 1 && deliveryPrice[i].range_km == 2){
                    $("#inTwoFish").val(deliveryPrice[i].one_kg);
                    $("#inTwoAddFish").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 1 && deliveryPrice[i].range_km == 3){
                    $("#inThreeFish").val(deliveryPrice[i].one_kg);
                    $("#inThreeAddFish").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 1 && deliveryPrice[i].range_km == 4){
                    $("#inFourFish").val(deliveryPrice[i].one_kg);
                    $("#inFourAddFish").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 2 && deliveryPrice[i].range_km == 1){
                    $("#outOneFish").val(deliveryPrice[i].one_kg);
                    $("#outOneAddFish").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 2 && deliveryPrice[i].range_km == 2){
                    $("#outTwoFish").val(deliveryPrice[i].one_kg);
                    $("#outTwoAddFish").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 2 && deliveryPrice[i].range_km == 3){
                    $("#outThreeFish").val(deliveryPrice[i].one_kg);
                    $("#outThreeAddFish").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 2 && deliveryPrice[i].range_km == 4){
                    $("#outFourFish").val(deliveryPrice[i].one_kg);
                    $("#outFourAddFish").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 3 && deliveryPrice[i].range_km == 1){
                    $("#inOneEquipment").val(deliveryPrice[i].one_kg);
                    $("#inOneAddEquipment").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 3 && deliveryPrice[i].range_km == 2){
                    $("#inTwoEquipment").val(deliveryPrice[i].one_kg);
                    $("#inTwoAddEquipment").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 3 && deliveryPrice[i].range_km == 3){
                    $("#inThreeEquipment").val(deliveryPrice[i].one_kg);
                    $("#inThreeAddEquipment").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 3 && deliveryPrice[i].range_km == 4){
                    $("#inFourEquipment").val(deliveryPrice[i].one_kg);
                    $("#inFourAddEquipment").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 4 && deliveryPrice[i].range_km == 1){
                    $("#outOneEquipment").val(deliveryPrice[i].one_kg);
                    $("#outOneAddEquipment").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 4 && deliveryPrice[i].range_km == 2){
                    $("#outTwoEquipment").val(deliveryPrice[i].one_kg);
                    $("#outTwoAddEquipment").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 4 && deliveryPrice[i].range_km == 3){
                    $("#outThreeEquipment").val(deliveryPrice[i].one_kg);
                    $("#outThreeAddEquipment").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 4 && deliveryPrice[i].range_km == 4){
                    $("#outFourEquipment").val(deliveryPrice[i].one_kg);
                    $("#outFourAddEquipment").val(deliveryPrice[i].additional_one_kg);
                }
            }          
            
        },
        error: function(errMsg) {
            window.location.replace("../src/Error"+errMsg.status+".html");
        }
    });
});

$("#location-btn").click(function () { 
    if ("geolocation" in navigator){ 
        navigator.geolocation.getCurrentPosition(function(position){ 
                $("#lat").val(position.coords.latitude);
                $("#lang").val(position.coords.longitude);
        });
        
    }else{
        console.log("Browser doesn't support geolocation!");
    }
});

var imgExtension = " ";
let imgFlag = 0;

$("#profile_img").change(function (e) {
    var fileName = e.target.files[0].name;
    fileExtension = fileName.split('.').pop();
    imgExtension = fileExtension;
    imgFlag++;
 });

 var imagebase64 = "";

 function encodeImageFileAsURL(element) {  
    let file = element.files[0];  
    let reader = new FileReader();  
    reader.onloadend = function() {  
        imagebase64 = reader.result;  
    }  
    reader.readAsDataURL(file);  
}

$("#storeEdit").click(function(){
    
    let sname = $("#sname").val();
    let regno = $("#regno").val();
    let tp = $("#tp").val();
    let city = $("#city").val();
    let address = $("#address").val();
    let lat = $("#lat").val();
    let lang = $("#lang").val();
    let oname = $("#oname").val();
    let onic = $("#onic").val();
    let errors = [];
    let errFlag = 0;
    let deliveryMode = 0;
    
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

    let inOneFish = $('#inOneFish').val();
    let inOneAddFish = $('#inOneAddFish').val();
    let inTwoFish = $('#inTwoFish').val();
    let inTwoAddFish = $('#inTwoAddFish').val();
    let inThreeFish = $('#inThreeFish').val();
    let inThreeAddFish = $('#inThreeAddFish').val();
    let inFourFish = $('#inFourFish').val();
    let inFourAddFish = $('#inFourAddFish').val();
    let outOneFish = $('#outOneFish').val();
    let outOneAddFish = $('#outOneAddFish').val();
    let outTwoFish = $('#outTwoFish').val();
    let outTwoAddFish = $('#outTwoAddFish').val();
    let outThreeFish = $('#outThreeFish').val();
    let outThreeAddFish = $('#outThreeAddFish').val();
    let outFourFish = $('#outFourFish').val();
    let outFourAddFish = $('#outFourAddFish').val();
    let inOneEquipment = $('#inOneEquipment').val();
    let inOneAddEquipment = $('#inOneAddEquipment').val();
    let inTwoEquipment = $('#inTwoEquipment').val();
    let inTwoAddEquipment = $('#inTwoAddEquipment').val();
    let inThreeEquipment = $('#inThreeEquipment').val();
    let inThreeAddEquipment = $('#inThreeAddEquipment').val();
    let inFourEquipment = $('#inFourEquipment').val();
    let inFourAddEquipment = $('#inFourAddEquipment').val();
    let outOneEquipment = $('#outOneEquipment').val();
    let outOneAddEquipment = $('#outOneAddEquipment').val();
    let outTwoEquipment = $('#outTwoEquipment').val();
    let outTwoAddEquipment = $('#outTwoAddEquipment').val();
    let outThreeEquipment = $('#outThreeEquipment').val();
    let outThreeAddEquipment = $('#outThreeAddEquipment').val();
    let outFourEquipment = $('#outFourEquipment').val();
    let outFourAddEquipment = $('#outFourAddEquipment').val();
    
    const acceptedFileTypes = ["png", "jpg", "jpeg"];
    if(imgFlag > 0){
        if(acceptedFileTypes.indexOf(imgExtension.toLowerCase())===-1){
            errors.push("Image type must be jpg ,jpeg or png");
            errFlag++;
        }

        var req = {
            "sname" : sname,
            "regno" : regno,
            "city" : city,
            "tp" : tp,
            "address" : address,
            "lat" : lat,
            "lang" : lang,
            "oname" : oname,
            "onic" : onic,
            "deliveryMode" : deliveryMode,
            "inOneFish" : inOneFish,
            "inOneAddFish" : inOneAddFish,
            "inTwoFish" : inTwoFish,
            "inTwoAddFish" : inTwoAddFish,
            "inThreeFish" : inThreeFish,
            "inThreeAddFish" : inThreeAddFish,
            "inFourFish" : inFourFish,
            "inFourAddFish" : inFourAddFish,
            "outOneFish" : outOneFish,
            "outOneAddFish" : outOneAddFish,
            "outTwoFish" : outTwoFish,
            "outTwoAddFish" : outTwoAddFish,
            "outThreeFish" : outThreeFish,
            "outThreeAddFish" : outThreeAddFish,
            "outFourFish" : outFourFish,
            "outFourAddFish" : outFourAddFish,
            "inOneEquipment" : inOneEquipment,
            "inOneAddEquipment" : inOneAddEquipment,
            "inTwoEquipment" : inTwoEquipment,
            "inTwoAddEquipment" : inTwoAddEquipment,
            "inThreeEquipment" : inThreeEquipment,
            "inThreeAddEquipment" : inThreeAddEquipment,
            "inFourEquipment" : inFourEquipment,
            "inFourAddEquipment" : inFourAddEquipment,
            "outOneEquipment" : outOneEquipment,
            "outOneAddEquipment" : outOneAddEquipment,
            "outTwoEquipment" : outTwoEquipment,
            "outTwoAddEquipment" : outTwoAddEquipment,
            "outThreeEquipment" : outThreeEquipment,
            "outThreeAddEquipment" : outThreeAddEquipment,
            "outFourEquipment" : outFourEquipment,
            "outFourAddEquipment" : outFourAddEquipment,
            "imageFlag" : 1,
            "profilePic" : imagebase64.replace(/^data:image\/[a-z]+;base64,/, ""),
            "exen" :imgExtension,
            
        }
    }else if(imgFlag == 0){
        var req = {
            "sname" : sname,
            "regno" : regno,
            "city" : city,
            "tp" : tp,
            "address" : address,
            "lat" : lat,
            "lang" : lang,
            "oname" : oname,
            "onic" : onic,
            "deliveryMode" : deliveryMode,
            "inOneFish" : inOneFish,
            "inOneAddFish" : inOneAddFish,
            "inTwoFish" : inTwoFish,
            "inTwoAddFish" : inTwoAddFish,
            "inThreeFish" : inThreeFish,
            "inThreeAddFish" : inThreeAddFish,
            "inFourFish" : inFourFish,
            "inFourAddFish" : inFourAddFish,
            "outOneFish" : outOneFish,
            "outOneAddFish" : outOneAddFish,
            "outTwoFish" : outTwoFish,
            "outTwoAddFish" : outTwoAddFish,
            "outThreeFish" : outThreeFish,
            "outThreeAddFish" : outThreeAddFish,
            "outFourFish" : outFourFish,
            "outFourAddFish" : outFourAddFish,
            "inOneEquipment" : inOneEquipment,
            "inOneAddEquipment" : inOneAddEquipment,
            "inTwoEquipment" : inTwoEquipment,
            "inTwoAddEquipment" : inTwoAddEquipment,
            "inThreeEquipment" : inThreeEquipment,
            "inThreeAddEquipment" : inThreeAddEquipment,
            "inFourEquipment" : inFourEquipment,
            "inFourAddEquipment" : inFourAddEquipment,
            "outOneEquipment" : outOneEquipment,
            "outOneAddEquipment" : outOneAddEquipment,
            "outTwoEquipment" : outTwoEquipment,
            "outTwoAddEquipment" : outTwoAddEquipment,
            "outThreeEquipment" : outThreeEquipment,
            "outThreeAddEquipment" : outThreeAddEquipment,
            "outFourEquipment" : outFourEquipment,
            "outFourAddEquipment" : outFourAddEquipment,
            "imageFlag" : 0            
        }
    }

    if(errFlag == 0){
            $.ajax({
                type: "POST",
                url:setUrl("Store/Store/editStore"),
                data: JSON.stringify(req),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    successMsg(["Save Changes"]);
                    delay(function(){
                    window.location.replace("/aquaspace/frontend/src/Store/StoreEdit.html")
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

$("#pay").click(function(){

    let amount = $("#amount").val();
    let size = $("#package-size").val();
    var req = {
        "amount" : amount,
        "size" : size
    }
    console.log(req);
        $.ajax({
            type: "POST",
            url:setUrl("Store/Store/pay"),
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                console.log(data);
            },
            error: function(errMsg) {
                // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
            }
        });

});