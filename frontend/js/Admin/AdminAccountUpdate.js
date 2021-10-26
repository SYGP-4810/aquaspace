$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: setUrl("Admin/Admin/getAdmin"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#fName").val(data.fName);
            $("#lName").val(data.lName);
            $("#address").val(data.address);
            $("#city").val(data.city);
            $("#telNo").val(data.tp);
            if (data.profile_img) {
                $("#profilePic").css("background-image", `url(/aquaspace/frontend/images/profile/${data.profile_img})`);
            } else {
                $("#profilePic").css("background-image", "url(/aquaspace/frontend/images/profile.jpg)")
            }
        },
        error: function (errMsg) {
            window.location.replace("/aquaspace/frontend/src/Error"+errMsg.status+".html");
        }
    });
});
var imgExtension1 = "";
var imagebase64_1 = "";
function encodeImageFileAsURL1(element) {
    let file = element.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
        imagebase64_1 = reader.result;
    }
    reader.readAsDataURL(file);
}
$("#img1").change(function (e) {
    var fileName = e.target.files[0].name;
    fileExtension = fileName.split('.').pop();
    imgExtension1 = fileExtension;
});

$("#updateAdmin").click(function () {
    let fName = $("#fName").val();
    let lName = $("#lName").val();
    let address = $("#address").val();
    let city = $("#city").val();
    let telNo = $("#telNo").val();
    let errors = [];
    var errFlag = 0;
    //validation
    if (telNo.toString.length > 20) {
        errors.push("telephone number should be less than 20 characters long");
        errFlag++;
    }
    if (city.length > 50) {
        errors.push("City must be less than 50 characters");
        errFlag++;
    }
    if (address.length > 255) {
        errors.push("address must be less than 255 characters");
        errFlag++;
    }
    if (lName.length > 50) {
        errors.push("last name must be less than 50 characters");
        errFlag++;
    }
    if (fName.lengt > 50) {
        errors.push("first name length must be less than 50 characters");
        errFlag++;
    }
    if (fName == "") {
        errors.push("first name required");
        errFlag++;
    }
    if (lName == "") {
        errors.push("last name required");
        errFlag++;
    }
    if (address == "") {
        errors.push("address required");
        errFlag++;
    }
    if (city == "") {
        errors.push("city required");
        errFlag++;
    }
    if (telNo == "") {
        errors.push("telephone number is required");
        errFlag++;
    }
    if (errFlag == 0) {
        let req = {
            "tp": telNo,
            "address": address,
            "lName": lName,
            "fName": fName,
            "city": city,
            "pic": imagebase64_1.replace(/^data:image\/[a-z]+;base64,/, ""),
            "exen": imgExtension1
        }

        $.ajax({
            type: "POST",
            url: setUrl("Admin/Admin/updateAdmin"),
            data: JSON.stringify(req),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                alertMsg(["Successfully updated"]);
                delay(function () {
                    window.location.replace("/aquaspace/frontend/src/Admin/AdminAccount.html");
                }, 5000);
            },
            error: function (errMsg) {
                // window.location.replace("/aquaspace/frontend/src/Error/" + errMsg.status + ".html");
            }
        });

    } else {
        errorShow(errors);
    }
});