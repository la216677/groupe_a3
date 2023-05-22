<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class AddCategoryTest extends PHPUnit\Framework\TestCase
{
    public function testAddCategory()
    {
        $categoryData = [
            'ID_Category' => '1',
            'Category_Name' => 'Test Category',
            'Category_Description' => 'Test Description',
            'Category_Image_URL' => 'test-image.jpg',
            'Category_Visibility' => '1'
        ];

        $postdata = json_encode($categoryData);
        $pdo = connect();
        $result = $this->addCategory($postdata,$pdo);

        echo 'Result: ' . $result . PHP_EOL;
    
        $this->assertTrue($result); // On vérifie si la requete a été executé
        
        // On vérifie les données qui ont été inséré
        $insertedCategory = $this->getInsertedCategory($categoryData['ID_Category'], $pdo);
        $this->assertEquals($categoryData['ID_Category'], $insertedCategory['ID_Category']);
        $this->assertEquals($categoryData['Category_Name'], $insertedCategory['Category_Name']);
        $this->assertEquals($categoryData['Category_Description'], $insertedCategory['Category_Description']);
        $this->assertEquals($categoryData['Category_Image_URL'], $insertedCategory['Category_Image_URL']);
        $this->assertEquals($categoryData['Category_Visibility'], $insertedCategory['Category_Visibility']);
    }

    private function addCategory($postdata,$pdo)
    {
        $request = json_decode($postdata);

        $id_Category = trim($request->ID_Category);
        $category_Name = trim($request->Category_Name);
        $category_Description = trim($request->Category_Description);
        $category_Image_URL = trim($request->Category_Image_URL);
        $category_Visibility = trim($request->Category_Visibility);

        $sql = "INSERT INTO Category(ID_Category, Category_Name,Category_Description,Category_Image_URL,Category_Visibility)
            VALUES (:ID_Category, :category_Name, :category_Description, :category_Image_URL, :category_Visibility)";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':ID_Category', $id_Category);
        $stmt->bindParam(':category_Name', $category_Name);
        $stmt->bindParam(':category_Description', $category_Description);
        $stmt->bindParam(':category_Image_URL', $category_Image_URL);
        $stmt->bindParam(':category_Visibility', $category_Visibility);

        try {
            $stmt->execute();
            $rowCount = $stmt->rowCount();
            return $rowCount>0;
        } catch (PDOException $e) {
            return false;
        }
    }

    private function getInsertedCategory($categoryId, $pdo)
    {
        $sql = "SELECT * FROM Category WHERE ID_Category = :categoryId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':categoryId', $categoryId);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>