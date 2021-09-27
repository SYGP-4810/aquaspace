$(".tab:not(:first)").hide();
$(".form-delivery").hide();

// Selecting user type 
$(".next").click(function(e) {
    $(".tab").hide();
    $(".tab").eq($(".tab").index()).show();
    
    // Update step
    var x = document.getElementsByClassName("step");
    x[0].className = x[0].className.replace(" active", " disabled");
    x[1].className += " active";
})

//email validate
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

// verify email
$(".verify").click(function(e){
    var email = $("#email").val();
    if(isEmail(email)){
        $.ajax({
            url: "http://127.0.0.1/aquaspace/backend/public/index.php?/Authentication/emailVerificationTokenCreate",
            data: {
              email: email
            },
            success: function( result ) {
                alert(result);
            },
            fail: function(xhr, textStatus, errorThrown){
              alert('request failed');
              var status = xhr.status;
              window.location.replace("../src/Error/"+status+".html");
           }
          });
        $(".tab").hide();
        if($("input[name='selection']:checked").val() == 'value-1') {
        $(".tab").eq(2).show();
        } else if($("input[name='selection']:checked").val() == 'value-2') {
        $(".tab").eq(3).show();
        } else if($("input[name='selection']:checked").val() == 'value-3') {
        $(".tab").eq(4).show();

    }
    var x = document.getElementsByClassName("step");
    x[1].className = x[1].className.replace(" active", " disabled");
    x[2].className += " active";
    }else{
        alert("enter email with correct format");
    }

    

    
})

// form submission
$(".submit").click(function(e){
    // insert what needs to happen
    alert("Sign Up Complete");
})

// function validate()