$(document).ready(function() {
  $("main#spapp > section").height($(document).height() - 60);

  var app = $.spapp({ pageNotFound: "error_404" }); // initialize

  // define routes
  app.route({
    view: "login",
    onCreate: function() {},
    onReady: function() {
      $("#user-navigation").hide();
      redirectToContentIfNeeded();
    }
  });
  
  app.route({
    view: "task-post",
    onCreate: function() {},
    onReady: function() {
      $("#user-navigation").show();
      redirectToLoginIfNeeded();
    }
  });

  app.route({
    view: "task-list",
    onCreate: function() {},
    onReady: function() {
      $("#user-navigation").show();
      redirectToLoginIfNeeded();
    }
  });
  // run app
  app.run();
});

function getUser() {
  if(!Cookies.get('user')) {
    return false;
  }
  return JSON.parse(Cookies.get('user'));
}

function redirectToLoginIfNeeded() {
  var user = getUser();
  if(!user) {
    document.location.replace('#login');
  }
}

function redirectToContentIfNeeded() {
  var user = getUser();
  if(user) {
    document.location.replace('#task-post');
  }
}
