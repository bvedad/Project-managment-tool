$("#login-button").click(function() {
    $.post("rest/login", { 
        "username": document.getElementById('username-input').value, 
        "password": document.getElementById('password-input').value
      }).done(function(data, status){
          Cookies.set('user', JSON.stringify(data.body));
          console.log('Cookie read: ', Cookies.get('user'));
          document.location.replace('#task-post');
    }).fail(function() {
        alert('Error occured');
    });
});