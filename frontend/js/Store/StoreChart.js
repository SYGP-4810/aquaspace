function setUrl(text){
  return "/aquaspace/backend/public/index.php?"+text;
}

$(document).ready(function() {
  $.ajax({
      type: "GET",
      url:setUrl("Store/Store/getStoreReport"),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      async: false,
      success: function(data){
          console.log(data);
      },
      error: function(errMsg) {
           window.location.replace("../src/Error"+errMsg.status+".html");
      }
  });

  
});

let DATA_COUNT = 30;
let labels = [];
for (let i = 1; i <= DATA_COUNT; ++i) {
  labels.push(i.toString());
}
let datapoints1 = [0, 20, 20, 60, 60, 120, 0, 180, 120, 125, 105, 110, 170,0, 20, 20, 60, 60, 120, 0, 180, 120, 125, 105, 110, 170, 78, 87, 69, 12, 54];
let datapoints2 = [60, 120, 0, 180, 120, 125, 105, 110, 170,0, 20, 20, 60, 60, 120, 0, 180, 120, 125, 105, 110, 170, 78, 87, 69, 12, 54,0, 20, 20, 60];

document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('store-chart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                  {
                    label: 'Days sales Rs',
                    data: datapoints1,
                    borderColor: '#33d7ff',
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4
                  }
                  , {
                    label: 'Days sales items',
                    data: datapoints2,
                    borderColor: '#fe80ff',
                    fill: false,
                    tension: 0.4
                  }, 
                ]
            },
            options: {
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: ''
                  },
                },
                interaction: {
                  intersect: false,
                },
                scales: {
                  x: {
                    display: true,
                    title: {
                      display: true,
                      text: 'Date'
                    }
                  },
                  y: {
                    display: true,
                    title: {
                      display: true,
                      text: 'Rs'
                    },
                    suggestedMin: 0,
                  }
                }
              },
            
        });
});