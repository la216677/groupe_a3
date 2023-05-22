<?php 

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class GetClientTest extends PHPUnit\Framework\TestCase
{
    /**
     * @depends AddClientTest::testAddClient
     */
    public function testGetClient()
    {
        $pdo = connect();
        $clients = $this->getClient($pdo);

        $this->assertNotEmpty($clients);

        foreach ($clients as $client) {
            $this->assertArrayHasKey('ID_Client', $client);
            $this->assertArrayHasKey('Client_Last_Name', $client);
            $this->assertArrayHasKey('Client_Name', $client);
            $this->assertArrayHasKey('Client_Email', $client);
            $this->assertArrayHasKey('Client_NumTel', $client);
            $this->assertArrayHasKey('Client_Adresse', $client);
        }
    }

    private function getClient($pdo){
        $clients = [];
        $sql = "SELECT * FROM Client WHERE Client_Delete = FALSE";
        $stmt = $pdo->query($sql);

        try{
            $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }catch(PDOException $e){
            $this->fail('Erreur');
        }

        return $clients;
    }
}

?>