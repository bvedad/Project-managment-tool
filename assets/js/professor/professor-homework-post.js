$('#form-homework').validate({
    rules: {
        title: {
            minlength: 5,
            maxlength: 40
        },
        description: {
            minlength: 10
        }
    },
    messages: {
        title: {
            // required: 'Title is must',
            minlength: 'Min is 5',
            maxlength: 'Max is 40'
        },
        description: {
            minlength: 'Min is 10'
        }
    }
    // submitHandler: function (form) {
    //     var title = $('#input-title').val();
    //     var description = $('#input-description').val();
    //     var year = $('#input-year').val();
    //     debugger

    //     console.log('array', form.serializeArray());
    //     console.log('title', title);
    //     console.log('homework', description);
    //     //todo bvedad implement posting homework
    //     $.post("rest/homeworks", {
    //         'title': title,
    //         'description': description,
    //         'year': year
    //     },
    //     function(data, status){
    //         debugger
    //         if(status == 'success') {
    //             alert('Homework posted');
    //         } else {
    //             alert('Error occured');
    //         }
    //     });
    // }
});