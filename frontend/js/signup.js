$(".tab:not(:first)").hide();

// Selecting user type 
$(".submit").click(function(e) {

    $(".tab").hide();
    $(".tab").eq($(".tab").index()).show();
})

$(".verify").click(function(e){
    $(".tab").hide();

    if($("input[name='selection']:checked").val() == 'value-1') {
        $(".tab").eq(2).show();
    } else if($("input[name='selection']:checked").val() == 'value-2') {
        $(".tab").eq(3).show();
    } else if($("input[name='selection']:checked").val() == 'value-3') {
        $(".tab").eq(4).show();
    }
})

// function validate()