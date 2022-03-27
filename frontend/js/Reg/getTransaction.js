function setUrl(text) {
    return "/aquaspace/backend/public/index.php?" + text;
  }
  
  $(document).ready(function () {

    $.ajax({
        type: "POST",
        url: setUrl("Reg/Reg/getTransactions"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          console.log(data);

          data.forEach((element) => {
              if(element.status == 1){
                  let order_status = "Pending";

                  $('#table').append(`
                  <tr>
              <td>#${element.order_id}</td>
                                    <td>${element.product_name}</td>
                                    <td>${element.date}</td>
                                    <td>RS ${element.amount}.00</td>
                                    <td>${order_status}</td>
                                    <td>
                                        <button><a style="text-decoration: none; color: rgb(5, 5, 5);"
                                                href="/aquaspace/frontend/src/Reg/refund.html?id=${element.id}&order=${element.order_id}&name=${element.product_name}&date=${element.date}&status=${order_status}&amount=${element.amount}"">Refund</a></button>
                                    </td>
                                    </tr>
              `)
              }
              if(element.status == 2){
                let order_status = "Accepted";

                $('#table').append(`
                <tr>
            <td>#${element.order_id}</td>
                                  <td>${element.product_name}</td>
                                  <td>${element.date}</td>
                                  <td>RS ${element.amount}.00</td>
                                  <td>${order_status}</td>
                                  <td>
                                      <button><a style="text-decoration: none; color: rgb(5, 5, 5);"
                                              href="/aquaspace/frontend/src/Reg/refund.html?id=${element.id}&order=${element.order_id}&name=${element.product_name}&date=${element.date}&status=${order_status}&amount=${element.amount}"">Refund</a></button>
                                  </td>
                                  </tr>
            `)
            }
            if(element.status == 3){
              let order_status = "Order Sent";

              $('#table').append(`
              <tr>
          <td>#${element.order_id}</td>
                                <td>${element.product_name}</td>
                                <td>${element.date}</td>
                                <td>RS ${element.amount}.00</td>
                                <td>${order_status}</td>
                                <td>
                                    <button><a style="text-decoration: none; color: rgb(5, 5, 5);"
                                            href="/aquaspace/frontend/src/Reg/refund.html?id=${element.id}&order=${element.order_id}&name=${element.product_name}&date=${element.date}&status=${order_status}&amount=${element.amount}"">Refund</a></button>
                                </td>
                                </tr>
          `)
          }
          if(element.status == 4){
            let order_status = "Deliverded";

            $('#table').append(`
            <tr>
        <td>#${element.order_id}</td>
                              <td>${element.product_name}</td>
                              <td>${element.date}</td>
                              <td>RS ${element.amount}.00</td>
                              <td>${order_status}</td>
                              <td>
                                  <button><a style="text-decoration: none; color: rgb(5, 5, 5);"
                                          href="/aquaspace/frontend/src/Reg/refund.html?id=${element.id}&order=${element.order_id}&name=${element.product_name}&date=${element.date}&status=${order_status}&amount=${element.amount}"">Refund</a></button>
                              </td>
                              </tr>
        `)
        }

            
           
          });
          
        },
        error: function (errMsg) {
          // window.location.replace(
          //   "/aquaspace/frontend/src/Error/" + errMsg.status + ".html"
          // );
        },
      });



  });