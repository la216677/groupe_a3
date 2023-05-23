<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class DeleteDataTest extends PHPUnit\Framework\TestCase
{
    /**
     * @depends AddStockTest::testAddStock
     * @depends GetStockTest::testGetStock
     * @depends UpdateStockQuantityTest::testUpdateStockQuantity
     */
    public function testDeleteDataTest(){
        $pdo = connect();
        $tables = ['stock', 'product', 'tva', 'category'];

        $result=$this->deleteDataTest($tables, $pdo);
        $this->assertTrue($result);
    }

    public function deleteDataTest($tables, $pdo)
    {
        try {
            foreach ($tables as $table) {
                $sql = "DELETE FROM $table";
                $pdo->exec($sql);
            }
            
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }
}
?>