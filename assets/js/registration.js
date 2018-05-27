$("#register-button").click(function() {
    var name = document.getElementById('name-input').value;
    var surname = document.getElementById('surname-input').value;
    //todo bvedad implement this
    var username = document.getElementById('username-input').value;
    var email = document.getElementById('email-input').value;
    var password = document.getElementById('password-input').value;
    var passwordConfirm = document.getElementById('password-confirm-input').value;
    if(!areInputsValid(email, name, surname, username,
    password, passwordConfirm)) {
        return;
    }
    $.post("rest/users", {
        'data': {
            'name': name,
            'surname': surname,
            'username': username,
            'email': email,
            'password': password
        },
        'headers': 'vedad'
    },
    function(data, status){
        if(status == 'success') {
            alert('Account created');
            document.location.replace('#login');
        } else {
            alert('Account not created');
        }
    });
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function areInputsValid(email, name, surname, username, password, passwordConfirm) {
    if(name === '') {
        alert('Please enter name');
        return false;
    }
    if(surname === '') {
        alert('Please enter surname');
        return false;
    }
    if(email === '' || !validateEmail(email)) {
        alert('Please enter valid email');
        return false;
    }
    if(username === '') {
        alert('Please enter username');
        return false;
    }
    if(password === '') {
        alert('Please enter password');
        return false;
    }
    if(password !== passwordConfirm) {
        alert('Passwords does not match');
        return false;
    }
    return true;
}