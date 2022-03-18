function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

function appendInformationTodelete(id){
    $("#confirmation-btn").html(`<button type="button" class="cancelbtn" onclick="document.getElementById('confirm').style.display='none'">Cancel</button>
    <button type="button"class="deletebtn" onclick="deleteProduct(${id})">Delete</button>`);
    document.getElementById('confirm').style.display='block';

}

function deleteProduct(id){
    document.getElementById('confirm').style.display='none';
    let req = {"id":id}
    $.ajax({
        type: "POST",
        url: setUrl("Store/Store/deleteProduct"),
        data: JSON.stringify(req),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            successMsg(["successfully deleted product"]);
            delay(function (){
                location.reload();
            },5000);
                
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/" + errMsg.status + ".html");
        }
    });
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

                if(element.status == 1 || element.status == 2 || element.status == 3 || element.status == 4){
                    $("#invent-list").append(`
            <tr>
                <td class="inv-img"><img src="/aquaspace/frontend/images/product/${element.img1}"></td>
                <td>${element.product_name}</td>
                <td>${type}</td>
                <td>Rs ${element.price}</td>
                <td>${element.quantity}</td>
                <td>${status}</td>
                <td><a href="../Store/StoreInventoryEdit.html?id=${element.id}" class="button">Edit</a></td>
                <td><button class="del-button" onclick="appendInformationTodelete(${element.id})">Delete</button></td>
            </tr>`);
                
                };
                
            });
            
        },
        error: function(errMsg) {
            window.location.replace("../src/Error"+errMsg.status+".html");
        }
    });
});