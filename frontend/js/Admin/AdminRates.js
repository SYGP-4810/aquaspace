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
            $("#ToThousand3Month").val(data[9].rate);
            $("#ToTenThousand1Week").val(data[10].rate);
            $("#ToTenThousand2Week").val(data[11].rate);
            $("#ToTenThousand3Week").val(data[12].rate);
            $("#ToTenThousand1Month").val(data[13].rate);
            $("#ToTenThousand2Month").val(data[14].rate);
            $("#ToTenThousand3Month").val(data[15].rate);
            $("#ToFiftyThousand1Week").val(data[16].rate);
            $("#ToFiftyThousand2Week").val(data[17].rate);
            $("#ToFiftyThousand3Week").val(data[18].rate);
            $("#ToFiftyThousand1Month").val(data[19].rate);
            $("#ToFiftyThousand2Month").val(data[20].rate);
            $("#ToFiftyThousand3Month").val(data[21].rate);
            $("#ToOneLax1Week").val(data[22].rate);
            $("#ToOneLax2Week").val(data[23].rate);
            $("#ToOneLax3Week").val(data[24].rate);
            $("#ToOneLax1Month").val(data[25].rate);
            $("#ToOneLax2Month").val(data[26].rate);
            $("#ToOneLax3Month").val(data[27].rate);
            $("#MoreThanOneLax1Week").val(data[28].rate);
            $("#MoreThanOneLax2Week").val(data[29].rate);
            $("#MoreThanOneLax3Week").val(data[30].rate);
            $("#MoreThanOneLax1Month").val(data[31].rate);
            $("#MoreThanOneLax2Month").val(data[32].rate);
            $("#MoreThanOneLax3Month").val(data[33].rate);
            $("#coinPrice").val(data[34].rate);
            $("#ExpertShare").val(data[35].rate);
            
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
    data[9] = $("#ToThousand3Month").val();
    data[10] = $("#ToTenThousand1Week").val();
    data[11] = $("#ToTenThousand2Week").val();
    data[12] = $("#ToTenThousand3Week").val();
    data[13] = $("#ToTenThousand1Month").val();
    data[14] = $("#ToTenThousand2Month").val();
    data[15] = $("#ToTenThousand3Month").val();
    data[16] = $("#ToFiftyThousand1Week").val();
    data[17] = $("#ToFiftyThousand2Week").val();
    data[18] = $("#ToFiftyThousand3Week").val();
    data[19] = $("#ToFiftyThousand1Month").val();
    data[20] = $("#ToFiftyThousand2Month").val();
    data[21] = $("#ToFiftyThousand3Month").val();
    data[22] = $("#ToOneLax1Week").val();
    data[23] = $("#ToOneLax2Week").val();
    data[24] = $("#ToOneLax3Week").val();
    data[25] = $("#ToOneLax1Month").val();
    data[26] = $("#ToOneLax2Month").val();
    data[27] = $("#ToOneLax3Month").val();
    data[28] = $("#MoreThanOneLax1Week").val();
    data[29] = $("#MoreThanOneLax2Week").val();
    data[30] = $("#MoreThanOneLax3Week").val();
    data[31] = $("#MoreThanOneLax1Month").val();
    data[32] = $("#MoreThanOneLax2Month").val();
    data[33] = $("#MoreThanOneLax3Month").val();
    data[34] = $("#coinPrice").val();
    data[35] = $("#ExpertShare").val();
    let errors = [];
    let errFlag = 0;
    for (let i = 0; i <= 35; i++) {
        if(data[i] == ""){
            errors.push("all the values should be entered");
            break;
        }
        if(isNaN(data[i])){
            errors.push("every value must be a number");
            break;
        }
    }

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
    

});