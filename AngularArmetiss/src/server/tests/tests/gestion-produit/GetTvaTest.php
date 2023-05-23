<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class GetTvaTest extends PHPUnit\Framework\TestCase
{
    /**
     * @depends AddProductTest::testAddProduct
     */
    public function testGetTva()
    {
        $pdo = connect();
        $result = $this->getTVA($pdo);
        echo 'Result: ' . $result . PHP_EOL;
        $this->assertTrue($result);
    }

    private function getTVA($pdo)
    {
        $sql = "SELECT * FROM TVA";

        $stmt = $pdo->prepare($sql);
        
        try{
            $stmt->execute();
            $rowCount = $stmt->rowCount();
            return $rowCount>0;
        }catch (PDOException $e){
            return false;
        }
    }
}
?>