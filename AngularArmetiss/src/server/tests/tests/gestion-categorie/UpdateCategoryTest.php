<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class UpdateCategoryTest extends PHPUnit\Framework\TestCase
{
    /**
     * @depends AddCategoryTest::testAddCategory
     */
    public function testUpdateCategory()
    {
        $categoryData = [
            'ID_Category' => '1',
            'Category_Name' => 'Test',
            'Category_Description' => 'Test',
            'Category_Visibility' => '1'
        ];

        $postdata = json_encode($categoryData);
        $pdo = connect();
        $result = $this->updateCategory($postdata,$pdo);
        
        echo 'Result: ' . $result . PHP_EOL;
    
        $this->assertTrue($result);
    }


    private function updateCategory($postdata, $pdo){
        $request = json_decode($postdata);

        $id_Category = trim($request->ID_Category);
        $category_Name = trim($request->Category_Name);
        $category_Description = trim($request->Category_Description);
        $category_Visibility = trim($request->Category_Visibility);

        $sql = "UPDATE Category SET
            Category_Name = :category_Name,
            Category_Description = :category_Description,
            Category_Visibility = :category_Visibility
          WHERE ID_Category = :id_Category";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam("category_Name",$category_Name);
        $stmt->bindParam("category_Description",$category_Description);
        $stmt->bindParam("category_Visibility",$category_Visibility);
        $stmt->bindParam("id_Category",$id_Category);
        
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