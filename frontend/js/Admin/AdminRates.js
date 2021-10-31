$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: setUrl("Admin/Admin/getRate"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            // console.log(data);
            $("#rangeZeroTothousand").val(data[0].rate);
            $("#rangeThousandToTenThousand").val(data[1].rate);
            $("#rangeTenThousandToFiftyThousand").val(data[2].rate);
            $("#rangeFiftyThousandToLax").val(data[3].rate);
            $("#rangeLaxOrMore").val(data[4].rate);
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