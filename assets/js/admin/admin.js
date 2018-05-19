$(document).ready(function() {
    $("#user-navigation").hide();
    $("#admin-navigation").show();
    console.log(location.href)
    location.href = location.href + "-homework-list"
});