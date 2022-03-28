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
            $("#bestExpertList").html(``);
            data.bestExpertList.forEach(function(element){
              let persentage = 100*(element.totalPoint/data.totalPointExpert);
              $("#bestExpertList").append(`
              <tr>
              <td>${element.first_name} ${element.last_name}</td>
              <td>${element.date}</td>
              <td>${persentage.toFixed(0)}%</td>
              </tr>
              
              `);
            });
            $('#bestStoreList').html(``);
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

            //category chart start here

            let dataCategory = [];
            let backgroundCategory = [];
            let labelsCategory = [];
            data.category.forEach((element)=>{
              if(element.type == 1){
                dataCategory.push(element.pCount);
                backgroundCategory.push('rgba(10, 236, 74, 0.8)');
                labelsCategory.push('Fish');
              }
              else if(element.type == 2){
                dataCategory.push(element.pCount);
                backgroundCategory.push('rgba(226, 81, 77, 0.8)');
                labelsCategory.push('Plant');
              }else if(element.type == 3){
                dataCategory.push(element.pCount);
                backgroundCategory.push('rgba(221, 39, 190, 0.67)');
                labelsCategory.push('Equipment');
              }else if(element.type == 4){
                dataCategory.push(element.pCount);
                backgroundCategory.push('rgba(12, 217, 65, 0.42)');
                labelsCategory.push('Adopt');
              }
            });
            var ctx2 = document.getElementById('categoryChart').getContext('2d');
            var campaignDonut = new Chart(ctx2, {
                type: 'doughnut',
                data: {
                  labels: labelsCategory,
                  datasets: [{
                  label: 'Categories of selling',
                  data: dataCategory,
                backgroundColor: backgroundCategory,
                }],
                },
            options: {
          layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            }
        },
        responsive: true,
        cutoutPercentage: 90,
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    }


});

    //userType chart start here

            let dataCategoryUser = [];
            let backgroundCategoryUser = [];
            let labelsCategoryUser = [];
            data.userType.forEach((element)=>{
              if(element.user_type == 1){
                dataCategoryUser.push(element.uCount);
                backgroundCategoryUser.push('rgba(245, 0, 0, 0.8)');
                labelsCategoryUser.push('Regular User');
              }
              else if(element.user_type == 2){
                dataCategoryUser.push(element.uCount);
                backgroundCategoryUser.push('rgba(0, 255, 0, 0.8)');
                labelsCategoryUser.push('Expert');
              }else if(element.user_type == 3){
                dataCategoryUser.push(element.uCount);
                backgroundCategoryUser.push('rgba(0, 223, 255, 0.8)');
                labelsCategoryUser.push('Store');
              }else if(element.user_type == 4){
                dataCategoryUser.push(element.uCount);
                backgroundCategoryUser.push('rgba(12, 217, 65, 0.42)');
                labelsCategoryUser.push('Admin');
              }
            });
            console.log(dataCategoryUser);
            var ctx3 = document.getElementById('userCategory').getContext('2d');
            var campaignPie = new Chart(ctx3, {
                type: 'pie',
                data: {
                  labels: labelsCategoryUser,
                  datasets: [{
                  label: 'Categories of Users',
                  data: dataCategoryUser,
                backgroundColor: backgroundCategoryUser,
                }],
                },
            options: {
          layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            }
        },
        responsive: true,
        cutoutPercentage: 90,
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    }


});


            

        },
        error: function(errMsg) {
            // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
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
            // console.log(typeof data);
            $("#To").val(data);
            let fr = new Date("2021-01-01");
            $("#From").val(fr.toLocaleDateString ("fr-CA"),data);
            // $("#from").val(fr);
            setTheReport(fr,data);
            console.log("hello world");
        },
        error: function(errMsg) {
            //  window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});

$("#To").change(function(){
  loading();
  let to = $('#To').val();
  let from = $('#From').val();
  setTheReport(from,to);
});

$("#From").change(function(){
  loading();
  let to = $('#To').val();
  let from = $('#From').val();
  setTheReport(from,to);
});