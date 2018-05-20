$("#register-button").click(function() {
    var name = document.getElementById('name-input').value;
    var surname = document.getElementById('surname-input').value;
    var email = document.getElementById('email-input').value;
    var year = document.getElementById('year-input').value;
    var password = document.getElementById('password-input').value;
    var passwordConfirm = document.getElementById('password-confirm-input').value;
    if(!areInputsValid(email, name, surname, year,
    password, passwordConfirm)) {
        return;
    }
    $.post("rest/students", {
        'name': name,
        'surname': surname,
        'email': email,
        'year': year,
        'password': password
    },
    function(data, status){
        debugger
        if(status == 'success') {
            alert('Account created');
        } else {
            alert('Account not created');
        }
    });
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function areInputsValid(email, name, surname, year, password, passwordConfirm) {
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
    if(year === '') {
        alert('Please enter year');
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