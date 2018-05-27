<?php
require '../vendor/autoload.php';
require 'models/HomeworkRequest.php';
require_once 'PersistanceManager.class.php';
use \Firebase\JWT\JWT;

Flight::register('pm', 'PersistanceManager');

Flight::route('GET /users/@userid/tasks', function($userid) {
    $userTasks = Flight::pm()->get_user_tasks($userid);
    Flight::json($userTasks);
});

Flight::route('POST /users/tasks/@taskid', function($taskid) {
    $request = Flight::request();
    Flight::pm()->setTaskStatus($taskid, $request->data->status);
});

Flight::route('GET /domains', function(){
    $domains = Flight::pm()->get_domains();
    Flight::json($domains);
});

Flight::route('GET /subjects', function(){
    $subjects = Flight::pm()->get_subjects();
    Flight::json($subjects);
});

Flight::route('GET /priority-modes', function(){
    $priorityModes = Flight::pm()->get_priority_modes();
    Flight::json($priorityModes);
});

Flight::route('POST /login', function() {
    $request = Flight::request();
    
    $key = "secretSignKey";
    $user = Flight::pm()->get_user($request->data->username,
    $request->data->password);
    if($user == false) {
        Flight::json(array(
            'status' => 403,
            'errorCode' => '1'
         ), 403);
         return;
    } else {
        $payload = array(
            "id" => $user['id'],
            "username" => $user['username']
        );
        Flight::json(array(
            'status' => 200,
            'errorCode' => '1',
            'header'=> JWT::encode($payload, $key),
            'body'=> array(
                'id'=> $user['id'],
                'name'=> $user['name'],
                'surname'=> $user['surname'],
                'email'=> $user['email'],
                'username' => $user['username']
            )
         ), 200);
    }
});

Flight::route('POST /users', function(){
    $request = Flight::request();

    $user = [
    'name' => $request->data->data['name'],
    'surname' => $request->data->data['surname'],
    'email' => $request->data->data['email'],
    'username' => $request->data->data['username'],
    'password' => $request->data->data['password'],
    ];
    $isSuccesful = Flight::pm()->add_user($user);
    if($isSuccesful) {
        Flight::response()->status(200)->header('content-type', 'text/html; charset=utf-8')->write
        ('User successfuly added');
    } else {
        Flight::response()->status(403)->header('content-type', 'text/html; charset=utf-8')->write
        ('Username already used');
    }
  });

  Flight::route('POST /tasks', function(){
    $request = Flight::request();

    $task = [
    'title' => $request->data->title,
    'body' => $request->data->body,
    'domainId' => $request->data->domainId,
    'subjectId' => $request->data->subjectId,
    'priorityModeId' => $request->data->priorityModeId,
    'userId' => $request->data->userId,
    'finalDateTimestamp' => $request->data->finalDateTimestamp
    ];
    Flight::pm()->add_task($task);
  });

Flight::start();
?>