<?php

require_once('../config.php');

  function connect(){

    $mysqli = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

    if ($mysqli->connect_errno) {
      die("Failed to connect:" . mysqli_connect_error());
    }
  
    mysqli_set_charset($mysqli , "utf8");
  
    return $mysqli;
    }

  $mysqli = connect();

?>
