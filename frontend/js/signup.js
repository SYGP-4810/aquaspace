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

// verify email
$(".verify").click(function(e){
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
})

// form submission
$(".submit").click(function(e){
    // insert what needs to happen
    alert("Sign Up Complete");
})

// function validate()