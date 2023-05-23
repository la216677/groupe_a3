<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class GetProductTest extends PHPUnit\Framework\TestCase
{
    /**
     * @depends AddProductTest::testAddProduct
     */
    public function testGetProduct()
    {
        $pdo = connect();
        $productId='1';
        $result = $this->GetProduct($pdo);
        echo 'Result: ' . $result . PHP_EOL;
        $this->assertTrue($result);
    }

    private function getProduct($pdo)
    {
        $sql = "SELECT * FROM Product";
        $stmt = $pdo->prepare($sql);

        try {
            $stmt->execute();
            $rowCount = $stmt->rowCount(); // Obtenir le nombre de lignes affectées

            return $rowCount > 0;
        } catch (PDOException $e) {
            return false;
        }
    }
    
}

?>