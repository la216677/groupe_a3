<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class GetClientByIdTest extends PHPUnit\Framework\TestCase
{
    /**
     * @depends AddClientTest::testAddClient
     */
    public function testGetClientById()
    {
        $clientId = 1;
        $pdo = connect();
        $client = $this->getClientById($clientId, $pdo);
        
        $this->assertNotEmpty($client);

        $this->assertArrayHasKey('ID_Client', $client);
        $this->assertArrayHasKey('Client_Last_Name', $client);
        $this->assertArrayHasKey('Client_Name', $client);
        $this->assertArrayHasKey('Client_Email', $client);
        $this->assertArrayHasKey('Client_NumTel', $client);
        $this->assertArrayHasKey('Client_Adresse', $client);
    }

    private function getClientById($clientId, $pdo){
        $sql = "SELECT * FROM Client WHERE ID_Client = :clientId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":clientId", $clientId);

        try {
            if ($stmt->execute()) {
                $client = $stmt->fetch(PDO::FETCH_ASSOC);
                return $client ? $client : [];
            } else {
                return [];
            }
        } catch (PDOException $e) {
            return [];
        }
    }
}

?>