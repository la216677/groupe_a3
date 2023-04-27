<?php

class DBManager
{

  private $db;

  function connect()
  {
    try {
      $strConnection = 'mysql:host=130.61.110.159;dbname=armecaisse';
      $this->db = new PDO($strConnection, 'armecaisse', '*j#$!^C5@7K879C583s6');
      $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
      $msg = 'ERREUR PDO dans ' . $e->getFile() . ' Ligne : ' . $e->getLine() . ' : ' . $e->getMessage();
      die($msg);
    }
    return $this->db;
  }

  function disconnect()
  {
    $this->db = null;
  }
}
