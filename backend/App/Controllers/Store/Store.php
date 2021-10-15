<?php

namespace App\Controllers\Store;

use Core\View;


/**
 * User Store controller
 * just a sample of controller
 *
 * 
 */
class Store extends \Core\Controller
{

    protected function before()
    {
        // Make sure an admin user is logged in for example
        // return false;
    }

    public function addInventoryAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token = '". $_COOKIE['access_token'] ."' AND user_type='3'"));  
        $result = $stmt->fetch();
        $id = $result['id'];
        
        $qName = "";
        $qName = round(microtime(true) * 1000) . "." . $this->data['exen1'];
        $qDir = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/inventory/" . $qName;
        $flag = file_put_contents($qDir, base64_decode($this->data['pic1']));
        
        if (!$flag){
            throw new \Exception("file didn't come to backend");
        }else {
            $DataToInsert = [
                "product_name" => $this->data['productName'],
                "product_category" => $this->data['productCategory'],
                "price" => $this->data['price'],
                "quantity" => $this->data['quantity'],
                "details" => $this->data['details'],
                "delivery_mode" => $this->data['deliveryMode'],
                "auth_id" => $id,
                "pic1" => $qName
            ];
            $this->exec($this->save('inventory',$DataToInsert));
            $stmt = $this->execute($this->get('inventory', "id", "pic1='" . $qName . "'"));
            View::response($stmt->fetch());
        }
    
        
    }  
    
    // public function addInventoryPicAction(){
    //     View::response($this->data);
    //     $qName = "";
    //     $qName = round(microtime(true) * 1000) . "." . $this->data['exen2'];
    //     $qDir = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/inventory/" . $qName;
    //     $flag = file_put_contents($qDir, base64_decode($this->data['pic2']));
        
    //     if (!$flag){
    //         throw new \Exception("file didn't come to backend");
    //     }else {
    //         $DataToUpdate = [
    //             "pic2" => $qName
    //         ];
    //         // $this->exec($this->update('inventory', $DataToUpdate, "id='" . $this->data['id'] . "'"));
            
    //     }
    // }
}