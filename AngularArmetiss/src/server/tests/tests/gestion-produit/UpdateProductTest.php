<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class UpdateProductTest extends PHPUnit\Framework\TestCase
{
    public function testUpdateProduct()
    {
        $pdo = connect();

        $productData = [
            'Id_Product' => '1',
            'Product_Name' => 'Product',
            'Product_Sale_Price_TVAC' => '100.0',
            'Id_TVA' => '1',
            'Product_Description' => 'Product Description',
            'Product_Image_URL' => 'image.jpg',
            'Product_Visibility' => '1',
            'Id_Category' => '1'
        ];

        $postdata = json_encode($productData);
        $result = $this->updateProduct($postdata, $pdo);

        echo 'Result: ' . $result . PHP_EOL;

        $this->assertTrue($result);
    }

    private function updateProduct($postdata, $pdo)
    {
        $request = json_decode($postdata);

        $stmt = $pdo->prepare("UPDATE Product SET
            Product_Name = :product_Name,
            Product_Sale_Price_HTVA = :product_Sale_Price_HTVA,
            Product_Sale_Price_TVAC = :product_Sale_Price_TVAC,
            Product_Description = :product_Description,
            Product_Image_URL = :product_Image_URL,
            Product_Visibility = :product_Visibility,
            Id_TVA = :id_TVA,
            Id_Category = :id_Category
            WHERE Id_Product = :product_ID");

        $stmt->bindParam(':product_Name', $request->Product_Name);
        $stmt->bindParam(':product_Sale_Price_HTVA', $request->Product_Sale_Price_HTVA);
        $stmt->bindParam(':product_Sale_Price_TVAC', $request->Product_Sale_Price_TVAC);
        $stmt->bindParam(':product_Description', $request->Product_Description);
        $stmt->bindParam(':product_Image_URL', $request->Product_Image_URL);
        $stmt->bindParam(':product_Visibility', $request->Product_Visibility);
        $stmt->bindParam(':id_TVA', $request->Id_TVA);
        $stmt->bindParam(':id_Category', $request->Id_Category);
        $stmt->bindParam(':product_ID', $request->Id_Product);

        try {
            $stmt->execute();
            $rowCount = $stmt->rowCount();
            return $rowCount > 0;
        } catch (PDOException $e) {
            return false;
        }
    }
}