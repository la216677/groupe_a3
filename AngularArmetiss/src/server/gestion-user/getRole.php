<?php 

include_once('../database.php');

$roles = [];
$sql = "SELECT * FROM Role";

try{
  $stmt=$pdo->prepare($sql);

  $stmt->execute();

  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

  foreach($result as $row){
    $roles[]=array(
      'ID_Role'=>$row['ID_Role'],
      'Role'=>$row['Role']
    );
  }
    
  echo json_encode(['data'=>$roles]);
}
catch(PDOException $e)
{
  http_response_code(404);
}

?>