var req={};
$(document).ready(function(){
    let url_string = window.location.href;
    let url = new URL(url_string);
    let productId = url.searchParams.get("id");
    let appeal = url.searchParams.get("appeal");
    let productImg = url.searchParams.get("img");
    let productName = url.searchParams.get("productName");
    console.log(productImg);
    $("#appeal").html(`${appeal}`);
    req["productId"] = productId;
    $("#linkOf").attr("href", `/aquaspace/frontend/src/reg/view-product-page.html?id=${productId}`);
    $("#productName").html(`${productName}`);
    $("#productImg").html(`<img id="producsImg" style="height: 135px;" src="/aquaspace/frontend/images/product/${productImg}" alt=${productName} />`);
    $.ajax({
        type: "POST",
        url:setUrl("Admin/Admin/getReasonsAppeal"),
        data: JSON.stringify(req),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            const reasons = new Set();
            data.forEach(element =>{
                reasons.add(element.report);
            });
            console.log("reasons",reasons);
            if(reasons.has("1")){
                $("#reasons").append(`<li>False informations</li>`);
            }
            if(reasons.has("2")){
                $("#reasons").append(`<li>Illeagal selling</li>`);
            }
            if(reasons.has("3")){
                $("#reasons").append(`<li>This item should not be in aquaspace</li>`);
            }
            if(reasons.has("4")){
                $("#reasons").append(`<li>Other reason</li>`);
            }
    
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});

$("#unblock-btn").click(function(){
    $.ajax({
        type: "POST",
        url:setUrl("Admin/Admin/unblockProduct"),
        data: JSON.stringify(req),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
           successMsg(["successfully unblock the product"]);
           delay(function(){
                window.location.replace("/aquaspace/frontend/src/Admin/AdminIssuesPosts.html");
           },3000);
    
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});

$("#decline-btn").click(function(){
    $.ajax({
        type: "POST",
        url:setUrl("Admin/Admin/declineAppeal"),
        data: JSON.stringify(req),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
           successMsg(["successfully decline the appeal"]);
           delay(function(){
                window.location.replace("/aquaspace/frontend/src/Admin/AdminIssuesPosts.html");
           },3000);
    
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});