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

    
    public function getEditInventoryAction()
    {
        $stmt = $this->execute($this->get('productS', "*", "id='" . $this->data['id'] . "'"));
        $result = $stmt->fetch();
        View::response($result);
    }

    //edit inventory items
    public function editInventoryAction()
    {
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
            "img1" => $iName1,
            "img2" => $iName2,
            "img3" => $iName3,
            "img4" => $iName4,
            "status" => $this->data['status']
        ];
        
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
        $today=date("Y-m-d");
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
            "one_kg" => $this->data['inOne'],
            "additional_one_kg" => $this->data['inOneAdd'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 1 AND range_km = 1"));

        $updateDel = [ 
            "one_kg" => $this->data['inTwo'],
            "additional_one_kg" => $this->data['inTwoAdd'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 1 AND range_km = 2"));

        $updateDel = [ 
            "one_kg" => $this->data['inThree'],
            "additional_one_kg" => $this->data['inThreeAdd'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 1 AND range_km = 3"));

        $updateDel = [ 
            "one_kg" => $this->data['inFour'],
            "additional_one_kg" => $this->data['inFourAdd'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 1 AND range_km = 4"));

        $updateDel = [ 
            "one_kg" => $this->data['outOne'],
            "additional_one_kg" => $this->data['outOneAdd'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 2 AND range_km = 1"));

        $updateDel = [ 
            "one_kg" => $this->data['outTwo'],
            "additional_one_kg" => $this->data['outTwoAdd'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 2 AND range_km = 2"));

        $updateDel = [ 
            "one_kg" => $this->data['outThree'],
            "additional_one_kg" => $this->data['outThreeAdd'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 2 AND range_km = 3"));

        $updateDel = [ 
            "one_kg" => $this->data['outFour'],
            "additional_one_kg" => $this->data['outFourAdd'],
        ];
        $this->exec($this->update('delivery_cost' , $updateDel , "auth_id='" . $id . "' AND type = 2 AND range_km = 4"));

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
    
}