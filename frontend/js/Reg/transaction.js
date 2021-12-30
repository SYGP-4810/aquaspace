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
                                    <td>${element.data}</td>
                                    <td>RS ${element.amount}.00</td>
                                    <td>${order_status}</td>
                                    <td>
                                        <button id=${element.order_id}><a style="text-decoration: none; color: rgb(5, 5, 5);"
                                                href="refund.html">Refund</a> </button>
                                    </td>
                                    </tr>
              `)
              }
            
           
          });
          
        },
        error: function (errMsg) {
          window.location.replace("../src/Error"+errMsg.status+".html");
        },
      });

  });