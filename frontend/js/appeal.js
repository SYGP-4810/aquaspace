$(document).ready(function() {
    let url_string = window.location.href;
    let url = new URL(url_string);
    let productId = url.searchParams.get("productId");
    let req = {
        "productId": productId
    }
    loading();
    $.ajax({
        type: "POST",
        url:setUrl("Common/getProductDetail"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(req),
        success: function(data){
            loadingFinish();
            $("#itemDetails").html(`
            <div style="display: flex; margin-top: 30px;">
            <div style="width: 250px;"><img style="height: 135px;" src="../images/product/${data.img1}" alt="${data.product_name}" /></div>
             <div style="margin-left: 20px; font-size: 17px; font-weight: 500;">Product Name : <span
          style="font-size: 15px; font-weight: 400;">${data.product_name} </span> <a
          style="font-size: 15px; font-weight: 400; text-decoration: underline;" href="/aquaspace/frontend/src/reg/view-product-page.html?id=${data.id}" target='_blank'>link</a> <br>
          <br>
          Reasons : <br>
          <ul id='product${data.id}'></ul>
          </div>
    </div>
    `);
    loading();
    $.ajax({
        type: "POST",
        url:setUrl("Common/getReportDetail"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(req),
        success: function(data1){
            loadingFinish();
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
            })
            let idName = "#product"+ data.id;
            $(idName).append(`${reportList}`);
        },
        error: function(errMsg) {
             window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });

        },
        error: function(errMsg) {
             window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
    
    
})

$("#submitAppeal").click(function(){
    console.log("hello world");
    let url_string = window.location.href;
    let url = new URL(url_string);
    let productId = url.searchParams.get("productId");
    let appeal = $("#appealMsg").val();
    if(appeal.length > 0){
        let req = {
            "productId" : productId,
            "appeal" : appeal
        };
        loading();
        $.ajax({
            type: "POST",
            url:setUrl("Common/insertProductAppeal"),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(req),
            success: function(data){
                loadingFinish();
                successMsg(['successfully send an appeal']);
                delay(function(){
                    window.location.replace("/aquaspace/frontend/src/");
                },3000)
            },
            error: function(errMsg) {
                 window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
            }
        });
    }else{
        errorShow(["appeal should not be empty"]);
    }
   

})