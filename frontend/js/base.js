//api setter
function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
  }
//error showing function first create div with id alertDiv 
function errorShow(er){
    $("#alertDiv").html(`<div class="alert">
     <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
     <h2>Error!!</h2>
     <ul id="alertContentList"></ul>
   </div>`);
   er.forEach((element)=>{
        $("#alertContentList").append(`<li>${element}</li>`);
   });
   $("#alertDiv").focus();
}

//wait some time before go to next line

var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

function alertMsg(er){
    $("#alertDiv").html(`<div class="alertMsg">
     <h2>Msg!!</h2>
     <ul id="alertContentList"></ul>
     <p>wait 5 second before you redirect</p>
   </div>`);
   er.forEach((element)=>{
        $("#alertContentList").append(`<li>${element}</li>`);
   });
   $("#alertDiv").focus();
}