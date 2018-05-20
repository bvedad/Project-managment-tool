$("#login-button").click(function() {
    var email = document.getElementById('email-input').value;
    var password = document.getElementById('password-input').value;
    $.post("rest/login-admin", { 
        "email": document.getElementById('email-input').value, 
        "password": document.getElementById('password-input').value
      }).done(function(data, status){
          debugger
          $.cookie('user', JSON.stringify(data.body));
          $.cookie('jwt_token', data.header);
          console.log('Cookie read: ', $.cookie('user'));
          document.location.replace('#add-student');
    }).fail(function() {
        alert('Error occured');
    });
});