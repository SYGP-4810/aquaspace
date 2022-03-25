function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

$( document ).ready(function() {
    $.ajax({
        type: "GET",
        url:setUrl("Store/Store/getRefunds"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            // console.log(data);
             data.forEach(element => {  
                $("#refunds").append(`
                <tr>
                        <td>${element.id}</td>
                        <td>${element.product_name}</td>
                        <td><a href="../Store/StoreRefundsOrders.html?rid=${element.refund}" class="button">View</a></td>
                    </tr>
                
                `);
                
            });
            
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});