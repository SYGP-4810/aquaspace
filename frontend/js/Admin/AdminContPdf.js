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
                    // console.log(data);
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
                        let persentage = parseInt(100*(element.productCount * 2 + element.questionCount *3 + element.articleCount*10)/tNum);
                        let amount = parseInt(data.total_ammount * persentage) / 100;
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
                    window.location.reload();
                    }
                },
                error: function(errMsg) {
                    //  window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
                }
            });
        },
        error: function(errMsg) {
            // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
   
});

$("#paid").click(function(){
    loading();
    let req = {
        "date" : $("#paidDate").val()
    }
    $.ajax({
        type: "POST",
        url:setUrl("Admin/Admin/expertPaid"),
        data: JSON.stringify(req),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            // console.log(data);
            loadingFinish();
            alertMsg(["You have been successfully recoreded expert payment"]);
            delay(function(){
                window.location.reload();
            },3000);
        },
        error: function(errMsg) {
            // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});

$("#pPaid").click(function() {
    loading();
    let req = {
        "date" : $("#pPaidDate").val()
    }
    console.log(req);
    $.ajax({
        type: "POST",
        url:setUrl("Admin/Admin/expertPreviousPaidPaySheet"),
        data: JSON.stringify(req),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            loadingFinish();
            
            let i = 0;
            i += 10;
            doc.text(10,i,"Aquaspace Paysheet       Date : " + data.wholePaymentDetail.date);
            i += 10;
            doc.text(10,i,'First name | Last Name | Amount(RS) | Bank NO | Bank | Branch Code ');
            i += 10;
            let tAmountPaid = 0;
            data.paymentDetail.forEach(element =>{
                let persentage = 100*(element.total_contribution)/ data.wholePaymentDetail.total_contribution;
                let amount = data.wholePaymentDetail.amount * persentage / 100;
                tAmountPaid += amount;
                i += 10;
                doc.text(10,i,
                    element.first_name + " | " +
                    element.last_name + " | " +
                    amount + " | " +
                    element.account_no + " | " +
                    element.bank_name + " | " +
                    element.branch_id) 

            });
            i += 20;
            doc.text(10,i,"Total amount need to pay => " + tAmountPaid);
            doc.save('paysheet.pdf');
                        
        },
        error: function(errMsg) {
            // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});