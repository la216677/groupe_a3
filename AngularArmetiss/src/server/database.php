<?php
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Credentials: true');
  header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header("Content-Type: application/json; charset=UTF-8");

  function connect($db_host,$db_username,$db_name,$db_password){
    try{
      $connexion=new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
      $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $connexion;
    }catch(PDOException $e){
      print('Echec de la connexion : '.$e->getMessage());
    }
  }

?>
