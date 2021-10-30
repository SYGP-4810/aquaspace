
$('#add').click(function(){
    let fish = $('#com-fish').val();
    $('.compatible-fish-list').append(`
    <div class="compatible-fish-list-item">
                            ${fish}
                        </div>`)

})