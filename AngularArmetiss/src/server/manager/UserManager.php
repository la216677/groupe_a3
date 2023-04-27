<?php

class UserManager
{

  private $db;

  public function __construct($db)
  {
    $this->db = $db;
  }

  public function getUser($user, $password)
  {
    $sql = "SELECT * from Users where User_Email_Address=:login";
    $result = false;
    try {
      $select = $this->db->prepare($sql);
      $params = array(
        'login' => $user
      );
      $select->execute($params);
      $loginInfo = $select->fetch(PDO::FETCH_ASSOC);
      if ($loginInfo) {
        if($password == $loginInfo['User_Password'])
        {
          $result = true;
        }
      }
    } catch (PDOException $e) {
      die($e);
    } finally {
      $select->closeCursor();
    }
    return $result;
  }
}
