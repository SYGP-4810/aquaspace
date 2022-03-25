var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image'],
  
    ['clean']                                         // remove formatting button
  ];
  
var quill = new Quill('#editor', {
    modules: {
      toolbar: toolbarOptions
    },
    theme: 'snow'
  });

var compatibleFishes = new Set();

// get extention varibales
var imgExtension1 = " ";

$("#inventory-img1").change(function (e) {
    var fileName = e.target.files[0].name;
    fileExtension = fileName.split('.').pop();
    imgExtension1 = fileExtension;
 });

 // get images
 var imagebase64_1 = "";

function encodeImageFileAsURL1(element) {  
  let file = element.files[0];  
  let reader = new FileReader();  
  reader.onloadend = function() {  
      imagebase64_1 = reader.result;  
  }  
  reader.readAsDataURL(file);  
}


$("#saveBlog").click(function(){
    let editor = document.querySelector('.ql-editor');
    let errFlag = 0;
    let errors = [];
    let title = $("#titleForTheBlog").val();
    if(title ==""){
      errors.push("Title for the blog should be entered");
      errFlag++;
    }
    let category = $("#category").val();
    const acceptedFileTypes = ["png", "jpg", "jpeg"];
    if(acceptedFileTypes.indexOf(imgExtension1.toLowerCase())===-1){
        errors.push("Image 1 type must be jpg ,jpeg or png");
        errFlag++;
    }
    let summary = $("#summary").val();
    if(summary == ""){
      errors.push("You Shuold enter the summary for the blog");
      errFlag++;
    }
    if(summary.length > 200){
      errors.push("length of the summary must be less than 200 characters");
      errFlag++;
    }
    if(editor.innerHTML ==  ""){
      errors.push("article should be entered using text editor");
      errFlag++;
    }
    if(errFlag == 0){
      let req = {
        "relaventFishes" : Array.from(compatibleFishes),
        "article" : editor.innerHTML,
        "countFish" : compatibleFishes.size,
        "summary" : summary,
        "title" : title,
        "pic" : imagebase64_1.replace(/^data:image\/[a-z]+;base64,/, ""),
        "picExtension":imgExtension1,
        "category" : category
      }
      console.log(req);
    loading();
    $.ajax({
      type: "POST",
      url:setUrl("Expert/Expert/addArticle"),
      data: JSON.stringify(req),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data){
          loadingFinish();
          successMsg(["successfully added article"]);
          delay(function(){
            window.location.replace("/aquaspace/frontend/src/expert/articles.html");
          },3000);
          
      },
      error: function(errMsg) {
          // window.location.replace("/aquaspace/frontend/src/Error/"+errMsg.status+".html");
      }
  });

    }else{
      errorShow(errors);
    }
    
     
});

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
  $.ajax({
    type: "GET",
    url: setUrl("Expert/Expert/getCompatibleFish"),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      var names = [];
      data.forEach((element) => {
        $("#fish_list").append(`
          <li onclick="getValuesOfFish(this)">${element.name}</li>
          <input type="hidden" value="${element.id}" id="id${element.name}" />
          `);
      });
    },
  });

$("#add").click(function () {
  let name = $("#auto").val();
  $("#auto").val('');
  if(name != ''){
  $('.compatible-fish-list').append(`
    <div class="compatible-fish-list-item">
                            ${name}
                        </div>`);
  }
  let idName = "#id"+ name;
  let id = $(idName).val();
  compatibleFishes.add(id);
  // console.log(compatibleFishes);
})