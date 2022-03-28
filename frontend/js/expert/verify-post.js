function getValuesOfFish(data) {
    $("#auto").val($(data).html());
    $('#fish_list').hide();
    // console.log($("#auto").val());
          
  }

function searchFish() {
$("#fish_list").show();
let keyword = $("#auto").val().toLowerCase();
let list = $("#fish_list li");
// console.log(list[0]);
for (let i = 0; i < list.length; i++) {
  let td = list[i].innerText.toLowerCase();
  if (td.includes(keyword)) {
    list.eq(i).show();
  } else {
    list.eq(i).hide();
  }
}
}
function searchbleh() {
$("#fish_list").show();
searchFish();
}

$(document).ready(function() {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    var name = url.searchParams.get("name");
    var img1 = url.searchParams.get("img1");
    var img2 = url.searchParams.get("img2");
    var img3 = url.searchParams.get("img3");
    var img4 = url.searchParams.get("img4");
    var authId = url.searchParams.get("authId");
    $("#fishData").html(`
    <img style="width: 250px; height: 250px;" class="hover" src="../../images/product/${img1}" alt="${name}" />
    <img style="width: 250px; height: 250px;" class="hover" src="../../images/product/${img2}" alt="${name}" />
    <img style="width: 250px; height: 250px;" class="hover" src="../../images/product/${img3}" alt="${name}">
    <img style="width: 250px; height: 250px;" class="hover" src="../../images/product/${img4}" alt="${name}">
    <br>
    <label for="uname" style="font-size: 15px;">
    <h4>suggested name</h4>
    <span>${name}</span> 
    </label><br>
    <div>
        <input type="text" id="auto" style="
        width:419px;
        font-size: 13px;
        padding:0.4em;
        outline: none;
        border-radius: 0;
        border: 1px solid #ccc;
        color:#555;" name="uname" placeholder="correct name" placeholder="enter fish name" autocomplete="off" onkeyup="searchFish()" />
        <ul id="fish_list" style="margin-top:-20px;"></div>
        </ul>
                
    <br>
    <div><button style="background-color: #ec7f71; /* Green */
            width: 220px;
            border: none;
            border-radius: 4px;
            color: white;
            padding: 4px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 15px;
            margin-top: 20px;
            margin-left: 40px;
            margin-right: 30px;
            cursor: pointer;" class="button" id="reject-button">
            Could'nt find the fish
            </button>
    <button style="background-color: #688aca; /* Green */
                width: 160px;
                border: none;
                border-radius: 4px;
                color: white;
                padding: 4px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 15px;
                margin-top: 20px;
                margin-left: 40px;
                cursor: pointer;" class="button" id="updateName">Update Name</button></div>
    `);


  $.ajax({
    type: "GET",
    url: setUrl("Expert/Expert/getCompatibleFish"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      var names = [];
      data.forEach((element) => {
        $("#fish_list").append(`
          <li onclick="getValuesOfFish(this)">${element.name}</li>`);
      });
    },
  });

$("#updateName").click(function(){
    let nameN = $("#auto").val();
    let req = {
        "productId" : id,
        "img1": img1,
        "img2": img2,
        "img3": img3,
        "img4": img4,
        "oldName": name,
        "authId" : authId
    }
    $("#auto").val('');
    if(nameN != ''){
    req["name"] = nameN;
    loading();
    $.ajax({
      type: "POST",
      url:setUrl("Expert/Expert/verifyFishName"),
      data: JSON.stringify(req),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
          console.log(data);
          loadingFinish();
          successMsg(["successfully verify the fish product"]);
          delay(function(){
            window.location.replace("/aquaspace/frontend/src/expert/requests.html");
          },3000);


      },
      error: function(errMsg) {
          window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
      }
  });
  }else{
      errorShow["you haven't set a name"];
  }
  console.log(req);
    
});

$("#reject-button").click(function(){
    window.location.replace("/aquaspace/frontend/src/expert/add-fish.html");
});
});
