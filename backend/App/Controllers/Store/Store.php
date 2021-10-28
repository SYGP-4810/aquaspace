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
        $stmt = $this->execute($this->get('user_auth', "*", "access_token ='" . $_COOKIE['access_token'] . "'" . " AND user_type='3'"));
        $result = $stmt->fetch();
        $id = $result['id'];
        $stmt = $this->execute($this->get('store', "*", "auth_id ='" . $id . "'"));
        $result = $stmt->fetch();
        $address = $result['address'];

        $iName1 = "";
        $iName1 = microtime(true) . "." . $this->data['exen1'];
        $iDir1 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName1;
        $flag1 = file_put_contents($iDir1, base64_decode($this->data['pic1']));

        $iName2 = "";
        $iName2 = microtime(true) . "." . $this->data['exen2'];
        $iDir2 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName2;
        $flag2 = file_put_contents($iDir2, base64_decode($this->data['pic2']));

        $iName3 = "";
        $iName3 = microtime(true) . "." . $this->data['exen3'];
        $iDir3 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName3;
        $flag3 = file_put_contents($iDir3, base64_decode($this->data['pic3']));

        $iName4 = "";
        $iName4 = microtime(true) . "." . $this->data['exen4'];
        $iDir4 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName4;
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

        $date = date('Y-m-d H:i:s');
        $DataToInsert = [
            "product_name" => $this->data['Name'],
            "category" => $this->data['Category'],
            "price" => $this->data['price'],
            "quantity" => $this->data['quantity'],
            "description" => $this->data['details'],
            "delivery" => $this->data['deliveryMode'],
            "height" => $this->data['height'],
            "width" => $this->data['width'],
            "length" => $this->data['length'],
            "weight" => $this->data['weight'],
            "capacity" => $this->data['capacity'],
            "auth_id" => $id,
            "img1" => $iName1,
            "img2" => $iName2,
            "img3" => $iName3,
            "img4" => $iName4,
            "created_date" => $date,
            "status" => "1",
            "type" => $this->data['type'],
            "address" => $address,
        ];
        // View::response($DataToInsert);
        $this->exec($this->save('products', $DataToInsert));
        View::response("success");
    }

    public function checkDeliveryOptionAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token ='" . $_COOKIE['access_token'] . "'" . " AND user_type='3'"));
        $result = $stmt->fetch();
        $id = $result['id'];
        $stmt = $this->execute($this->get('store', 'del_mode', "auth_id='" . $id . "'"));
        $delMOd = $stmt->fetch();
        View::response($delMOd);
    }

    public function getInventoryAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token ='" . $_COOKIE['access_token'] . "'" . " AND user_type='3'"));
        $result = $stmt->fetch();
        $id = $result['id'];
        $stmt = $this->execute($this->get('productS', "*", "auth_id ='" . $id . "'"));
        $result = $stmt->fetchAll();
        View::response($result);
    }

    public function editInventoryAction()
    {
        $stmt = $this->execute($this->get('productS', "*", "id='" . $this->data['id'] . "'"));
        $result = $stmt->fetch();

        View::response($result);
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
            "profilePic" => $result1['profile_img'],
            "delMode" => $result2['del_mode'],
            "lat" => $result2['lat'],
            "lan" => $result2['lan']
        ];
        View::response($res);
    }

    public function getStoreFrontAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token ='" . $_COOKIE['access_token'] . "'"));
        $result1 = $stmt->fetch();
        $id = $result1['id'];
        $stmt = $this->execute($this->get('store', "*", "auth_id ='" . $id . "'"));
        $result2 = $stmt->fetch();
        $res = [
            "SName" => $result2['company_name'],
            "address" => $result2['address'],
            "profilePic" => $result1['profile_img'],
            "coverPic" => $result2['cover_img'],
            "date" => $result1['create_date'],
            "about" => $result2['about']
        ];
        View::response($res);
    }

    public function deleteProductAction()
    {
        $result = $this->execute($this->get('products', '*', "id='" . $this->data['id'] . "'"))->fetch();
        if (file_exists("/aquaspace/frontend/images/product/" . $result['img1']))
            unlink("/aquaspace/frontend/images/product/" . $result['img1']);
        if (file_exists("/aquaspace/frontend/images/product/" . $result['img2']))
            unlink("/aquaspace/frontend/images/product/" . $result['img2']);
        if (file_exists("/aquaspace/frontend/images/product/" . $result['img3']))
            unlink("/aquaspace/frontend/images/product/" . $result['img3']);
        if (file_exists("/aquaspace/frontend/images/product/" . $result['img4']))
            unlink("/aquaspace/frontend/images/product/" . $result['img4']);
        $this->exec($this->delete('products', "id='" . $this->data['id'] . "'"));
        View::response("successfully deleted product");
    }
}