<?php
  $db_host='130.61.110.159';
  $db_username='armecaisse';
  $db_password='*j#$!^C5@7K879C583s6';
  $db_name='armecaisse';

  function connect(){
    try{
      $connexion=new PDO("mysql:host=$db_host;dbname=$db_name", $db_username, $db_password);
      $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $connexion;
    }catch(PDOException $e){
      console.log('Echec de la connexion : '.$e->getMessage());
    }
  }

?>
