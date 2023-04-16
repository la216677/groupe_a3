<?php

    include_once('../database.php');

    $sale=[];

    $sql="SELECT * FROM Sale";

    if($result = mysqli_query($mysqli,$sql))
    {
        $i = 0;
        while($row = mysqli_fetch_assoc($result))
    {
        $sale[$i]['Id_Sale'] = $row['Id_Sale'];
        $sale[$i]['Sale_Price'] = $row['Sale_Price'];
        $sale[$i]['Sale_Date'] = $row['Sale_Date'];
        $sale[$i]['Id_User'] = $row['Id_User'];
        $sale[$i]['Id_Client'] = $row['Id_Client'];

        $i++;
    }

        echo json_encode(['data'=>$sale]);
    }
    else
    {
        http_response_code(404);
    }

?>