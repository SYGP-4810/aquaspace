$(document).ready(function() {

    $.ajax({
        type: "GET",
        url:setUrl("Admin/Admin/getNotPaidPaysheet"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            data.forEach(function(element){
                $("#paidDate").append(`<option value="${element.date}">${element.date}</option>`);
            });
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });

    // $.ajax({
    //     type: "GET",
    //     url:setUrl("Admin/Admin/getNotPaidPaysheet"),
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "json",
    //     success: function(data){
    //         console.log(data);
    //         data.forEach(function(element){
    //             $("#paidDate").append(`<option value="${element.date}">${element.date}</option>`);
    //         });
    //     },
    //     error: function(errMsg) {
    //         window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    //     }
    // });

    $.ajax({
        type: "GET",
        url:setUrl("Admin/Admin/getPaidPaysheet"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            data.forEach(function(element){
                $("#pPaidDate").append(`<option value="${element.date}">${element.date}</option>`);
            });
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });


$.ajax({
    type: "GET",
    url:setUrl("Admin/Admin/countTotalContribution"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
        let tNum = data;
        if(tNum >0){

            $.ajax({
                type: "GET",
                url:setUrl("Admin/Admin/getContribution"),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    console.log(data);
                    data.forEach(element => {
                        let persentage = 100*(element.productCount * 2 + element.questionCount *3 + element.articleCount*10)/tNum;
                        $(".con-list").append(`
                        <tr>
                    <td>
                        <div class="admin">
                            <img src="/aquaspace/frontend/images/profile/${element.profile_img}">
                            <div class="text">
                                <span class="name">${element.first_name} ${element.last_name}</span>
                                <br>
                            </div>
                        </div>
                    </td>
                    <td>
                        ${Math.round(persentage)}%
                    </td>
                    <td>
                        <a href="../Admin/AdminContributionDetails.html?persentage=${Math.round(persentage)}&post=${element.productCount}&question=${element.questionCount}&article=${element.articleCount}&firstName=${element.first_name}&lastName=${element.last_name}" class="button">Contribution Details</a>
                    </td>
                </tr>
                        `);
                    });
                },
                error: function(errMsg) {
                    window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
                }
            });
        }else{
            errorShow(["not a valid operation"]);
        }

        
    },
    error: function(errMsg) {
        window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    }
});

$.ajax({
    type: "GET",
    url:setUrl("Admin/Admin/getLastExpertPaidDate"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
         console.log(data);
        $("#lastPaidDate").html(`${data.date}`);
        $("#lastPaidAmount").html(`${data.amount}`);
       
    },
    error: function(errMsg) {
        window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
    }
});



});

// $("#payNow").click(function(){
//     loading();
//     delay(function(){
//         loadingFinish();
//     },5000);
// })