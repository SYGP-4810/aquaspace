function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
}

$(document).ready(function() {
    $.ajax({
      type: "GET",
      url:setUrl("Store/Store/getInventory"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
        console.log(data);
          data.forEach(element => {
            let st = element.status;
            let status;
            if(st == 1){
                status = "checked";
            }
            else{
                status = "unchecked";
            }
            if(element.status == 1 || element.status == 2){
                $(".list-item").append(`
              <tr>
                        <td><input type="checkbox" ${status} /></td>
                        <td><img src="/aquaspace/frontend/images/product/${element.img1}"></td>
                        <td>
                            <span>${element.product_name}</span>
                            <br>
                            <span style="color: #41436A; font-size: .9em;">Rs ${element.price}</span>
                        </td>
                    </tr>
            `);
            }
              
          });
      },
      error: function(errMsg) {
          window.location.replace("../src/Error"+errMsg.status+".html");
      }
  });
});

$("#disable").click(function() {
    $.ajax({
        type: "POST",
        url:setUrl("Store/Store/disableStoreFront"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){         
            successMsg(["Disable All Items"]);
            delay(function(){
            window.location.replace("/aquaspace/frontend/src/Store/StoreStoreFront.html")
            },5000);
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});