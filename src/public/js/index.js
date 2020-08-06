
$('#formComment').hide();
$('#btn-toggle-comment').click(e => {
    e.preventDefault();
    $('#formComment').slideToggle();
});

$('#btn-like').click(function(e){
    e.preventDefault();
    let imgId= $(this).data('id');
    //console.log(imgId);
    $.post(`/images/${imgId}/like`)
        .done(data=> {
            console.log(data);
            $('.likes-count').text(data.likes)
        });
});

$('#btn-delete').click(function(e){
    e.preventDefault();
    let $boton = $(this);
    console.log($boton.data('id'));
    const answer = confirm('¿¿¿¿Are you sure????');
    if(answer){
        let imageId = $boton.data('id');
        console.log(imageId);
        $.ajax({
            url: '/images/' + imageId,
            type: 'DELETE'
        })
        .done(result => {
            //console.log(result);
            $(location).attr('href','/');
            alert("deleted Image");
        });
    }
});

