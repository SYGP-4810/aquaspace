function SendOrderConfirm(id){ 
  $("#confirmation-btn").html(`<button type="button" class="acceptbtn" onclick="sendOrder(${id})">Send</button>
  <button type="button" class="cancelbtn" onclick="document.getElementById('confirm').style.display='none'">Cancel</button>
  `);
  document.getElementById('confirm').style.display='block';

}

function sendOrder(id){

}

function DoneOrder(id){

}

$(document).ready(function(){
    // jQuery methods go here...   
      $("#pending").click(function(){
        $(".pending").css("display", "block");
        $("#pending").css("color", "rgb(61, 61, 61)");
        $(".accept").css("display", "none");
        $("#accept").css("color", "#aaaaaa");
        $(".send").css("display", "none");
        $("#send").css("color", "#aaaaaa");
        $(".past").css("display", "none");
        $("#past").css("color", "#aaaaaa");

      });

      $("#accept").click(function(){
        $(".accept").css("display", "block");
        $("#accept").css("color", "rgb(61, 61, 61)");
        $(".pending").css("display", "none");
        $("#pending").css("color", "#aaaaaa");
        $(".send").css("display", "none");
        $("#send").css("color", "#aaaaaa");
        $(".past").css("display", "none");
        $("#past").css("color", "#aaaaaa");

      });

      $("#send").click(function(){
        $(".send").css("display", "block");
        $("#send").css("color", "rgb(61, 61, 61)");
        $(".pending").css("display", "none");
        $("#pending").css("color", "#aaaaaa");
        $(".accept").css("display", "none");
        $("#accept").css("color", "#aaaaaa");
        $(".past").css("display", "none");
        $("#past").css("color", "#aaaaaa");

      });

      $("#past").click(function(){
        $(".past").css("display", "block");
        $("#past").css("color", "rgb(61, 61, 61)");
        $(".pending").css("display", "none");
        $("#pending").css("color", "#aaaaaa");
        $(".send").css("display", "none");
        $("#send").css("color", "#aaaaaa");
        $(".accept").css("display", "none");
        $("#accept").css("color", "#aaaaaa");

      });
      
  $.ajax({
    type: "GET",
    url:setUrl("Store/Store/getOrders"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
      var PendingorderIdSet = new Set();
      var AcceptorderIdSet = new Set();
      var SendorderIdSet = new Set();
      var PastorderIdSet = new Set();
      
        data.forEach(element => { 
           if(PendingorderIdSet.has(element.id)){
              let Name = "#Penames" + element.id;
              $(Name).append(`
                , ${element.product_name}
              `)
           }else if(AcceptorderIdSet.has(element.id)){
            let Name = "#Anames" + element.id;
            $(Name).append(`
              , ${element.product_name}
            `)
           }else if(SendorderIdSet.has(element.id)){
            let Name = "#Snames" + element.id;
            $(Name).append(`
              , ${element.product_name}
            `)
           }else if(PastorderIdSet.has(element.id)){
            let Name = "#Panames" + element.id;
            $(Name).append(`
              , ${element.product_name}
            `)
           }
           else if(element.status == 1){
            $("#pending_orders").append(`
          <tr>
          <td>${element.id}</td>
          <td id="Penames${element.id}">${element.product_name}</td>
          <td><a href="../Store/StoreOdersDetailsAccept.html?id=${element.id}" class="button">Order Details</a></td>
          </tr>
          `);
          PendingorderIdSet.add(element.id);
           }else if( element.status == 2){
            $("#accept_orders").append(`
            <tr>
            <td>${element.id}</td>
            <td id="Anames${element.id}">${element.product_name}</td>
            <td><a href="../Store/StoreOdersDetails.html?id=${element.id}" class="button">Order Details</a></td>
            <td><button class="button" onclick= "sendOrder($element.id)">Send Order</button></td>
        </tr>
          `);
          AcceptorderIdSet.add(element.id);
          
           }else if( element.status == 3){
            $("#send_orders").append(`
            <tr>
                      <td>${element.id}</td>
                      <td id="Snames${element.id}">${element.product_name}</td>
                      <td><a href="../Store/StoreOdersDetails.html?id=${element.id}" class="button">Order Details</a></td>
                      <td><button class="button" onclick= "DoneOrder($element.id)">Done</button></td>
                  </tr>
          `);
          SendorderIdSet.add(element.id);
           }else if( element.status == 4){
            $("#past_orders").append(`
            <tr>
                      <td>${element.id}</td>
                      <td id="Panames${element.id}">${element.product_name}</td>
                      <td><a href="../Store/StoreOdersDetails.html?id=${element.id}" class="button">Order Details</a></td>
                  </tr>
          `);
          PastorderIdSet.add(element.id);
           }
          
          
      });

    },
    error: function(errMsg) {
        window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    }
});

      
}); 

