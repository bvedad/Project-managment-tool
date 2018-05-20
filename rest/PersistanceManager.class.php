<?php
class PersistanceManager{
  private $pdo;

  public function __construct(){
    $this->pdo = new PDO('mysql:host='.'localhost'.';dbname='.'lms', 'root', 'vedadabh');
    $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
  }

  public function add_student($student){
    $email = $student["email"];
    $emailQuery = "select * from students where email='$email'";
    if($this->pdo->query($emailQuery)->rowCount() == 0) {
      $insertQuery = "INSERT INTO students
            (name, surname, email, password, year, mode, school_fk)
            VALUES (:name, :surname, :email, :password, :year, :mode, :school_fk);
            INSERT INTO courses
            (name, )";
      $statement = $this->pdo->prepare($insertQuery);
      $statement->execute($student);
      return true;
    } else {
      return false;
    }
  }

  public function add_professor($professor){
    $email = $professor["email"];
    $emailQuery = "select * from professors where email='$email'";
    if($this->pdo->query($emailQuery)->rowCount() == 0) {
      $insertQuery = "INSERT INTO professors
            (name, surname, email, password, mode, school_fk)
            VALUES (:name, :surname, :email, :password, :mode, :school_fk)";
      $statement = $this->pdo->prepare($insertQuery);
      $statement->execute($professor);
      return 200;
    } else {
      return 'Email exists';
    }
  }


  public function get_student($email, $password) {
    $query = "SELECT * FROM students WHERE email='$email' AND password='$password'";
    return $this->pdo->query($query)->fetch();
  }

  public function get_professor($email, $password) {
    $query = "SELECT * FROM professors WHERE email='$email' AND password='$password'";
    return $this->pdo->query($query)->fetch();
  }

  public function get_admin($email, $password) {
    $query = "SELECT * FROM admins WHERE email='$email' AND password='$password'";
    return $this->pdo->query($query)->fetch();
  }

}

?>
