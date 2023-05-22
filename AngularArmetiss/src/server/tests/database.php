<?php

require_once('config.php');

  function connect(){
    try {
        $pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->exec("SET NAMES utf8");
        return $pdo;
    } catch(PDOException $e) {
        die("Failed to connect: " . $e->getMessage());
    }
  }

  $pdo=connect();
?>
