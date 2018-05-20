$(document).ready(function() {
  $("main#spapp > section").height($(document).height() - 60);

  var app = $.spapp({ pageNotFound: "error_404" }); // initialize

  // define routes
  app.route({
    view: "student-login",
    onCreate: function() {},
    onReady: function() {
      $("#user-navigation").hide();
      $("#professor-navigation").hide();
      $("#admin-navigation").hide();
      redirectToContentIfNeeded();
    }
  });
  app.route({
    view: "professor-login",
    onCreate: function() {},
    onReady: function() {
      $("#user-navigation").hide();
      $("#professor-navigation").hide();
      $("#admin-navigation").hide();
      redirectToContentIfNeeded();
    }
  });
  app.route({
    view: "admin-login",
    onCreate: function() {},
    onReady: function() {
      $("#user-navigation").hide();
      $("#professor-navigation").hide();
      $("#admin-navigation").hide();
      redirectToContentIfNeeded();
    }
  });
  app.route({
    view: "professor-homework-list",
    onCreate: function() {},
    onReady: function() {
      $("#professor-navigation").show();
      $("#user-navigation").hide();
      $("#admin-navigation").hide();
      redirectToProfessorLoginIfNeeded();
    }
  });
  app.route({
    view: "professor-homework-post",
    onCreate: function() {},
    onReady: function() {
      $("#professor-navigation").show();
      $("#user-navigation").hide();
      $("#admin-navigation").hide();
      redirectToProfessorLoginIfNeeded();
    }
  });
  app.route({
    view: "add-professor",
    onCreate: function() {},
    onReady: function() {
      $("#user-navigation").hide();
      $("#professor-navigation").hide();
      $("#admin-navigation").show();
      redirectToAdminLoginIfNeeded();
    }
  });
  app.route({
    view: "add-student",
    onCreate: function() {},
    onReady: function() {
      $("#user-navigation").hide();
      $("#professor-navigation").hide();
      $("#admin-navigation").show();
      redirectToAdminLoginIfNeeded();
    }
  });
  app.route({
    view: "student-homework-list",
    onCreate: function() {},
    onReady: function() {
      $("#user-navigation").show();
      $("#professor-navigation").hide();
      $("#admin-navigation").hide();
      redirectToUserLoginIfNeeded();
    }
  });
  // run app
  app.run();
});

function getLoggedUserMode() {
  var user = getUser();
  if(typeof(user) == 'undefined') {
    return false;
  }
  return user.mode;
}

function getUser() {
  return JSON.parse($.cookie('user'));
}

function redirectToUserLoginIfNeeded() {
  var user = getUser();
  if(!user || user.mode != 'student') {
    logoutUser();
    document.location.replace('#student-login');
  }
}

function redirectToProfessorLoginIfNeeded() {
  var user = getUser();
  if(!user || user.mode != 'professor') {
    logoutUser();
    document.location.replace('#professor-login');
  }
}

function redirectToAdminLoginIfNeeded() {
  var user = getUser();
  if(!user || user.mode != 'admin') {
    logoutUser();
    document.location.replace('#admin-login');
  }
}

function redirectToContentIfNeeded() {
  var mode = getLoggedUserMode();
  switch(mode) {
    case 'student':
      document.location.replace('#student-homework-list');
    break;
    case 'professor':
      document.location.replace('#professor-homework-list');
    break;
    case 'admin':
      document.location.replace('#add-student');
    break;
  }
}