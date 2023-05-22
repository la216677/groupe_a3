<?php

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../../database.php';

class CheckEmailTest extends PHPUnit\Framework\TestCase
{
    /**
     * @depends AddClientTest::testAddClient
     */
    public function testCheckEmail()
    {
        $email = 'john.doe@example.com';

        $pdo = connect();
        $result = $this->checkEmail($email, $pdo);

        echo 'Result: ' . $result . PHP_EOL;

        $this->assertTrue($result);

        $nonExistentEmail = 'nonexistent@example.com';
        $result = $this->checkEmail($nonExistentEmail, $pdo);

        $this->assertFalse($result);
    }

    private function checkEmail($email, $pdo)
    {
        $sql = "SELECT COUNT(*) AS count FROM Client WHERE Client_Email=:email";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':email', $email);

        try{
            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $count = $row["count"];

            return $count > 0;
        }catch(PDOException $e){
            return false;
        }
    }
}

?>