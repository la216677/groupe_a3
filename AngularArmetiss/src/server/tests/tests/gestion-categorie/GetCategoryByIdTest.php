<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class GetCategoryByIdTest extends PHPUnit\Framework\TestCase
{
    /**
     * @depends AddCategoryTest::testAddCategory
     */

    public function testGetCategoryById()
    {
        $categoryId = 1;

        $pdo = connect();
        $result = $this->getCategoryById($categoryId, $pdo);
        echo 'Result: ' . $result . PHP_EOL;
        $this->assertTrue($result);
    }

    private function getCategoryById($categoryId, $pdo)
    {
        $sql = "SELECT * FROM Category WHERE ID_Category = :categoryId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':categoryId', $categoryId);

        try{
            $stmt->execute();
            $rowCount = $stmt->rowCount();
            return $rowCount > 0;
        }catch (PDOException $e){
            return false;
        }

    }
}

?>