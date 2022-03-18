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
        $lat = $result['lat'];
        $lang = $result['lan'];

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
            "lat" => $lat,
            "lan" => $lang
        ];

        $sql = "SELECT COUNT(products.id) AS ads FROM products,subscription WHERE products.auth_id=" .$id. " AND subscription.auth_id=products.auth_id AND subscription.date_from <= products.created_date AND subscription.date_to >= products.created_date";
        $stmt = $this->execute($sql);
        $result2 = $stmt->fetch();
        $countAds = $result2['ads'];

        $stmt = $this->execute($this->get('subscription', "*", "auth_id ='" . $id . "' AND date_to >= CURDATE() ORDER BY id DESC",1));
        $result3 = $stmt->fetch();
        $maxAds = 0;
        $maxAdsNum =  $result3['sub_type'];
        if ($maxAdsNum == 1){
            $maxAds = 100;
        }else if($maxAdsNum == 2){
            $maxAds = 200;
        }
        else if($maxAdsNum == 3){
            $maxAds = 500;
        }
        else if($maxAdsNum == 4){
            $maxAds = 1000;
        }
        else if($maxAdsNum == 5){
            $maxAds = 5000;
        }else{
            $responce = ["flag" => 1,
                        "msg" => "haven't valide subscription"];
                        //havent validate subscription 
            View::response($responce);
            return;
        }

        if($countAds < $maxAds){
            $this->exec($this->save('products', $DataToInsert));
            $responce = ["flag" => 0,
                        "msg" => "success"];
        }else{
            $responce = ["flag" => 2,
                        "msg" => "haven't valide subscription"];
        }
        View::response($responce);
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

    
    public function getEditInventoryAction()
    {
        $stmt = $this->execute($this->get('products', "*", "id='" . $this->data['id'] . "'"));
        $result = $stmt->fetch();

        View::response($result);
    }

    //edit inventory items
    public function editInventoryAction()
    {
        $updateData = [
            "product_name" => $this->data['Name'],
            "price" => $this->data['price'],
            "quantity" => $this->data['quantity'],
            "description" => $this->data['details'],
            "delivery" => $this->data['deliveryMode'],
            "height" => $this->data['height'],
            "width" => $this->data['width'],
            "length" => $this->data['length'],
            "weight" => $this->data['weight'],
            "capacity" => $this->data['capacity'],
            "status" => $this->data['status']
        ];

        if($this->data['flag1'] == true){
            $iName1 = "";
            $iName1 = microtime(true) . "." . $this->data['exen1'];
            $iDir1 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName1;
            $flag1 = file_put_contents($iDir1, base64_decode($this->data['pic1']));
            if (!$flag1) {
                throw new \Exception("file didn't come to backend");
            }
            $updateData["img1"] = $iName1;
        }
        if($this->data['flag2'] == true){
            $iName2 = "";
            $iName2 = microtime(true) . "." . $this->data['exen2'];
            $iDir2 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName2;
            $flag2 = file_put_contents($iDir2, base64_decode($this->data['pic2']));
            if (!$flag2) {
                throw new \Exception("file didn't come to backend");
            }
            $updateData["img2"] = $iName2;
        }
        if($this->data['flag3'] == true){
            $iName3 = "";
            $iName3 = microtime(true) . "." . $this->data['exen3'];
            $iDir3 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName3;
            $flag3 = file_put_contents($iDir3, base64_decode($this->data['pic3']));
            if (!$flag3) {
                throw new \Exception("file didn't come to backend");
            }
            $updateData["img3"] = $iName3;
        }
        if($this->data['flag4'] == true){
            $iName4 = "";
            $iName4 = microtime(true) . "." . $this->data['exen4'];
            $iDir4 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName4;
            $flag4 = file_put_contents($iDir4, base64_decode($this->data['pic4']));
            if (!$flag4) {
                throw new \Exception("file didn't come to backend");
            }
            $updateData["img4"] = $iName4;
        }
        
            $this->exec($this->update('products', $updateData, "id='" . $this->data['id'] . "'"));        
            View::response("success");
    }

    //ready store details and delivery rates
    public function getStoreProfileAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token ='" . $_COOKIE['access_token'] . "'"));
        $result1 = $stmt->fetch();
        $id = $result1['id'];
        $stmt = $this->execute($this->get('store', "*", "auth_id ='" . $id . "'"));
        $result2 = $stmt->fetch();
        $stmt = $this->execute($this->get('subscription', "*", "auth_id ='" . $id . "' AND date_to >= CURDATE() ORDER BY id DESC",1));
        $result3 = $stmt->fetch();
        $stmt = $this->execute($this->get('delivery_cost', "*", "auth_id ='" . $id . "'"));
        $result4 = $stmt->fetch();
        
        if(!$result4){
            $data = [
                "auth_id" => $id, 
                "type" => 1,
                "range_km" => 1,
                "one_kg" => 0,
                "additional_one_kg" => 0,
        ];
            $this->exec($this->save('delivery_cost',$data));

            $data = [
                "auth_id" => $id, 
                "type" => 1,
                "range_km" => 2,
                "one_kg" => 0,
                "additional_one_kg" => 0,
        ];
            $this->exec($this->save('delivery_cost',$data));

            $data = [
                "auth_id" => $id, 
                "type" => 1,
                "range_km" => 3,
                "one_kg" => 0,
                "additional_one_kg" => 0,
        ];
            $this->exec($this->save('delivery_cost',$data));

            $data = [
                "auth_id" => $id, 
                "type" => 1,
                "range_km" => 4,
                "one_kg" => 0,
                "additional_one_kg" => 0,
        ];
            $this->exec($this->save('delivery_cost',$data));

            $data = [
                "auth_id" => $id, 
                "type" => 2,
                "range_km" => 1,
                "one_kg" => 0,
                "additional_one_kg" => 0,
        ];
            $this->exec($this->save('delivery_cost',$data));

            $data = [
                "auth_id" => $id, 
                "type" => 2,
                "range_km" => 2,
                "one_kg" => 0,
                "additional_one_kg" => 0,
        ];
            $this->exec($this->save('delivery_cost',$data));

            $data = [
                "auth_id" => $id, 
                "type" => 2,
                "range_km" => 3,
                "one_kg" => 0,
                "additional_one_kg" => 0,
        ];
            $this->exec($this->save('delivery_cost',$data));

            $data = [
                "auth_id" => $id, 
                "type" => 2,
                "range_km" => 4,
                "one_kg" => 0,
                "additional_one_kg" => 0,
        ];
            $this->exec($this->save('delivery_cost',$data));
            $data = [
                "auth_id" => $id, 
                "type" => 3,
                "range_km" => 1,
                "one_kg" => 0,
                "additional_one_kg" => 0,
        ];
            $this->exec($this->save('delivery_cost',$data));

            $data = [
                "auth_id" => $id, 
                "type" => 3,
                "range_km" => 2,
                "one_kg" => 0,
                "additional_one_kg" => 0,
        ];
            $this->exec($this->save('delivery_cost',$data));

            $data = [
                "auth_id" => $id, 
                "type" => 3,
                "range_km" => 3,
                "one_kg" => 0,
                "additional_one_kg" => 0,
        ];
            $this->exec($this->save('delivery_cost',$data));

            $data = [
                "auth_id" => $id, 
                "type" => 3,
                "range_km" => 4,
                "one_kg" => 0,
                "additional_one_kg" => 0,
        ];
            $this->exec($this->save('delivery_cost',$data));

            $data = [
                "auth_id" => $id, 
                "type" => 4,
                "range_km" => 1,
                "one_kg" => 0,
                "additional_one_kg" => 0,
        ];
            $this->exec($this->save('delivery_cost',$data));

            $data = [
                "auth_id" => $id, 
                "type" => 4,
                "range_km" => 2,
                "one_kg" => 0,
                "additional_one_kg" => 0,
        ];
            $this->exec($this->save('delivery_cost',$data));

            $data = [
                "auth_id" => $id, 
                "type" => 4,
                "range_km" => 3,
                "one_kg" => 0,
                "additional_one_kg" => 0,
        ];
            $this->exec($this->save('delivery_cost',$data));

            $data = [
                "auth_id" => $id, 
                "type" => 4,
                "range_km" => 4,
                "one_kg" => 0,
                "additional_one_kg" => 0,
        ];
            $this->exec($this->save('delivery_cost',$data));
            
        }

        $stmt = $this->execute($this->get('delivery_cost', "*", "auth_id ='" . $id . "'"));
        $result4 = $stmt->fetchAll();

        if($result3){
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
                "lan" => $result2['lan'],
                "subscriptionFlag" => 1,
                "subType" => $result3['sub_type'],
                "dateTo" => $result3['date_to'],
                "delivery" => $result4,
                
            ] ;
        } else{
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
                "lan" => $result2['lan'],
                "subscriptionFlag" => 0,
                "delivery" => $result4,
            ] ;
        }
        
        View::response($res);
    }

    //edit store details and delivery rates
    public function editStoreAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token ='" . $_COOKIE['access_token'] . "'"));
        $result1 = $stmt->fetch();
        $id = $result1['id'];

        if($this->data['imageFlag'] == 1){
            $iName = "";
            $iName = microtime(true) . "." . $this->data['exen'];
            $iDir = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/profile/" . $iName;
            $flag = file_put_contents($iDir, base64_decode($this->data['profilePic']));

            if (!$flag) {
                 new \Exception("file didn't come to backend");
            }

            $updateData = [
                "profile_img" => $iName
            ];        
            $this->exec($this->update('user_auth' , $updateData , "id='" . $id . "'"));
        }

        $updateStore = [
            "company_name" => $this->data['sname'],
            "registration_num" => $this->data['regno'],
            "city" => $this->data['city'],
            "address" => $this->data['address'],
            "man_name" => $this->data['oname'],
            "man_nic" => $this->data['onic'],
            "lat" => $this->data['lat'],
            "lan" => $this->data['lang'],
            "del_mode" => $this->data['deliveryMode'],
            
        ];
        $this->exec($this->update('store' , $updateStore , "auth_id='" . $id . "'"));

        $updateAuth = [
            "tp" => $this->data['tp']
        ];
        $this->exec($this->update('user_auth' , $updateAuth , "id='" . $id . "'")); 

        $updateDel = [ 
            "one_kg" => $this->data['inOneFish'],
            "additional_one_kg" => $this->data['inOneAddFish'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 1 AND range_km = 1"));

        $updateDel = [ 
            "one_kg" => $this->data['inTwoFish'],
            "additional_one_kg" => $this->data['inTwoAddFish'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 1 AND range_km = 2"));

        $updateDel = [ 
            "one_kg" => $this->data['inThreeFish'],
            "additional_one_kg" => $this->data['inThreeAddFish'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 1 AND range_km = 3"));

        $updateDel = [ 
            "one_kg" => $this->data['inFourFish'],
            "additional_one_kg" => $this->data['inFourAddFish'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 1 AND range_km = 4"));

        $updateDel = [ 
            "one_kg" => $this->data['outOneFish'],
            "additional_one_kg" => $this->data['outOneAddFish'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 2 AND range_km = 1"));

        $updateDel = [ 
            "one_kg" => $this->data['outTwoFish'],
            "additional_one_kg" => $this->data['outTwoAddFish'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 2 AND range_km = 2"));

        $updateDel = [ 
            "one_kg" => $this->data['outThreeFish'],
            "additional_one_kg" => $this->data['outThreeAddFish'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 2 AND range_km = 3"));

        $updateDel = [ 
            "one_kg" => $this->data['outFourFish'],
            "additional_one_kg" => $this->data['outFourAddFish'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 2 AND range_km = 4"));

        $updateDel = [ 
            "one_kg" => $this->data['inOneEquipment'],
            "additional_one_kg" => $this->data['inOneAddEquipment'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 3 AND range_km = 1"));

        $updateDel = [ 
            "one_kg" => $this->data['inTwoEquipment'],
            "additional_one_kg" => $this->data['inTwoAddEquipment'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 3 AND range_km = 2"));

        $updateDel = [ 
            "one_kg" => $this->data['inThreeEquipment'],
            "additional_one_kg" => $this->data['inThreeAddEquipment'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 3 AND range_km = 3"));

        $updateDel = [ 
            "one_kg" => $this->data['inFourEquipment'],
            "additional_one_kg" => $this->data['inFourAddEquipment'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 3 AND range_km = 4"));

        $updateDel = [ 
            "one_kg" => $this->data['outOneEquipment'],
            "additional_one_kg" => $this->data['outOneAddEquipment'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 4 AND range_km = 1"));

        $updateDel = [ 
            "one_kg" => $this->data['outTwoEquipment'],
            "additional_one_kg" => $this->data['outTwoAddEquipment'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 4 AND range_km = 2"));

        $updateDel = [ 
            "one_kg" => $this->data['outThreeEquipment'],
            "additional_one_kg" => $this->data['outThreeAddEquipment'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 4 AND range_km = 3"));

        $updateDel = [ 
            "one_kg" => $this->data['outFourEquipment'],
            "additional_one_kg" => $this->data['outFourAddEquipment'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 4 AND range_km = 4"));

        View::response("success");
    
    }

    //store front store details 
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

    //save store item sell or not
    public function saveStoreFrontAction()
    {        
        foreach ($this->data['active'] as $pid) {
            $updateProduct = [
                "status" => 1                
            ];
            $this->exec($this->update('products', $updateProduct, "id='" . $pid . "'"));
        };

        foreach ($this->data['deactive'] as $pid) {
            $updateProduct = [
                "status" => 2                
            ];
            $this->exec($this->update('products', $updateProduct, "id='" . $pid . "'"));
        };

        View::response("success");
    }

    //sotre front edit
    public function editStoreFrontAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token ='" . $_COOKIE['access_token'] . "'"));
        $result1 = $stmt->fetch();
        $id = $result1['id'];
        
        $updateData = [
            "about" => $this->data['about']
        ];

        $this->exec($this->update('store', $updateData, "auth_id ='" . $id . "'"));  

        if($this->data['bgImgFlag'] == 1){
            $iName = "";
            $iName = microtime(true) . "." . $this->data['extn1'];
            $iDir = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/profile/" . $iName;
            $flag = file_put_contents($iDir, base64_decode($this->data['bgImage']));

            if (!$flag) {
                new \Exception("file didn't come to backend");
            }

            $updateData = [
                "cover_img" => $iName
            ];        
            $this->exec($this->update('store' , $updateData , "auth_id ='" . $id . "'"));
        }

        if($this->data['profileImgFlag'] == 1){
            
            $iName = "";
            $iName = microtime(true) . "." . $this->data['extn2'];
            $iDir = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/profile/" . $iName;
            $flag = file_put_contents($iDir, base64_decode($this->data['profileImage']));

            if (!$flag) {
                new \Exception("file didn't come to backend");
            }

            $updateData = [
                "profile_img" => $iName
            ];
              
            $this->exec($this->update('user_auth' , $updateData , "id ='" . $id . "'"));
        }

              
        View::response("success");
    }

    //disabe all the items from store
    public function disableStoreFrontAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token ='" . $_COOKIE['access_token'] . "'"));
        $result1 = $stmt->fetch();
        $id = $result1['id'];
        
        $updateData = [
            "status" => 2
        ];

        $this->exec($this->update('products', $updateData, "auth_id ='" . $id . "' AND status = 1"  ));  
              
        View::response("success");
    }


    //delete inventory items -not
    public function deleteProductAction()
    {
        $updateData = [
            "status" => 5
        ];
        $this->exec($this->update('products', $updateData, "id ='" . $this->data['id'] . "' "  ));
        View::response("successfully deleted product");
    }

    //update Password
    public function updatePasswordAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token='" . $_COOKIE['access_token'] . "'"));
        $result = $stmt->fetch();
        $errFlag = 0;
        if ($result['password'] != md5($this->data['currentPassword'])) {
            $res = ["status" => 1, "msg" => "Your current password does not match"];
            $errFlag++;
        }
        if ($result['password'] == md5($this->data['newPassword'])) {
            $res = ["status" => 2, "msg" => "current password should not be matched to the new password"];
            $errFlag++;
        }
        if ($errFlag == 0) {
            $dataToUpdate = [
                "password" => md5($this->data['newPassword'])
            ];
            $this->exec($this->update('user_auth', $dataToUpdate, "access_token='" . $_COOKIE['access_token'] . "'"));
            $res = ["status" => 3, "msg" => "successfully updated your password"];
        }
        View::response($res);
    }

    //get product questions from database
    public function getQuestionsAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token ='" . $_COOKIE['access_token'] . "'"));
        $result1 = $stmt->fetch();
        $id = $result1['id'];
        $stmt = $this->execute($this->join('products,product_quetion','product_quetion.id,product_quetion.question,products.product_name, products.img1, products.price'
        ,"products.id = product_quetion.product_id AND product_quetion.reply IS NULL AND product_quetion.store_auth_id = '".$id."'"));
        $result2 = $stmt->fetchAll();
        View::response($result2);
        /* SELECT product_quetion.id,
        product_quetion.question,products.product_name, products.img1,products.price,products.id 
        FROM products,product_quetion WHERE  products.id = product_quetion.product_id AND 
        reply IS NULL AND product_quetion.store_auth_id = 2;*/
    }

    //store reply for product question
    public function replyQuestionAction()
    {
        $updateData = [
            "reply" => $this->data['answer']
        ];
    
        $this->exec($this->update('product_quetion', $updateData, "id='" . $this->data['id'] . "'"));        
        View::response("success");
        
    }

    public function getOrdersAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token ='" . $_COOKIE['access_token'] . "'"));
        $result1 = $stmt->fetch();
        $id = $result1['id'];
        $stmt = $this->execute($this->get('selling_order', "*", "seller_auth_id ='" . $id . "'"));
        $result2 = $stmt->fetchAll();
        $stmt = $this->execute($this->join('selling_order, product_order,products','selling_order.id, selling_order.status, products.product_name'
        ,"selling_order.id = product_order.selling_order_id AND product_order.product_id=products.id AND selling_order.seller_auth_id = '".$id."'"));
        $result2 = $stmt->fetchAll();
        View::response($result2);
    }

    public function getOrderDetailsAction()
    {
        $id = $this->data['id'];
        $stmt = $this->execute($this->get('selling_order', "buyer_auth_id", "id ='" . $id . "'"));
        $result1 = $stmt->fetch();
        $buyerid = $result1['buyer_auth_id'];
        $stmt = $this->execute($this->join("user_auth,regular_user", "user_auth.tp, regular_user.first_name, regular_user.last_name, regular_user.address", "user_auth.id ='" . $buyerid . "' AND regular_user.auth_id ='" . $buyerid . "'"));
        $result2 = $stmt->fetch();
        $stmt = $this->execute($this->join("product_order,products", "products.product_name, products.img1, products.price, product_order.quantity, product_order.delivery", "product_order.selling_order_id='" . $id . "' AND  product_order.	product_id = products.id"));
        $result3 = $stmt->fetchAll();
        
        View::response($result2);
    }

    public function getOrderProductDetailsAction()
    {
        $id = $this->data['id'];
        $stmt = $this->execute($this->join("product_order,products", "products.product_name, products.img1, products.price, product_order.quantity, product_order.delivery", "product_order.selling_order_id='" . $id . "' AND  product_order.	product_id = products.id"));
        $result3 = $stmt->fetchAll();
        
        View::response($result3);
    }
    
    public function AcceptOrderAction()
    {
        $updateData = [
            "status" => 2
        ];
    
        $this->exec($this->update('selling_order', $updateData, "id='" . $this->data['id'] . "'"));        
        View::response("success");
        
    }

    public function RejectOrderAction()
    {
        $updateData = [
            "status" => 5
        ];
    
        $this->exec($this->update('selling_order', $updateData, "id='" . $this->data['id'] . "'"));        
        View::response("success");
        
    }

    public function SendOrderAction()
    {
        $updateData = [
            "status" => 3
        ];
    
        $this->exec($this->update('selling_order', $updateData, "id='" . $this->data['id'] . "'"));        
        View::response("success");
        
    }

    public function DoneOrderAction()
    {
        $updateData = [
            "status" => 4
        ];
    
        $this->exec($this->update('selling_order', $updateData, "id='" . $this->data['id'] . "'"));        
        View::response("success");
        
    }

    // public function getStoreReportAction()
    // {    
    //     $stmt = $this->execute($this->get('user_auth', "*", "access_token ='" . $_COOKIE['access_token'] . "'" . " AND user_type='3'"));
    //     $result = $stmt->fetch();
    //     $id = $result['id'];
    //     $stmt = $this->execute($this->get('productS', "*", "auth_id ='" . $id . "'"));
    //     $result = $stmt->fetchAll();
    //     View::response($result);
        
    // }

    public function getHomeAction()
    {    
        $stmt = $this->execute($this->get('user_auth', "*", "access_token ='" . $_COOKIE['access_token'] . "'" . " AND user_type='3'"));
        $result = $stmt->fetch();
        $id = $result['id'];

        $stmt = $this->execute($this->get('selling_order', "id", "seller_auth_id =". $id ." AND status = 1"));
        $result = $stmt->fetchAll();
        $oderCount=count($result);

        $stmt = $this->execute($this->get('product_quetion', "id", "store_auth_id =". $id ." AND reply = NULL"));
        $result = $stmt->fetchAll();
        $questionCount=count($result);

        $stmt = $this->execute("SELECT refund.id FROM refund,selling_order WHERE refund.product_order_id = selling_order.id AND selling_order.buyer_auth_id = '".$id."'");
        $result = $stmt->fetchAll();
        $refundCount=count($result);

        $count = array("order"=> $oderCount, "question"=> $questionCount, "refund"=>$refundCount);

        View::response($count);
        
    }

}