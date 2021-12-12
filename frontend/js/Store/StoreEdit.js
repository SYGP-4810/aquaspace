function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url:setUrl("Store/Store/getStoreProfile"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            let delivery = data.delMode;
            if(data.profilePic != null){
                $("#profile-pic").css("background-image", `url(/aquaspace/frontend/images/profile/${data.profilePic})`);
            }
            $("#sname").val(data.SName);
            $("#regno").val(data.RegNo);
            $("#tp").val(data.tp);
            $("#city").val(data.city);
            $("#address").val(data.address);
            $("#lat").val(data.lat);
            $("#lang").val(data.lan);
            $("#oname").val(data.OwnerName);
            $("#onic").val(data.OwnerNIC);

            if(data.subscriptionFlag == 1){
                $(".sub").html(`<label>End of the Subscription  </label><p class="date">${data.dateTo}</p>`);  
            }
            else{
                $(".sub").html(`<label>Please Update Your Subscription ! </label>`);
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
                    $("#inOne").val(deliveryPrice[i].one_kg);
                    $("#inOneAdd").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 1 && deliveryPrice[i].range_km == 2){
                    $("#inTwo").val(deliveryPrice[i].one_kg);
                    $("#inTwoAdd").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 1 && deliveryPrice[i].range_km == 3){
                    $("#inThree").val(deliveryPrice[i].one_kg);
                    $("#inThreeAdd").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 1 && deliveryPrice[i].range_km == 4){
                    $("#inFour").val(deliveryPrice[i].one_kg);
                    $("#inFourAdd").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 2 && deliveryPrice[i].range_km == 1){
                    $("#outOne").val(deliveryPrice[i].one_kg);
                    $("#outOneAdd").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 2 && deliveryPrice[i].range_km == 2){
                    $("#outTwo").val(deliveryPrice[i].one_kg);
                    $("#outTwoAdd").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 2 && deliveryPrice[i].range_km == 3){
                    $("#outThree").val(deliveryPrice[i].one_kg);
                    $("#outThreeAdd").val(deliveryPrice[i].additional_one_kg);
                }
                if(deliveryPrice[i].type == 2 && deliveryPrice[i].range_km == 4){
                    $("#outFour").val(deliveryPrice[i].one_kg);
                    $("#outFourAdd").val(deliveryPrice[i].additional_one_kg);
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

    let inOne = $('#inOne').val();
    let inOneAdd = $('#inOneAdd').val();
    let inTwo = $('#inTwo').val();
    let inTwoAdd = $('#inTwoAdd').val();
    let inThree = $('#inThree').val();
    let inThreeAdd = $('#inThreeAdd').val();
    let inFour = $('#inFour').val();
    let inFourAdd = $('#inFourAdd').val();
    let outOne = $('#outOne').val();
    let outOneAdd = $('#outOneAdd').val();
    let outTwo = $('#outTwo').val();
    let outTwoAdd = $('#outTwoAdd').val();
    let outThree = $('#outThree').val();
    let outThreeAdd = $('#outThreeAdd').val();
    let outFour = $('#outFour').val();
    let outFourAdd = $('#outFourAdd').val();
    
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
            "inOne" : inOne,
            "inOneAdd" : inOneAdd,
            "inTwo" : inTwo,
            "inTwoAdd" : inTwoAdd,
            "inThree" : inThree,
            "inThreeAdd" : inThreeAdd,
            "inFour" : inFour,
            "inFourAdd" : inFourAdd,
            "outOne" : outOne,
            "outOneAdd" : outOneAdd,
            "outTwo" : outTwo,
            "outTwoAdd" : outTwoAdd,
            "outThree" : outThree,
            "outThreeAdd" : outThreeAdd,
            "outFour" : outFour,
            "outFourAdd" : outFourAdd,
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
            "inOne" : inOne,
            "inOneAdd" : inOneAdd,
            "inTwo" : inTwo,
            "inTwoAdd" : inTwoAdd,
            "inThree" : inThree,
            "inThreeAdd" : inThreeAdd,
            "inFour" : inFour,
            "inFourAdd" : inFourAdd,
            "outOne" : outOne,
            "outOneAdd" : outOneAdd,
            "outTwo" : outTwo,
            "outTwoAdd" : outTwoAdd,
            "outThree" : outThree,
            "outThreeAdd" : outThreeAdd,
            "outFour" : outFour,
            "outFourAdd" : outFourAdd,
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