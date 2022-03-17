const doc = new jsPDF();
$("#payNow").click(function(){
    loading();
    $.ajax({
        type: "GET",
        url:setUrl("Admin/Admin/countTotalContribution"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            const tNum = data;
            $.ajax({
                type: "GET",
                url:setUrl("Admin/Admin/getPaySheetExpert"),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    loadingFinish();
                    console.log(data);
                    if(data.status == 0){
                        alertMsg(["you have been paid experts for this month"]);
                        delay(function(){
                            window.location.reload();
                        },5000);
                    }else{
                        let i = 0;
                    i += 10;
                    doc.text(10,i,"Aquaspace Paysheet       Date : " + data.today);
                    i += 10;
                    doc.text(10,i,'First name | Last Name | Amount(RS) | Bank NO | Bank | Branch Code ');
                    i += 10;
                    let tAmountPaid = 0;
                    data.res.forEach(element =>{
                        let persentage = 100*(element.productCount * 2 + element.questionCount *3 + element.articleCount*10)/tNum;
                        let amount = data.total_ammount * persentage / 100;
                        i += 10;
                        tAmountPaid += amount;
                        doc.text(10,i,
                            element.first_name + " | " +
                            element.last_name + " | " +
                            amount + " | " +
                            element.account_no + " | " +
                            element.bank + " | " +
                            element.branch_code) 
        
                    });
                    i += 20;
                    doc.text(10,i,"Total amount need to pay => " + tAmountPaid);
                    doc.save('paysheet.pdf');
                    }
                },
                error: function(errMsg) {
                    loadingFinish();
                     window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
                }
            });
        },
        error: function(errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
   
});

$("#paid").click(function(){
    loading();
    $.ajax({
        type: "GET",
        url:setUrl("Admin/Admin/expertPaid"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            loadingFinish();
            successMsg(["You have been successfully recoreded exert paiyment"]);
            delay(function(){
                window.location.reload();
            },3000);
        },
        error: function(errMsg) {
            // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});