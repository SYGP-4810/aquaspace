function AcceptOrderConfirm(){
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    $("#confirmation-btn").html(`<button type="button" class="acceptbtn" onclick="AcceptOrder(${id})">Accept</button>
    <button type="button" class="cancelbtn" onclick="document.getElementById('confirm').style.display='none'">Cancel</button>
    `);
    document.getElementById('confirm').style.display='block';

}

function RejectOrderConfirm(){
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    $("#Reject-confirmation-btn").html(`<button type="button" class="deletebtn" onclick="RejectOrder(${id})">Reject</button>
    <button type="button" class="cancelbtn" onclick="document.getElementById('reject').style.display='none'">Cancel</button>
    `);
    document.getElementById('reject').style.display='block';

}

function AcceptOrder(id){
    document.getElementById('confirm').style.display='none';
    let req = {"id":id}
    $.ajax({
        type: "POST",
        url: setUrl("Store/Store/AcceptOrder"),
        data: JSON.stringify(req),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            successMsg(["successfully Accept Order"]);
            delay(function (){
                window.location.replace("/aquaspace/frontend/src/Store/StoreOrders.html")
            },3000);
                
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/" + errMsg.status + ".html");
        }
    });
}

function RejectOrder(id){
    document.getElementById('reject').style.display='none';
    let req = {"id":id}
    console.log(req);
    $.ajax({
        type: "POST",
        url: setUrl("Store/Store/RejectOrder"),
        data: JSON.stringify(req),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            successMsg(["successfully Reject Order"]);
            delay(function (){
                window.location.replace("/aquaspace/frontend/src/Store/StoreOrders.html")
            },3000);
                
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/" + errMsg.status + ".html");
        }
    });
}

$( document ).ready(function() {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    let req = {"id":id}
    $.ajax({
        type: "POST",
        url: setUrl("Store/Store/getOrderDetails"),
        data: JSON.stringify(req),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function(data){
            $("#id").append(id);
            $("#name").append(data.first_name + " " + data.last_name);    
            $("#address").append(data.address);
            $("#tp").append(data.tp);
        },
        error: function(errMsg) {
            // window.location.replace("/aquaspace/frontend/src/Error/" + errMsg.status + ".html");
        }
        
    });

    $.ajax({
        type: "POST",
        url: setUrl("Store/Store/getOrderProductDetails"),
        data: JSON.stringify(req),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function(data){            
            data.forEach(element => {
                let delMode = element.delivery;
                let delivery;
                if(delMode >= 4){
                    delivery = "Third Party Delivery Service";
                }
                if(delMode >= 2){
                    delivery = "In Store Delivery Service";
                }
                if(delMode >= 1){
                    delivery = "In Store Pick-up";
                }

                $("#product").append(`
                <div class="po-card">
                            <div class="left">
                                <img src="../../images/product/${element.img1}" >
                            </div>
                            <div class="right">
                                <label for="text">
                                    <span style="font-weight: 600;">Name: -</span>
                                    <span>${element.product_name}</span>
                                </label>
                                <label for="text">
                                    <span style="font-weight: 600;">Price: -</span>
                                    <span>Rs ${element.price}</span>
                                </label>
                                <label for="text">
                                    <span style="font-weight: 600;">Quantity: -</span>
                                    <span>${element.quantity}</span>
                                </label>
                                <label for="text">
                                    <span style="font-weight: 600;">Delivery Methord: -</span>
                                    <span>${delivery}</span>
                                </label>
                            </div>
                        </div>
                `)
            })
                
        },
        error: function(errMsg) {
            // window.location.replace("/aquaspace/frontend/src/Error/" + errMsg.status + ".html");
        }
        
    });
});