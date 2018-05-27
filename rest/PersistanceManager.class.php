<?php
class PersistanceManager{
  private $pdo;

  public function __construct(){
    $this->pdo = new PDO('mysql:host='.'localhost'.';dbname='.'id5959676_lms', 'id5959676_bvedad', 'vedadabh');
    $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
  }
  //works
  public function get_user($username, $password) {
    $query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    return $this->pdo->query($query)->fetch();
  }

  public function get_task_details($taskId) {
    $query = "SELECT * FROM tasks WHERE id='$taskId'";
    return $this->pdo->query($query)->fetch();
  }

  public function add_user($user) {
    $username = $user["username"];
    $usernameQuery = "SELECT * FROM users WHERE username='$username'";
    if($this->pdo->query($usernameQuery)->rowCount() == 0) {
      $insertQuery = "INSERT INTO users
            (name, surname, email, password, username)
            VALUES (:name, :surname, :email, :password, :username)";
      $statement = $this->pdo->prepare($insertQuery);
      $statement->execute($user);
      return true;
    } else {
      return false;
    }
  }
  //works
  public function get_user_tasks($userid) {
    $query = "SELECT T.id, T.title, T.body, T.final_date,
    D.name AS domain_name, D.description AS domain_description,
     P.title AS priority_mode_name, P.description AS priority_mode_description,
     S.name AS subject_name, S.description AS subject_description
    FROM tasks T
    INNER JOIN domain D on T.fk_domain = D.id
    INNER JOIN priority_mode P ON P.id = T.fk_priority_mode
    INNER JOIN subject S on S.id = T.fk_subject
    WHERE fk_user=$userid";
    return $this->pdo->query($query)->fetchAll(PDO::FETCH_OBJ);
  }

  public function get_domains() {
    $query = "SELECT * FROM domain";
    return $this->pdo->query($query)->fetchAll();
  }

  public function get_subjects() {
    $query = "SELECT * FROM subject";
    return $this->pdo->query($query)->fetchAll();
  }

  public function get_priority_modes() {
    $query = "SELECT * FROM priority_mode";
    return $this->pdo->query($query)->fetchAll();
  }

  public function add_task($task) {
    $insertQuery = "INSERT INTO tasks
          (title, body, final_date, fk_user, fk_priority_mode, fk_domain, fk_subject)
          VALUES (:title, :body, :finalDateTimestamp, :userId, :priorityModeId, :domainId, :subjectId)";
    $statement = $this->pdo->prepare($insertQuery);
    $statement->execute($task);
  }

  public function setTaskStatus($id, $status) {
    $insertQuery = "UPDATE tasks SET status = $status WHERE id=$id";
    $statement = $this->pdo->prepare($insertQuery);
    $statement->execute();
  }
}
?>