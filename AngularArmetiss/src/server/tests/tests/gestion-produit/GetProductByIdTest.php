<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class GetProductByIdTest extends PHPUnit\Framework\TestCase
{
    public function testGetProduct()
    {
        $pdo = connect();
        $productId='1';
        $result = $this->GetProductById($productId,$pdo);
        echo 'Result: ' . $result . PHP_EOL;
        $this->assertTrue($result);
    }

    private function getProductById($productId, $pdo)
    {
        $sql = "SELECT * FROM Product WHERE ID_Product = :productId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':productId', $productId);

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