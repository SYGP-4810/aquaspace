var product_id = [];

$(document).ready(function() {
    $.ajax({
      type: "GET",
      url:setUrl("Store/Store/getInventory"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
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
                product_id.push(element.id);
                $(".list-item").append(`
              <tr>
                        <td><input type="checkbox" ${status} id="product${element.id}" /></td>
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
        window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
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

$("#save").click(function() {  
    let active = [], deactive = [];
    product_id.forEach(element =>{
        let id = "#product"+ element;
        if($(id).is(':checked')){
            active.push(element);            
        }
        else{
            deactive.push(element);
        }
    })

    let req = {"active":active,
               "deactive":deactive
            }
            console.log(req);
    // $.ajax({
    //     type: "POST",
    //     url:setUrl("Store/Store/saveStoreFront"),
    //     contentType: "application/json; charset=utf-8",
    //     data: JSON.stringify(req),
    //     dataType: "json",
    //     success: function(data){         
    //         successMsg(["Save Changes"]);
    //         delay(function(){
    //         window.location.replace("/aquaspace/frontend/src/Store/StoreStoreFront.html")
    //         },5000);
    //     },
    //     error: function(errMsg) {
    //         window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    //     }
    // });
});