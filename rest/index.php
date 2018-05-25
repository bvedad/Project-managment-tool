<?php
require '../vendor/autoload.php';
require 'models/HomeworkRequest.php';
require_once 'PersistanceManager.class.php';
use \Firebase\JWT\JWT;

Flight::register('pm', 'PersistanceManager');
Flight::route('GET /homeworks', function() {
    //last in array is overdued
    // $homeworkArray = array(
    //     new HomeworkRequest(1, 'Zadaca', 'Napisi for petlju', 'Programiranje', 1544572800),
    //     new HomeworkRequest(2, 'Lab', 'Napisi for petlju', 'Programiranje', 1544572800),
    //     new HomeworkRequest(3, 'Zadaca', 'Uradi logaritamski zadatak', 'Matematika', 1544572800),
    //     new HomeworkRequest(4, 'Lab', 'Uradi logaritamski zadatak', 'Matematika', 1526083200));
    // $students = Flight::pm()->get_all_students();
    
    // Flight::json($decoded);
});


Flight::route('POST /students', function(){
    $request = Flight::request();

    $student = [
    'name' => $request->data->name,
    'surname' => $request->data->surname,
    'email' => $request->data->email,
    'year' => $request->data->year,
    'password' => $request->data->password,
    'mode' => 'student',
    'school_fk' => 1
    ];
    $isSuccesful = Flight::pm()->add_student($student);
    if($isSuccesful) {
        Flight::response()->status(200)->header('content-type', 'text/html; charset=utf-8')->write
        ('Student successfuly added');
    } else {
        Flight::response()->status(403)->header('content-type', 'text/html; charset=utf-8')->write
        ('Email already used');
    }
  });

Flight::route('POST /professors', function(){
    $request = Flight::request();

    $professor = [
    'name' => $request->data->name,
    'surname' => $request->data->surname,
    'email' => $request->data->email,
    'password' => $request->data->password,
    'mode' => 'professor',
    'school_fk' => 1
    ];
    $stringCode = Flight::pm()->add_professor($professor);
    if($stringCode != 200) {
        Flight::response()->status(500)->header('content-type', 'text/html; charset=utf-8')->write($stringCode);
    } else {
        Flight::response()->status(200)->header('content-type', 'text/html; charset=utf-8')->write('Success');
    }
});

//authentication region
Flight::route('POST /login-user', function() {
    $key = "secretSignKey";
    $student = Flight::pm()->get_student(Flight::request()->data->email,
    Flight::request()->data->password);
    if($student == false) {
        Flight::json(array(
            'status' => 403,
            'errorCode' => '1'
         ), 403);
         return;
    } else {
        $payload = array(
            "id" => $student['id'],
            "email" => $student['email']
        );
        Flight::json(array(
            'status' => 200,
            'errorCode' => '1',
            'header'=> JWT::encode($payload, $key),
            'body'=> array(
                'id'=> $student['id'],
                'name'=> $student['name'],
                'surname'=> $student['surname'],
                'email'=> $student['email'],
                'mode' => $student['mode'],
                'year'=> $student['year'],
            )
         ), 200);
    }
});

Flight::route('POST /login-professor', function() {
    $key = "secretSignKey";
    $professor = Flight::pm()->get_professor(Flight::request()->data->email,
    Flight::request()->data->password);
    if($professor == false) {
        Flight::json(array(
            'status' => 403,
            'errorCode' => '1'
         ), 403);
         return;
    } else {
        $payload = array(
            "id" => $professor['id'],
            "email" => $professor['email']
        );
        Flight::json(array(
            'status' => 200,
            'errorCode' => '1',
            'header'=> JWT::encode($payload, $key),
            'body'=> array(
                'id'=> $professor['id'],
                'name'=> $professor['name'],
                'surname'=> $professor['surname'],
                'email'=> $professor['email'],
                'mode' => $professor['mode']
            )
         ), 200);
    }
});

Flight::route('POST /login-admin', function() {
    $key = "secretSignKey";
    $admin = Flight::pm()->get_admin(Flight::request()->data->email,
    Flight::request()->data->password);
    if($admin == false) {
        Flight::json(array(
            'status' => 403,
            'errorCode' => '1'
         ), 403);
         return;
    } else {
        $payload = array(
            "id" => $admin['id'],
            "email" => $admin['email']
        );
        Flight::json(array(
            'status' => 200,
            'errorCode' => '1',
            'header'=> JWT::encode($payload, $key),
            'body'=> array(
                'id'=> $admin['id'],
                'name'=> $admin['name'],
                'surname'=> $admin['surname'],
                'email'=> $admin['email'],
                'mode' => $admin['mode']
            )
         ), 200);
    }
});

//homeworks region
Flight::route('POST /homeworks', function(){
    $request = Flight::request();

    $homework = [
    'title' => $request->data->title,
    'description' => $request->data->description,
    'due_date' => $request->data->due_date,
    'date_posted' => $request->data->date_posted,
    'year' => $request->data->year
    ];
    $stringCode = Flight::pm()->add_homework($homework);
    Flight::redirect('../#professor-homework-post');
});

Flight::start();
?>