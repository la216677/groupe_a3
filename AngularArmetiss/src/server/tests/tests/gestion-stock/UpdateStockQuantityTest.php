<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class UpdateStockQuantityTest extends PHPUnit\Framework\TestCase
{
    /**
     * @depends AddStockTest::testAddStock
     */
    public function testUpdateStockQuantity()
    {
        $pdo = connect();
        $idProduct = 1;
        $result = $this->updateStockQuantity($idProduct,$pdo);
        $this->assertTrue($result);
    }

    private function updateStockQuantity($idProduct,$pdo)
    {
        $sql = "SELECT SUM(Stock_Quantity) AS stock FROM Stock WHERE Id_Product = :idProduct";
        $sql2 = "SELECT SUM(Quantity) AS quantity FROM Sale_Product WHERE Id_Product = :idProduct";
        $sql3 = "UPDATE Product SET Product_Quantity = :stock WHERE Id_Product = :idProduct";

        try {
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':idProduct', $idProduct);

            if ($stmt->execute()) {
                $stock = $stmt->fetchColumn();

                $stmt2 = $pdo->prepare($sql2);
                $stmt2->bindParam(':idProduct', $idProduct);

                if ($stmt2->execute()) {
                    $quantity = $stmt2->fetchColumn();

                    $stock -= $quantity;

                    $stmt3 = $pdo->prepare($sql3);
                    $stmt3->bindParam(':stock', $stock);
                    $stmt3->bindParam(':idProduct', $idProduct);

                    if ($stmt3->execute()) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return false;
        }
    }
}
?>