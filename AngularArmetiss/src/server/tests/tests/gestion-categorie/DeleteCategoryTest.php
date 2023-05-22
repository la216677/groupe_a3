<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class DeleteCategoryTest extends PHPUnit\Framework\TestCase
{
    /**
     * @depends AddCategoryTest::testAddCategory
     * @depends GetCategoryTest::testGetCategory
     * @depends GetCategoryByIdTest::testGetCategoryById
     * @depends UpdateCategoryTest::testUpdateCategory
     */
    public function testDeleteCategory()
    {
        $categoryId = 1; // Identifier la catégorie à supprimer

        $pdo = connect();
        $result = $this->deleteCategory($categoryId, $pdo);
        echo 'Result: ' . $result . PHP_EOL;

        $this->assertTrue($result);
    }

    private function deleteCategory($categoryId, $pdo)
    {
        $sql = "DELETE FROM Category WHERE ID_Category = :categoryId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':categoryId', $categoryId);

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