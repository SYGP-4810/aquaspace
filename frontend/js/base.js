//api setter
function setUrl(text){
    return "/aquaspace/backend/public/index.php?"+text;
  }


function modal(divName,errors, header){
    $(divName).html(`<div class="modal-content">
      <div class="modal-header">
        <span class="close">&times;</span>
        <h2>${header}</h2>
      </div>
      <div class="modal-body" id="modal-body">
        <p>Some text in the Modal Body</p>
        <p>Some other text...</p>
      </div>
    </div>`);
    errors.forEach((row) => {
        $("#modal-body").append(`<p>${row}</p>`);
        
    }
    
    );

    // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

}