$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: setUrl("Admin/Admin/getRate"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //console.log(data);
            $("#upto100Items").val(data[0].rate);
            $("#upto200Items").val(data[1].rate);
            $("#upto500Items").val(data[2].rate);
            $("#upto1000Items").val(data[3].rate);
            $("#upto5000Items").val(data[4].rate);
            $("#ToThousand1Week").val(data[5].rate);
            $("#ToThousand2Week").val(data[6].rate);
            $("#ToThousand3Week").val(data[7].rate);
            $("#ToThousand1Month").val(data[8].rate);
            $("#ToThousand2Month").val(data[9].rate);
            $("#ToThousand3Month").val(data[10].rate);
            $("#ToTenThousand1Week").val(data[11].rate);
            $("#ToTenThousand2Week").val(data[12].rate);
            $("#ToTenThousand3Week").val(data[13].rate);
            $("#ToTenThousand1Month").val(data[14].rate);
            $("#ToTenThousand2Month").val(data[15].rate);
            $("#ToTenThousand3Month").val(data[16].rate);
            $("#ToFiftyThousand1Week").val(data[17].rate);
            $("#ToFiftyThousand2Week").val(data[18].rate);
            $("#ToFiftyThousand3Week").val(data[19].rate);
            $("#ToFiftyThousand1Month").val(data[20].rate);
            $("#ToFiftyThousand2Month").val(data[21].rate);
            $("#ToFiftyThousand3Month").val(data[22].rate);
            $("#ToOneLax1Week").val(data[23].rate);
            $("#ToOneLax2Week").val(data[24].rate);
            $("#ToOneLax3Week").val(data[25].rate);
            $("#ToOneLax1Month").val(data[26].rate);
            $("#ToOneLax2Month").val(data[27].rate);
            $("#ToOneLax3Month").val(data[28].rate);
            $("#MoreThanOneLax1Week").val(data[29].rate);
            $("#MoreThanOneLax2Week").val(data[30].rate);
            $("#MoreThanOneLax3Week").val(data[31].rate);
            $("#MoreThanOneLax1Month").val(data[32].rate);
            $("#MoreThanOneLax2Month").val(data[33].rate);
            $("#MoreThanOneLax3Month").val(data[34].rate);
            $("#coinPrice").val(data[35].rate);
            $("#ExpertShare").val(data[36].rate);
            
        },
        error: function (errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
        }
    });
});

//update rates
$("#updateRates").click(function(){
    let data = [];
    data[0] = $("#upto100Items").val();
    data[1] = $("#upto200Items").val();
    data[2] = $("#upto500Items").val();
    data[3] = $("#upto1000Items").val();
    data[4] = $("#upto5000Items").val();
    data[5] = $("#ToThousand1Week").val();
    data[6] = $("#ToThousand2Week").val();
    data[7] = $("#ToThousand3Week").val();
    data[8] = $("#ToThousand1Month").val();
    data[9] = $("#ToThousand2Month").val();
    data[10] = $("#ToThousand3Month").val();
    data[11] = $("#ToTenThousand1Week").val();
    data[12] = $("#ToTenThousand2Week").val();
    data[13] = $("#ToTenThousand3Week").val();
    data[14] = $("#ToTenThousand1Month").val();
    data[15] = $("#ToTenThousand2Month").val();
    data[16] = $("#ToTenThousand3Month").val();
    data[17] = $("#ToFiftyThousand1Week").val();
    data[18] = $("#ToFiftyThousand2Week").val();
    data[19] = $("#ToFiftyThousand3Week").val();
    data[20] = $("#ToFiftyThousand1Month").val();
    data[21] = $("#ToFiftyThousand2Month").val();
    data[22] = $("#ToFiftyThousand3Month").val();
    data[23] = $("#ToOneLax1Week").val();
    data[24] = $("#ToOneLax2Week").val();
    data[25] = $("#ToOneLax3Week").val();
    data[27] = $("#ToOneLax1Month").val();
    data[28] = $("#ToOneLax2Month").val();
    data[29] = $("#ToOneLax3Month").val();
    data[30] = $("#MoreThanOneLax1Week").val();
    data[31] = $("#MoreThanOneLax2Week").val();
    data[32] = $("#MoreThanOneLax3Week").val();
    data[33] = $("#MoreThanOneLax1Month").val();
    data[34] = $("#MoreThanOneLax2Month").val();
    data[33] = $("#MoreThanOneLax3Month").val();
    data[35] = $("#coinPrice").val();
    data[36] = $("#ExpertShare").val();
    let errors = [];
    let errFlag = 0;
    for (let i = 0; i <= 36; i++) {
        if(data[i] == ""){
            errors.push("all the values should be entered");
            errFlag++;
            break;
        }
        if(isNaN(data[i])){
            errors.push("every value must be a number");
            break;
        }
    }

    if(errFlag == 0){
        $.ajax({
            type: "POST",
            url:setUrl("Admin/Admin/updateRate"),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: function(data){
                    successMsg(["Successfully updated Rates"]);
                    delay(function(){
                        window.location.reload();
                     },5000);
            },
            error: function(errMsg) {
                window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
            }
        });
    }else{
        errorShow(errors);
    }
    

});