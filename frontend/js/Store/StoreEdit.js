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