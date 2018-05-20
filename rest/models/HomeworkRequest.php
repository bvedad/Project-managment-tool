<?php
class HomeworkRequest {
    public $id;
    public $title;
    public $description;
    public $subject;
    public $dueDate;
    public $datePosted;
    
    public function __construct($id, $title, $description, $subject, $dueDate) {
        $this->id = $id;
        $this->title = $title;
        $this->description = $description;
        $this->subject = $subject;
        $this->dueDate = $dueDate;
        $this->datePosted = $this->getTimestamp();
    }

    public function getTimestamp() {
        $date = new DateTime();
        return $date->getTimestamp();
    }
}
?>