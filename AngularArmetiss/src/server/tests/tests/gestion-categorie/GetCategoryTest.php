<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class GetCategoryTest extends PHPUnit\Framework\TestCase
{
    /**
     * @depends AddCategoryTest::testAddCategory
     */
    public function testGetCategory()
    {
        $pdo = connect();
        $result = $this->getCategory($pdo);
        echo 'Result: ' . $result . PHP_EOL;
        $this->assertTrue($result);
    }

    private function getCategory($pdo)
    {
        $sql = "SELECT * FROM Category";

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