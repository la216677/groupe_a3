<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class GetStockTest extends PHPUnit\Framework\TestCase
{
    /**
     * @depends AddStockTest::testAddStock
     */
    public function testGetStock(){
        $pdo = connect();
        $idProduct = 1;
        $history = $this->getStock($idProduct, $pdo);
        $this->assertNotEmpty($history);
    }

    private function getStock($idProduct, $pdo){
        $history = [];

        $sql = "SELECT * FROM Stock WHERE Id_Product = :idProduct";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['idProduct' => $idProduct]);

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $history[] = [
                'Id_Stock' => $row['Id_Stock'],
                'Stock_Quantity' => $row['Stock_Quantity'],
                'Stock_Date' => $row['Stock_Date'],
                'Stock_Purchase_Price_HTVA' => $row['Stock_Purchase_Price_HTVA'],
                'Stock_Purchase_Price_TVAC' => $row['Stock_Purchase_Price_TVAC'],
                'Id_Product' => $idProduct,
                'Stock_provider' => $row['Stock_provider']
            ];
        }

        return $history;
    }
}
?>