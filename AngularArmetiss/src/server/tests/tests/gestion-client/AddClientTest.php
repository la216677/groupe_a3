<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class AddClientTest extends PHPUnit\Framework\TestCase
{
    public function testAddClient()
    {
        $clientData = [
            'ID_Client' => '1',
            'Client_Last_Name' => 'Doe',
            'Client_Name' => 'John',
            'Client_Email' => 'john.doe@example.com',
            'Client_NumTel' => '123456789',
            'Client_Adresse' => '123 Main Street'
        ];

        $postdata = json_encode($clientData);
        $pdo = connect();
        $result = $this->insertClient($postdata, $pdo);

        echo 'Result: ' . $result . PHP_EOL;

        $this->assertTrue($result); // Vérifie si la requête a été exécutée

        $insertedClient = $this->getInsertedClient($clientData['Client_Last_Name'], $pdo);
        $this->assertEquals($clientData['Client_Last_Name'], $insertedClient['Client_Last_Name']);
        $this->assertEquals($clientData['Client_Name'], $insertedClient['Client_Name']);
        $this->assertEquals($clientData['Client_Email'], $insertedClient['Client_Email']);
        $this->assertEquals($clientData['Client_NumTel'], $insertedClient['Client_NumTel']);
        $this->assertEquals($clientData['Client_Adresse'], $insertedClient['Client_Adresse']);
    }
    private function insertClient($postdata, $pdo)
    {
        $request = json_decode($postdata);

        $id_client = trim($request->ID_Client);
        $last_name = trim($request->Client_Last_Name);
        $first_name = trim($request->Client_Name);
        $email = trim($request->Client_Email);
        $numTel = trim($request->Client_NumTel);
        $adresse = trim($request->Client_Adresse);

        $sql = "INSERT INTO Client(ID_Client, Client_Last_Name, Client_Name, Client_Email, Client_NumTel, Client_Adresse)
            VALUES (:id_client, :last_name, :first_name, :email, :numTel, :adresse)";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_client', $id_client);
        $stmt->bindParam(':last_name', $last_name);
        $stmt->bindParam(':first_name', $first_name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':numTel', $numTel);
        $stmt->bindParam(':adresse', $adresse);

        try {
            $stmt->execute();
            $rowCount = $stmt->rowCount();
            return $rowCount > 0;
        } catch (PDOException $e) {
            return false;
        }
    }

    private function getInsertedClient($lastName, $pdo)
    {
        $sql = "SELECT * FROM Client WHERE Client_Last_Name = :lastName";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':lastName', $lastName);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}