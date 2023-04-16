<?php

    include_once "../database.php";

    $client = [];
    $sql = "SELECT * FROM Client";

    if($result = mysqli_query($mysqli,$sql))
    {
        $i = 0;
      while($row = mysqli_fetch_assoc($result))
      {
        $client[$i]['ID_Client'] = $row['ID_Client'];
        $client[$i]['Client_Name'] = $row['Client_Name'];
        $client[$i]['Client_Last_Name'] = $row['Client_Last_Name'];
        $client[$i]['Client_Email'] = $row['Client_Email'];
        $client[$i]['Client_NumTel'] = $row['Client_NumTel'];
        $client[$i]['Client_Adresse'] = $row['Client_Adresse'];
        $i++;
      }

  echo json_encode(['data'=>$client]);
}
else
{
  http_response_code(404);
}

?>