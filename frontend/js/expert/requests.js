
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: setUrl("Expert/Expert/getRequest"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            data.forEach(element =>{
                $("#verify").append(`
                <div style="margin-left: 50px;"><a href="verify-post.html?id=${element.id}&name=${element.product_name}&img1=${element.img1}&img2=${element.img2}&img3=${element.img3}&img4=${element.img4}&authId=${element.auth_id}"><button id="claim">verify</button></a>
                <div style="display: flex; width: 400px;" class="question">
                    <img style="width: 150px; margin-right: 20px;" src="../../images/product/${element.img1}" alt="">
                    <div>
                    <h4>Fish Name :</h4>
                    <h4 style="font-weight: 400;">${element.product_name}</h4>
                    </div>
                    
                </div>
            </div>
                `) 
            });
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
})