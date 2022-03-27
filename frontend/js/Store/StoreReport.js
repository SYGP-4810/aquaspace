function setUrl(text){
  return "/aquaspace/backend/public/index.php?"+text;
}


var randomColorGenerator = function () { 
  return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
}

let labels = [];

let data1 = {
  labels: labels,
  datasets: [{
    label: 'Count',
    backgroundColor: [],
    borderColor: 'rgb(255, 99, 132)',
    data: [],
  }]
};



const config = {
  type: 'bar',
  data: data1,
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Best Selling Product Categories'
      }},
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true
        }
      },
      y: {
        display: true,
        title: {
          color: true,
          display: true,
          text: 'Items of Product'
        },
      }
    }
  },
};



const myChart = new Chart(
  document.getElementById('store-chart'),
  config
);

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
      dataset.backgroundColor.push(randomColorGenerator());
  });
  chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
      dataset.backgroundColor.pop();
  });
  chart.update();
}

function setTheReport(from,to){
  let req = {"dateFrom":from, 
            "dateTo":to
          }
    // console.log(req)
  $.ajax({
    type: "POST",
    url:setUrl("Store/Store/getStoreReport"),
    data: JSON.stringify(req),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
      console.log(data);
      if(data.ernings == null){
        $("#earnings").html(`0`);
      }else{
        $("#earnings").html(`${data.ernings}`);
      }

      if(data.ernings == null){
        $("#product").html(`0`);
      }else{
        $("#product").html(`${data.products}`);
      }

      if(data.ernings == null){
        $("#orders").html(`0`);
      }else{
        $("#orders").html(`${data.orders}`);
      }

      let i = 1;
      let order = data.orderList;      
      if(order.length == 0){
        $("#bestProduct").html('<h4 style="color: red;">No Ordes Found In this Time Duration</h4>');
      }else{
        $("#bestProduct").html('');
        order.forEach(element => {  
          $("#bestProduct").append(`
              <tr>
                  <td>${i}</td>
                  <td>${element.name}</td>
                  <td>Rs. ${element.price}</td>
                  <td>${element.pCount}</td>
              </tr>
          `);
          i++;
          });
      }

      let orderCat = data.orderCat;
      // console.log(data1);
      while(labels.length > 0) {
        removeData(myChart);
      }
      

      orderCat.forEach(element => {
        addData(myChart,element.category,element.pCount);
      }) 

    },
    error: function(errMsg) {
        // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    }
  });
}



$(document).ready(function() {
  $.ajax({
      type: "GET",
      url:setUrl("Store/Store/getStoreReportDate"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      async: false,
      success: function(data){
          // console.log(data);
          $("#from").val(data['start']);
          $("#to").val(data['today']);
        
          setTheReport(data['start'],data['today']);
          
      },
      error: function(errMsg) {
           window.location.replace("../src/Error"+errMsg.status+".html");
      }
  });
});

function subfunction() {
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  // console.log(to);
  setTheReport(from,to);
  
}