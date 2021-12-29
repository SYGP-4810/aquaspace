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

function successMsg(er){
  $("#alertDiv").html(`<div class="successMsg">
   <h2>Success!!</h2>
   <ul id="alertContentList"></ul>
   <p>wait 5 second before you redirect</p>
 </div>`);
 er.forEach((element)=>{
      $("#alertContentList").append(`<li>${element}</li>`);
 });
 $("#alertDiv").focus();
}
// confrimation box


var conf = document.getElementById('confirm');

window.onclick = function(event) {
  if (event.target == conf) {
    conf.style.display = "none";
  }
}

/* <button onclick="document.getElementById('confirm').style.display='block'">Open Modal</button>
    <div id="confirm" class="confirm-box">
        <div class="container">
            <span onclick="document.getElementById('confirm').style.display='none'" class="close" title="Close ">×</span>
            <h1>Delete Account</h1>
            <p>Are you sure you want to delete your account?</p>
            <div class="clearfix">
                <button type="button" class="cancelbtn">Cancel</button>
                <button type="button"class="deletebtn">Delete</button>
            </div>
        </div>
    </div> */