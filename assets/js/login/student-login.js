$("#login-button").click(function() {
    var email = document.getElementById('email-input').value;
    var password = document.getElementById('password-input').value;
    $.post("rest/login-user", { 
        "email": document.getElementById('email-input').value, 
        "password": document.getElementById('password-input').value
      }).done(function(data, status){
          $.cookie('user', JSON.stringify(data.body));
          console.log('Cookie read: ', $.cookie('user'));
          document.location.replace('#');
    }).fail(function() {
        alert('Error occured');
    });
});