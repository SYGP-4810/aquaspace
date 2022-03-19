function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

$( document ).ready(function() {
    let url = new URL(window.location.href);
    let refund = url.searchParams.get('rid');
    let req = {"id":refund}

    $.ajax({
        type: "POST",
        url:setUrl("Store/Store/getrefund"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(req),
        async: false,
        success: function(data){
            $("#order-no").html(`${data.id}`);
            $("#name").html(`${data.first_name}`+" "+`${data.last_name}`);
            $("#address").html(`${data.address}`);
            $("#telephone").html(`${data.tp}`);

            let del = data.deliver_status;
            if (del ==1){
                $("#delivery-status").html("Product has Received");
            }else{
                $("#delivery-status").html("Product has not Received");
            }

            $("#refund").append(`
            <img src="../../images/product/${data.img1}" >
            <img src="../../images/product/${data.img2}" >
            <img src="../../images/product/${data.img3}" >

            `);

            $("#p-name").html(`${data.product_name}`);
            $("#p-price").html("Rs " + `${data.price}`);
            $("#rea").html(`${data.reason}`);

            $("#conf").append(`
            <input type="hidden" id="refund-id" value="${data.refund}">
            <input type="hidden" id="refund-cus-id" value="${data.user_id}">
            `);

        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});

$("#refund-accept").click(function(){
    let ref_id = $("#refund-id").val();
    let ref_cus_id = $("#refund-cus-id").val();
    var req = {
        "ref-id" : ref_id,
        "refund-cus-id" : ref_cus_id
    }

        $.ajax({
            type: "POST",
            url:setUrl("Store/Store/refundAccept"),
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                console.log(data);
                successMsg(["Request Accepted"]);
                delay(function(){
                window.location.replace("/aquaspace/frontend/src/Store/StoreRefunds.html")
                },5000);
            },
            error: function(errMsg) {
                window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
            }
        });

});

$("#refund-reject").click(function(){
    let ref_id = $("#refund-id").val();
    let ref_cus_id = $("#refund-cus-id").val();
    var req = {
        "ref-id" : ref_id,
        "refund-cus-id" : ref_cus_id
    }

        $.ajax({
            type: "POST",
            url:setUrl("Store/Store/refundReject"),
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                // console.log(data);
                alertMsg(["Request Rejected"]);
                delay(function(){
                window.location.replace("/aquaspace/frontend/src/Store/StoreRefunds.html")
                },5000);
            },
            error: function(errMsg) {
                window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
            }
        });

});