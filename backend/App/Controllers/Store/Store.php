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
        // $stmt = $this->execute($this->get('user_auth', '*', " access_token='" . $_COOKIE['access_token']) . "' AND user_type='3'");
        // if ($stmt->rowCount == 1) {
        //     $this->params['id'] = $stmt->fetch()['id'];
        //     return true;
        // }
        // return false;
    }

    public function addInventoryAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token']) . "'");
        $result = $stmt->fetch();
        $id = $result['id'];
        $iName1 = "";
        $iName1 = microtime(true) . "." . $this->data['exen1'];
        $iDir1 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/inventory/" . $iName1;
        $flag1 = file_put_contents($iDir1, base64_decode($this->data['pic1']));

        $iName2 = "";
        $iName2 = microtime(true) . "." . $this->data['exen2'];
        $iDir2 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/inventory/" . $iName2;
        $flag2 = file_put_contents($iDir2, base64_decode($this->data['pic2']));

        $iName3 = "";
        $iName3 = microtime(true) . "." . $this->data['exen3'];
        $iDir3 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/inventory/" . $iName3;
        $flag3 = file_put_contents($iDir3, base64_decode($this->data['pic3']));

        $iName4 = "";
        $iName4 = microtime(true) . "." . $this->data['exen4'];
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

        View::response(["id" => $id, "req" => $this->data]);
        $DataToInsert = [
            "product_name" => $this->data['productName'],
            "product_category" => $this->data['productCategory'],
            "price" => $this->data['price'],
            "quantity" => $this->data['quantity'],
            "details" => $this->data['details'],
            "delivery_mode" => $this->data['deliveryMode'],
            "auth_id" => $id,
            "pic1" => $iName1,
            "pic2" => $iName2,
            "pic3" => $iName3,
            "pic4" => $iName4
        ];
        $this->exec($this->save('inventory', $DataToInsert));
    }

    public function checkDeliveryOptionAction()
    {
        $this->params['id'];
        $stmt = $this->execute($this->get('store', '*', 'auth_id=' . $this->params['id'] . "'"));
        $result = $stmt->fetch();
        $delMOd = $result['del_mod'];
        //View::response();
    }

    public function getStoreProfileAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token ='" . $_COOKIE['access_token'] . "'"));
        $result1 = $stmt->fetch();
        $id = $result1['id'];
        $stmt = $this->execute($this->get('store', "*", "auth_id ='" . $id . "'"));
        $result2 = $stmt->fetch();
        $res = [
            "SName" => $result2['company_name'],
            "RegNo" => $result2['registration_num'],
            "tp" => $result1['tp'],
            "city" => $result2['city'],
            "address" => $result2['address'],
            "OwnerName" => $result2['man_name'],
            "OwnerNIC" => $result2['man_nic'],
        ];
        View::response($res);
    }
}