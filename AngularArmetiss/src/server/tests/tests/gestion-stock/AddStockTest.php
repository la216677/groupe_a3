<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class AddStockTest extends PHPUnit\Framework\TestCase
{
    public function testAddStock(){
        $pdo = connect();

        $stockData = [
            'Id_Stock' => '1',
            'Stock_Quantity' => '40',
            'Stock_Date' => '2023-05-23',
            'Stock_Purchase_Price_TVAC' => '40',
            'Id_Product' => '1',
            'Stock_provider' => 'Moi'
        ];

        $this->insertCategory($pdo);
        $this->insertTva($pdo);
        $this->insertProduct($pdo);
        
        $postdata = json_encode($stockData);
        $result = $this->insertStock($postdata,$pdo);

        echo 'Result: ' . ($result ? 'true' : 'false') . PHP_EOL;

        $this->assertTrue($result);
    }

    private function insertStock($postdata, $pdo){
        
        $request = json_decode($postdata);

        $sql = "INSERT INTO Stock(Id_Stock, Stock_Quantity, Stock_Date, Stock_Purchase_Price_HTVA, Stock_Purchase_Price_TVAC, Id_Product, Stock_Provider)
                VALUES (:stockId, :quantity, :purchaseDate, :priceHtva, :priceTva, :id, :provider)";
    
        $stmt = $pdo->prepare($sql);

        $tva_rateFloat="0.21";
        $prixTva = $request->Stock_Purchase_Price_TVAC * $request->Stock_Quantity;
        $prixHtva = $prixTva / (1+$tva_rateFloat);

        $stmt->bindParam(':stockId', $request->Id_Stock);
        $stmt->bindParam(':quantity', $request->Stock_Quantity);
        $stmt->bindParam(':purchaseDate', $request->Stock_Date);
        $stmt->bindParam(':priceHtva', $prixHtva);
        $stmt->bindParam(':priceTva', $prixTva);
        $stmt->bindParam(':id', $request->Id_Product);
        $stmt->bindParam(':provider', $request->Stock_Provider);

        try{
            $stmt->execute();
            $rowCount = $stmt->rowCount();
            return $rowCount > 0;
        }catch (PDOException $e){
            $errorMessage = $e->getMessage();
            return false;
        }
        
    }

    private function insertProduct($pdo){
        $productData = [
            'Id_Product' => '1',
            'Product_Name' => 'Product Name',
            'Product_Sale_Price_TVAC' => '100.0',
            'Id_TVA' => '1',
            'Product_Description' => 'Product Description',
            'Product_Image_URL' => 'image.jpg',
            'Product_Visibility' => '1',
            'Id_Category' => '1'
        ];

        $sql = "INSERT INTO Product(Id_Product, Product_Name, Product_Sale_Price_HTVA, Product_Sale_Price_TVAC, Product_Description, Product_Quantity, Product_Visibility, Id_TVA, Id_Category, Product_Image_URL) VALUES (:productId, :product_Name, :product_Sale_Price_HTVA, :product_Sale_Price_TVAC, :product_Description, :product_Quantity, :product_Visibility, :id_TVA, :id_Category, :product_Image_URL)";

        $tva_rateFloat="0.21";
        $product_Sale_Price_HTVA = ($productData['Product_Sale_Price_TVAC'] / (1+$tva_rateFloat));
        $product_Quantity = 0;

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':productId', $productData['Id_Product']);
        $stmt->bindParam(':product_Name', $productData['Product_Name']);
        $stmt->bindParam(':product_Sale_Price_HTVA', $product_Sale_Price_HTVA);
        $stmt->bindParam(':product_Sale_Price_TVAC', $productData['Product_Sale_Price_TVAC']);
        $stmt->bindParam(':product_Description', $productData['Product_Description']);
        $stmt->bindParam(':product_Quantity', $product_Quantity);
        $stmt->bindParam(':product_Visibility', $productData['Product_Visibility']);
        $stmt->bindParam(':id_TVA', $productData['Id_TVA']);
        $stmt->bindParam(':id_Category', $productData['Id_Category']);
        $stmt->bindParam(':product_Image_URL', $productData['Product_Image_URL'], PDO::PARAM_NULL);
        $stmt->execute();
        return true;
    }
    private function insertTva($pdo){
        $tvaData = [
            'ID_TVA' => '1',
            'TVA_Rate' => '0.21',
            'TVA_Rate_Name' => 'Product'
        ];

        $sql = "INSERT INTO Tva(ID_TVA,TVA_Rate,TVA_Rate_Name) VALUES (:ID_TVA,:TVA_Rate,:TVA_Rate_Name)";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':ID_TVA', $tvaData['ID_TVA']);
        $stmt->bindParam(':TVA_Rate', $tvaData['TVA_Rate']);
        $stmt->bindParam(':TVA_Rate_Name', $tvaData['TVA_Rate_Name']);
        $stmt->execute();
        return true;
    }

    private function insertCategory($pdo){
        $categoryData = [
            'ID_Category' => '1',
            'Category_Name' => 'Test Category',
            'Category_Description' => 'Test Description',
            'Category_Image_URL' => 'test-image.jpg',
            'Category_Visibility' => '1'
        ];

        $sql = "INSERT INTO Category(ID_Category, Category_Name,Category_Description,Category_Image_URL,Category_Visibility)
            VALUES (:ID_Category, :category_Name, :category_Description, :category_Image_URL, :category_Visibility)";

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':ID_Category', $categoryData['ID_Category']);
        $stmt->bindParam(':category_Name', $categoryData['Category_Name']);
        $stmt->bindParam(':category_Description', $categoryData['Category_Description']);
        $stmt->bindParam(':category_Image_URL', $categoryData['Category_Image_URL']);
        $stmt->bindParam(':category_Visibility', $categoryData['Category_Visibility']);
        $stmt->execute();
        return true;
    }
}
?>