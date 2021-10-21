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