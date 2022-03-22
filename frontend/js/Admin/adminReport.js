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
    console.log(req);
    loading();
    $.ajax({
        type: "POST",
        url:setUrl("Admin/Admin/getReport"),
        data: JSON.stringify(req),
        async:false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){  
            console.log(data);
            loadingFinish();
            data.bestExpertList.forEach(function(element){
              let persentage = 100*(element.totalPoint/data.totalPointExpert);
              $("#bestExpertList").append(`
              <tr>
              <td>${element.first_name} ${element.last_name}</td>
              <td>${element.date}</td>
              <td>${persentage}%</td>
              </tr>
              
              `);
            });
            data.bestStoreList.forEach((element =>{
              $("#bestStoreList").append(`
              <tr>
                        <td>${element.company_name}</td>
                        <td>${element.create_date}</td>
                        <td>${element.sum_amount}</td>
                    </tr>
              `);
            }));
            let totalIncome = parseInt(data.subscriptionSum) +  parseInt(data.postSum) ;
            let monthlyEarning = totalIncome / totalNumberOfMonths;
            $("#totalEarning").html(`
              ${Math.round(totalIncome)}
            `);
            $("#monthlyEarning").html(`
              ${Math.round(monthlyEarning)}
            `);
            $("#tProduct").html(`${data.totalNumOfProducts}`);
            $("#tUser").html(`${data.totalNumOfUsers}`);
            let DATA_COUNT = 31;
    let labels = [];
    let datapoints1 = new Array(31);
    let datapoints2 = new Array(31);
    for (let i = 1; i <= DATA_COUNT; ++i) {
      labels.push(i.toString());
      datapoints1[i] = 0;
      datapoints2[i] = 0;
    }
    data.pMonthProductAdding.forEach(element => {
      datapoints1[parseInt(element.cDate.slice(-2))] = parseInt(element.pSum);
    });
    data.pMonthSales.forEach(element => {
      datapoints2[parseInt(element.date.slice(-2))] = parseInt(element.pSum);
    })

        var ctx = document.getElementById('store-chart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                      {
                        label: 'Daily product selling',
                        data: datapoints1,
                        borderColor: '#33d7ff',
                        fill: false,
                        cubicInterpolationMode: 'monotone',
                        tension: 0.4
                      }
                      , {
                        label: 'Daily Product addings',
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
                          text: 'number of items'
                        },
                        suggestedMin: 0,
                      }
                    }
                  },
                
            });

    
    
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
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
             window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});