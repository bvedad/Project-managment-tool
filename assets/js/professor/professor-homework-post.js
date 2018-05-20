$('#button-submit').on('click', function() {
    var title = $('#input-title').val();
    var description = $('#input-homework').val();
    var year = $('#input-year').val();
    console.log('title', title);
    console.log('homework', description);
    //todo bvedad implement posting homework
    $.post("rest/homeworks", {
        'title': title,
        'description': description,
        'year': year
    },
    function(data, status){
        if(status == 'success') {
            alert('Homework posted');
        } else {
            alert('Error occured');
        }
    });
});