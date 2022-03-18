function setTheReport(dateFrom, dateTo) {
  // dateFrom = dateFrom.split("T")[0];
    let dateFromObj = new Date(dateFrom);
    let dateToObj = new Date(dateTo);
    let req = {"dateFrom":dateFromObj, 
            "dateTo":dateToObj
          }
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((dateFromObj - dateToObj) / oneDay));
    let totalNumberOfMonths = Math.round(diffDays/30);
    console.log(totalNumberOfMonths);
    loading();
    $.ajax({
        type: "POST",
        url:setUrl("Admin/Admin/getReport"),
        data: JSON.stringify(req),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){  
            console.log(data);
           loadingFinish();
    
        },
        error: function(errMsg) {
            // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
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


}

$(document).ready(function(){
    loading();
    $.ajax({
        type: "GET",
        url:setUrl("Admin/Admin/getToday"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            loadingFinish();
            // console.log(typeof data);
            $("#To").val(data);
            let fr = new Date("2021-01-01");
            $("#from").val(fr.toLocaleDateString ("fr-CA"),data);
            // $("#from").val(fr);
            setTheReport(fr,data);
            console.log("hello world");
        },
        error: function(errMsg) {
            loadingFinish();
            //  window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});