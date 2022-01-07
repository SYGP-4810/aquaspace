$(document).ready(function() {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let authId = url.searchParams.get("authId");
    let req = {
        "authId" : authId
    }
    $.ajax({
        type: "POST",
        url:setUrl("Common/getProductBlockedDetails"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(req),
        success: function(data){
            data.forEach(element => {
                $("#product-list").append(`
                <div style="display: flex; margin-top: 30px;">
                <div style="width: 250px;"><img style="height: 135px;" src="../images/product/${element.img1}" alt="${element.name}"></div>
                
                <div style="margin-left: 20px; font-size: 17px; font-weight: 500;">Product Name : <span
                    style="font-size: 15px; font-weight: 400;">${element.product_name}</span> <a
                    style="font-size: 15px; font-weight: 400; text-decoration: underline;" href="/aquaspace/frontend/src/Reg/view-product-page.html?id=${element.id}" target="_blank">link</a> <br>
                  <br>
                  reasons : 
                  <br>
                  <ul id="product${element.id}"></ul>
                     </div>
              </div>
                `);

                let req1 = {
                    "productId" : element.id
                }

                $.ajax({
        type: "POST",
        url:setUrl("Common/getReportDetail"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(req1),
        success: function(data1){
            let reportList = "";
            let reportSet = new Set();
            data1.forEach(el => {
                reportSet.add(el.report)
            });
            let reportStr = "";
            reportSet.forEach(e => {
                
                if(e == 1){
                    reportStr = "False information";
                }else if(e == 2){
                    reportStr = "Illegal Selling";
                }else if(e == 3){
                    reportStr = "Should not be on aquaspace";
                }else if(e == 4){
                    reportStr = "other";
                }
                reportList += "<li>" + reportStr + "</li>";
            });
            let idName = "#product"+ element.id;
            console.log(idName);
            $(idName).append(`${reportList}`);
        },
        error: function(errMsg) {
             window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });

            })
            
            
        },
        error: function(errMsg) {
             window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });

    

});

$("#submitAppeal").click(function(){
    let url_string = window.location.href;
    let url = new URL(url_string);
    let authId = url.searchParams.get("authId");
    let appeal = $("#appealMsg").val();
    if(appeal.length > 0){
        let req = {
            "authId" : authId,
            "appeal" : appeal
        };
        $.ajax({
            type: "POST",
            url:setUrl("Common/insertProductAppealAccount"),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(req),
            success: function(data){
                successMsg(['successfully send an appeal']);
                delay(function(){
                    window.location.replace("/aquaspace/frontend/src/");
                },3000)
            },
            error: function(errMsg) {
                //  window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
            }
        });
    }else{
        errorShow(["appeal should not be empty"]);
    }
   

})