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

  public function getUserInfo($user){
    $sql = "SELECT Id_User FROM Users WHERE User_Email_Address = :user";
    try{
      $select=$this->db->prepare($sql);
      $params=array(
        'user' => $user
      );
      $select->execute($params);
      $userInfo = $select->fetch(PDO::FETCH_ASSOC);
    }catch(PDOException $e){
      $select->closeCursor();
    }
    return $userInfo['Id_User'];
  }

  public function getUserRole($user){
    $sql = "SELECT Id_Role FROM Users WHERE User_Email_Address = :user";
    try{
      $select=$this->db->prepare($sql);
      $params=array(
        'user' => $user
      );
      $select->execute($params);
      $userInfo = $select->fetch(PDO::FETCH_ASSOC);
    }catch(PDOException $e){
      $select->closeCursor();
    }
    return $userInfo['Id_Role'];
  }
}
