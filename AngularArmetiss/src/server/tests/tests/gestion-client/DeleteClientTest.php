<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class DeleteClientTest extends PHPUnit\Framework\TestCase
{
    /**
     * @depends AddClientTest::testAddClient
     * @depends CheckEmailTest::testCheckEmail
     * @depends GetClientTest::testGetClient
     * @depends GetClientByIdTest::testGetClientById
     * @depends UpdateClientTest::testUpdateClient
     */
    public function testDeleteClient()
    {   
        $clientId = 1;
        $pdo = connect();
        $result = $this->deleteClient($clientId, $pdo);

        echo 'Result: ' . $result . PHP_EOL;

        $this->assertTrue($result);

        $sql = "DELETE FROM Client WHERE ID_Client = :clientId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':clientId', $clientId);
        $stmt->execute();
    }

    private function deleteClient($clientId, $pdo)
    {
        $sql = "UPDATE Client SET Client_Delete = TRUE WHERE ID_Client = :clientId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":clientId", $clientId);
        try{
            $stmt->execute();
            $rowCount = $stmt->rowCount();

            return $rowCount >0;
        }catch (PDOException $e){
            return false;
        }
    }
}

?>