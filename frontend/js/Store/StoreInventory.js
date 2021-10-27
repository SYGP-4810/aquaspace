function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

$( document ).ready(function() {
    $.ajax({
        type: "GET",
        url:setUrl("Store/Store/getInventory"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
        // console.log(data);
            let status = "";
            let type = "";
            data.forEach(element => {
                let st = element.status;
                if (st == 1) {
                    status = "Sell";
                } else if (st== 2) {
                    status = "Not Selling";
                }else if (st== 3) {
                status = "Wait Until Verify";
                }else if (st== 4) {
                    status = "Block";
                }else {
                    st = "";
                }

                let ty = element.type;
                if (ty == 1) {
                    type = "Fish";
                } else if (ty== 2) {
                    type = "Plant";
                }else if (ty== 3) {
                    type = "Equement";
                } 
                else {
                    type = "";
                }
                $("#invent-list").append(`
            <tr>
                <td class="inv-img"><img src="/aquaspace/frontend/images/product/${element.img1}"></td>
                <td>${element.product_name}</td>
                <td>${type}</td>
                <td>Rs ${element.price}</td>
                <td>${element.quantity}</td>
                <td>${status}</td>
                <td><a href="../Store/StoreInventoryEdit.html?id=${element.id}" class="button">Edit</a></td>
                <td><button class="del-button" onclick="document.getElementById('confirm').style.display='block'">Delete</button></td>
            </tr>`);
                
            });
            
        },
        error: function(errMsg) {
            //window.location.replace("../src/Error"+errMsg.status+".html");
        }
    });
});