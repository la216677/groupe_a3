<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class UpdateClientTest extends PHPUnit\Framework\TestCase
{
     /**
     * @depends AddClientTest::testAddClient
     */
    public function testUpdateClient()
    {
        $clientData = [
            'ID_Client' => '1',
            'Client_Last_Name' => 'Doe',
            'Client_Name' => 'John',
            'Client_Email' => 'john.doe@example.com',
            'Client_NumTel' => '123456789',
            'Client_Adresse' => '123 Main St'
        ];

        $postdata = json_encode($clientData);
        $pdo = connect();
        $result = $this->updateClient($postdata, $pdo);

        $this->assertTrue($result);
    }

    public function updateClient($postdata, $pdo)
    {
        $request = json_decode($postdata);

        $id_client = trim($request->ID_Client);
        $last_name = trim($request->Client_Last_Name);
        $first_name = trim($request->Client_Name);
        $email = trim($request->Client_Email);
        $numTel = trim($request->Client_NumTel);
        $adresse = trim($request->Client_Adresse);

        $sql = "UPDATE Client SET Client_Name = :names, Client_Last_Name = :lastname, Client_Email = :email, Client_NumTel = :numTel, Client_Adresse = :adresse WHERE ID_Client = :id_client";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":names", $first_name);
        $stmt->bindParam(":lastname", $last_name);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":numTel", $numTel);
        $stmt->bindParam(":adresse", $adresse);
        $stmt->bindParam(":id_client", $id_client);

        try {
            $stmt->execute();
            $rowCount = $stmt->rowCount();
            return $rowCount > 0;
        } catch (PDOException $e) {
            return false;
        }
    }
}
?>