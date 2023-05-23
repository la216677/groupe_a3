<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

 class DeleteProductTest extends PHPUnit\Framework\TestCase
 {
    /**
     * @depends AddProductTest::testAddProduct
     * @depends GetProductTest::testGetProduct
     * @depends UpdateProductTest::testUpdateProduct
     */

    public function testDeleteProduct()
    {
        $pdo = connect();
        $productId = 1;

        $result = $this->deleteProduct($productId, $pdo);

        $this->assertTrue($result);

        $this->deleteTva($productId,$pdo);
        $this->deleteCategory($productId,$pdo);
    }

    private function deleteProduct($productId, $pdo)
    {
        $sql = "DELETE FROM Product WHERE ID_Product = :productId";
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

    private function deleteCategory($productId,$pdo){
        $sql = "DELETE FROM Category WHERE ID_Category = :categoryId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':categoryId', $productId);
        $stmt->execute();
    }

    private function deleteTva($productId,$pdo){
        $sql = "DELETE FROM TVA WHERE ID_TVA = :tvaId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':tvaId', $productId);
        $stmt->execute();
    }
 }

?>