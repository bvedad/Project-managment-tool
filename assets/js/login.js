$(document).ready(function() {
    $("#user-navigation").hide();
    $("#admin-navigation").hide();
    $("#login-button").click(function() {
        console.log(document.getElementById('username-input').value);
        // document.getElementById('login-button').click();
    });
});