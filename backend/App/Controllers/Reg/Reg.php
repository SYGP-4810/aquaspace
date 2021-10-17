<?php

namespace App\Controllers\Reg;

use Core\View;


/**
 * admin controller
 *
 * 
 */
class Reg extends \Core\Controller
{
    protected function before()
    {
        // Make sure an admin user is logged in for example
        // return false;
    }

    public function addPostAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token'] . "' AND user_type='3'"));
        $result = $stmt->fetch();
        $id = $result['id'];
        $iName1 = "";
        $iName1 = microtime(true) . "." . $this->data['ex1'];
        $iDir1 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/inventory/" . $iName1;
        $flag1 = file_put_contents($iDir1, base64_decode($this->data['pic1']));

        $iName2 = "";
        $iName2 = microtime(true) . "." . $this->data['ex2'];
        $iDir2 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/inventory/" . $iName2;
        $flag2 = file_put_contents($iDir2, base64_decode($this->data['pic2']));

        $iName3 = "";
        $iName3 = microtime(true) . "." . $this->data['ex3'];
        $iDir3 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/inventory/" . $iName3;
        $flag3 = file_put_contents($iDir3, base64_decode($this->data['pic3']));

        $iName4 = "";
        $iName4 = microtime(true) . "." . $this->data['ex4'];
        $iDir4 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/inventory/" . $iName4;
        $flag4 = file_put_contents($iDir4, base64_decode($this->data['pic4']));

        if (!$flag1) {
            throw new \Exception("file didn't come to backend");
        }
        if (!$flag2) {
            throw new \Exception("file didn't come to backend");
        }
        if (!$flag3) {
            throw new \Exception("file didn't come to backend");
        }
        if (!$flag4) {
            throw new \Exception("file didn't come to backend");
        }

        View::response(["id"=> $id, "req"=>$this->data]);
        $dataToInsert = [
            "product_name" => $this->data['product_name'],
            "category" => $this->data['category'],
            "price" => $this->data['price'],
            "description" => $this->data['description'],
            "duration" => $this->data['duration'],
            "address" => $this->data['address'],
            "quantity" => $this->data['quantity'],
            "img1" => $iName1,
            "img2" => $iName2,
            "img3" => $iName3,
            "img4" => $iName4,
            "auth_id" => $id
        ];

        $this->exec($this->save('post', $dataToInsert));
    }
    // "product_name": product,
    // "duration": duration,
    // "description": description, 
    // "price":price ,
    // "address": address, 
    // "image":file,
    // "img1Extension": img1Extension

    public function getPostsAction() 
    {

    }

    public function getFishNamesAction()
    {
        $stmt = $this->execute($this->get('fish', " name"));
        View::response($stmt->fetchAll());
    }

    public function getFishDetailsAction()
    {
        $stmt = $this->execute($this->get('fish', "description", "name ='" . $this->data['name'] . "'"));
        View::response($stmt->fetch());
    }

    public function getAddressAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token'] . "' AND user_type='1'"));
        $result = $stmt->fetch();
        $id = $result['id'];
        $stmt = $this->execute($this->get('regular_user', "address",  "auth_id='" . $id. "'"));
        View::response($stmt->fetch());
    }
}