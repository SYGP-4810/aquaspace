<?php

namespace App\Controllers\Reg;

use Core\View;


/**
 * Regular user controller
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
    public function addAdoptPostAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token'] . "' AND user_type='1'"));
        $result = $stmt->fetch();
        $id = $result['id'];

        $iName1 = "";
        $iName1 = microtime(true) . "." . $this->data['exen1'];
        $iDir1 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName1;
        $flag1 = file_put_contents($iDir1, base64_decode($this->data['img1']));

        $iName2 = "";
        $iName2 = microtime(true) . "." . $this->data['exen2'];
        $iDir2 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName2;
        $flag2 = file_put_contents($iDir2, base64_decode($this->data['img2']));

        $iName3 = "";
        $iName3 = microtime(true) . "." . $this->data['exen3'];
        $iDir3 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName3;
        $flag3 = file_put_contents($iDir3, base64_decode($this->data['img3']));

        $iName4 = "";
        $iName4 = microtime(true) . "." . $this->data['exen4'];
        $iDir4 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName4;
        $flag4 = file_put_contents($iDir4, base64_decode($this->data['img4']));


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


        if ($this->data['question'] == 0 || $this->data['question'] == 2) {
            $status = 0;
        }
        if ($this->data['question'] == 1) {
            $status = 1;
        }

        $date = date('Y-m-d H:i:s');
        $dataToInsert = [
            "product_name" => $this->data['product_name'],
            "type" => $this->data['category'],
            "description" => $this->data['description'],
            "duration" => $this->data['duration'],
            "address" => $this->data['address'],
            "lat" => $this->data['lat'],
            "lan" => $this->data['lan'],
            "quantity" => $this->data['quantity'],
            "img1" => $iName1,
            "img2" => $iName2,
            "img3" => $iName3,
            "img4" => $iName4,
            "auth_id" => $id,
            "created_date" => $date,
            "status" => $status
        ];

        $this->exec($this->save('products', $dataToInsert));
        View::response("success");
    }
    public function addPostAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token'] . "' AND user_type='1'"));
        $result = $stmt->fetch();
        $id = $result['id'];
        // $iName1 = "";
        // if($this->data['exen1'] != "")
        // {

        // $iName1 = microtime(true) . "." . $this->data['exen1'];
        // $iDir1 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/post/" . $iName1;
        // $flag1 = file_put_contents($iDir1, base64_decode($this->data['img1']));
        // if (!$flag1) {
        //     throw new \Exception("file didn't come to backend");
        // }
        // else ($iName1=NULL);
        // }
        // $iName2 = "";
        // if($this->data['exen2']!= "")
        // {

        // $iName2 = microtime(true) . "." . $this->data['exen2'];
        // $iDir2 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/post/" . $iName2;
        // $flag2 = file_put_contents($iDir2, base64_decode($this->data['img2']));
        // if (!$flag2) {
        //     throw new \Exception("file didn't come to backend");
        // }  
        // }
        // else($iName2 = NULL);

        $iName1 = "";
        $iName1 = microtime(true) . "." . $this->data['exen1'];
        $iDir1 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName1;
        $flag1 = file_put_contents($iDir1, base64_decode($this->data['img1']));

        $iName2 = "";
        $iName2 = microtime(true) . "." . $this->data['exen2'];
        $iDir2 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName2;
        $flag2 = file_put_contents($iDir2, base64_decode($this->data['img2']));

        $iName3 = "";
        $iName3 = microtime(true) . "." . $this->data['exen3'];
        $iDir3 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName3;
        $flag3 = file_put_contents($iDir3, base64_decode($this->data['img3']));

        $iName4 = "";
        $iName4 = microtime(true) . "." . $this->data['exen4'];
        $iDir4 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName4;
        $flag4 = file_put_contents($iDir4, base64_decode($this->data['img4']));


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

        $question = $this->data['question'];

        if($question == 0 || $question == 2){
            
        }

        $dataToInsert = [
            "product_name" => $this->data['product_name'],
            "type" => $this->data['type'],
            "catagory" => $this->data['catagory'],
            "price" => $this->data['price'],
            "description" => $this->data['description'],
            "duration" => $this->data['duration'],
            "address" => $this->data['address'],
            "lat" => $this->data['lat'],
            "lan" => $this->data['lan'],
            "quantity" => $this->data['quantity'],
            "img1" => $iName1,
            "img2" => $iName2,
            "img3" => $iName3,
            "img4" => $iName4,
            "auth_id" => $id,
            "created_date" => $date,
            "status" => $this->data['status']
        ];
        // View::response($dataToInsert);
        $this->exec($this->save('products', $dataToInsert));
        View::response("success");
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
        $stmt = $this->execute($this->get('products', "id, product_name, description, price, quantity,address"));
        View::response($stmt->fetchAll());
    }

    public function getFishNamesAction()
    {
        $stmt = $this->execute($this->get('fish', "name"));
        // $result = $stmt->fetchAll();
        // $output = array();
        // foreach($result as $row)
        // {
        //     $temp_array = array();
        //     $temp_array['value'] = $row['name'];
        //     $temp_array['label'] = '<img src = ../../images/"'.$row['image']. '" width="70" />&nbsp;&nbsp;&nbsp;' . $row['name']. '';
        //     $output[] = $temp_array;
        // }

        View::response($stmt->fetchAll());
    }

    public function getFishImageAction()
    {
        $stmt = $this->execute($this->get('fish', "image", "name ='" . $this->data['name'] . "'"));
        View::response($stmt->fetch());
    }

    public function getAddressAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token'] . "' AND user_type='1'"));
        $result = $stmt->fetch();
        $id = $result['id'];
        $stmt = $this->execute($this->get('regular_user', "address",  "auth_id='" . $id . "'"));
        View::response($stmt->fetch());
    }

    public function postQuestionForExpertAction()
    {
        $id = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token'] . "'"))->fetch()['id'];
        $dataToInsert = [
            "question" => $this->data['question'],
            "sender_id" => $id
        ];
        $this->exec($this->save('expert_question', $dataToInsert));
        View::response("successfully inserted");
    }

    public function getQuestionForExpertAction()
    {
        View::response($this->execute("SELECT * FROM expert_question ORDER BY id DESC")->fetchAll());
    }

    public function addToCartAction()
    {
        $id = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token'] . "'"))->fetch()['id'];
        $product_id = $this->data['id'];
        $dataToInsert = [
            "user_id" => $id,
            "product_id" => $this->data['id'],
            "quantity" => $this->data['quantity'],
            "delivery" => $this->data['delivery'],
        ];
        $stmt = $this->execute("SELECT id FROM shopping_cart WHERE user_id=$id AND product_id=$product_id");
        if(!$stmt->fetch()){
            
            $this->exec($this->save("shopping_cart", $dataToInsert));
            View::response("Added to Your Cart!");

        }
        else View::response("Item is already in your cart!");
        
    }

    public function showCartAction()
    {
        $id = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token'] . "'"))->fetch()['id'];
        $stmt = $this->execute("
        SELECT shopping_cart.id, shopping_cart.product_id, shopping_cart.quantity, products.product_name, products.price
        FROM shopping_cart 
        INNER JOIN products ON shopping_cart.product_id=products.id
        WHERE shopping_cart.user_id = $id AND shopping_cart.status = 1
        ") ;

        $result = $stmt->fetchAll();
        View::response($result);

    }

    //insert report about products
    public function reportProductAction() {
        $id = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token'] . "'"))->fetch()['id'];
        //check if there is a report to this product before from the same user
        $stmt = $this->execute($this->get('report','*',"auth_id='" . $id . "' AND product_id='" . $this->data['productId']."'"));
        if($stmt->rowCount() > 0){
            $res = [
                "flag" => 1,
                "msg" => "You have previously reported this product"
            ];
            View::response($res);
            return;
        }
        $dataToInsert = [
            "auth_id" => $id,
            "report" => $this->data['report'],
            "product_id" => $this->data['productId'],
        ];
        $this->exec($this->save('report', $dataToInsert));
        $sellerId = $this->execute($this->get('products','*',"id='".$this->data['productId']."'"))->fetch()['auth_id'];
        $email = $this->execute($this->get('user_auth','*',"id='".$sellerId."'"))->fetch()['email'];
        //check number of report for the same product to block the product
        $stmt = $this->execute($this->get('report','*',"product_id='". $this->data['productId'] . "'"));
        if($stmt->rowCount() >= 10){
            return;
            $dataToUpdate = [
                "status" => 4
            ];
            $this->exec($this->update('products', $dataToUpdate,"id='" . $this->data['productId'] . "'"));
            $this->notifyOther($sellerId,"your product has been blocked check your email");
            //send an email with a link to send appeal for unblock this product
            $subject = "your product has been blocked";
            $linkToSend = $_SERVER['name']. "/aquaspace/frontend/src/appeal.html?productId=".$this->data['productId'];
            $msg = "
                <html>
                    <head>
                    <title>your product has been blocked</title>
                    </head>
                    <body>
                        <p>your product has been blocked . send a appeal to unblock your product using the following link</p>
                        <p><a href='".$linkToSend."' target='_blank'></a></p>
                    </body>
                </html>
            ";
            $this->sendMail($email,$subject,$msg);
            //check number of blocked product of the user to block the user_auth
        $stmt = $this->execute($this->get('products','*',"status='4' AND auth_id='" .$sellerId."'"));
        if($stmt->rowCount() >= 10){
            $dataToUpdate = [
                "user_status" => 3 
            ];
            $this->exec($this->update('user_auth',$dataToUpdate,'auth_id=\''.$sellerId."'"));
            //send a email with a link to unblock the user as well as prodocts
            $subject = "your product has been blocked";
            $linkToSend = $_SERVER['name']. "/aquaspace/frontend/src/appeal-account.html?authId=".$sellerId;
            $msg = "
                <html>
                    <head>
                    <title>your account has been blocked</title>
                    </head>
                    <body>
                        <p>your account has been blocked from aquaspace . send a appeal to unblock your product using the following link</p>
                        <p><a href='".$linkToSend."' target='_blank'></a></p>
                    </body>
                </html>
            ";
            $this->sendMail($email,$subject,$msg);
        }
        }
        $res = [
            "flag" => 2,
            "msg" => "this product is reported"
        ];
        View::response($res);

}

    public function getProductAction()
    {
        $stmt = $this->execute($this->get('products', "*", "id ='" . $this->data['id'] . "'"));
        View::response($stmt->fetch());
    }

    public function getProductFromCartAction(){

        $id = $this->data['id'];

        $stmt = $this->execute("
            SELECT shopping_cart.product_id, shopping_cart.quantity, shopping_cart.delivery, products.product_name, products.auth_id, products.price, products.lat, products.lan, products.weight
            FROM shopping_cart 
            INNER JOIN products ON shopping_cart.product_id=products.id
            WHERE shopping_cart.id = $id
        ");

        $result = $stmt->fetch();
        View::response($result);

    }

    public function getShippingAction(){

        // let req3 = {
        //     product_id: data.product_id,
        //     delivery: data.delivery,
        //     quantity: data.quantity,
        //     weight: data.weight,
        //     distance : actual_distance,
        //     seller : data.auth_id,
        //   };

        $seller = $this->data['seller'];
        $weight = $this->data['weight'];
        $distance = $this->data['distance'];
        $shipping = 0;
        $dataToUpdate = ["distance" => $distance];
    

        $this->exec($this->update('shopping_cart', $dataToUpdate, "id='" . $this->data['id'] . "'"));
        if($distance <= 10){
            $stmt = $this->execute($this->get('delivery_cost', "one_kg, additional_one_kg", "range_km = 1 AND auth_id='" . $seller ."'"))->fetch();
            if($weight > 1) {
                $shipping = $stmt['one_kg'] + ($weight - 1)*$stmt['additional_one_kg'];
            }
            else {
                $shipping = $stmt['one_kg'];
            }
            View::response($shipping);
        }
        else if($distance <=50){
            $stmt = $this->execute($this->get('delivery_cost', "one_kg, additional_one_kg", "range_km = 2 AND auth_id='" . $seller ."'"))->fetch();
            if($weight > 1) {
                $shipping = $stmt['one_kg'] + ($weight - 1)*$stmt['additional_one_kg'];
            }
            else {
                $shipping = $stmt['one_kg'];
            }
            View::response($shipping);
        }
        else if($distance <=150){
            $stmt = $this->execute($this->get('delivery_cost', "one_kg, additional_one_kg", "range_km = 3 AND auth_id='" . $seller ."'"))->fetch();
            if($weight > 1) {
                $shipping = $stmt['one_kg'] + ($weight - 1)*$stmt['additional_one_kg'];
            }
            else {
                $shipping = $stmt['one_kg'];
            }
            View::response($shipping);
        }
        else{
            $stmt = $this->execute($this->get('delivery_cost', "one_kg, additional_one_kg", "range_km = 4 AND auth_id='" . $seller ."'"))->fetch();
            if($weight > 1) {
                $shipping = $stmt['one_kg'] + ($weight - 1)*$stmt['additional_one_kg'];
            }
            else {
                $shipping = $stmt['one_kg'];
            }
            View::response($shipping);
        }

    }

    public function makeOrderAction()
    {
        $data = json_encode($this->data);
        $obj = json_decode($data);
        $id = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token'] . "'"))->fetch()['id'];
        $amount_for_coins = 0;
        for ($i = 0; $i < sizeof($obj); $i++)
        {
            $t_amount = 0;
            // $t_shipping = 0;
            for($x = 0; $x < sizeof($obj[$i]->id); $x++){
                $dataToUpdate = [
                    "status" => 0
                ];
                $this->exec($this->update("shopping_cart", $dataToUpdate,"id = '" . $obj[$i]->id[$x]. "'"));

            }
            
            for($x = 0; $x < sizeof($obj[$i]->product_id); $x++){
                
                $r1 = $this->execute($this->get('shopping_cart', "quantity, delivery , distance",  "id = '" . $obj[$i]->id[$x] . "'"))->fetch();
                $r2 = $this->execute($this->get('products', "price , weight , auth_id", "id = '" . $obj[$i]->product_id[$x] . "'"))->fetch();

                $t = $r1['quantity']*$r2['price'];
                $t_amount = $t_amount + $t;
            }
            
            $dataToInsert1 = [
                "seller_auth_id" => $obj[$i]->auth_id,
                "buyer_auth_id"  => $id,
                "amount" => $t_amount,
            ];
           

            $this->exec($this->save('selling_order', $dataToInsert1));
            $max_id = $this->execute("SELECT MAX(id) FROM selling_order")->fetch();
             
             $t_shipping = 0;
            
            for($y = 0; $y < sizeof($obj[$i]->product_id); $y++){
               $shipping = 0;

                $r1 = $this->execute($this->get('shopping_cart', "quantity, delivery ,distance",  "id = '" . $obj[$i]->id[$y] . "'"))->fetch();
                $r2 = $this->execute($this->get('products', "price , weight , auth_id", "id = '" . $obj[$i]->product_id[$y] . "'"))->fetch();

                $t = $r1['quantity']*$r2['price'];

                if($r1['delivery'] != 0){
                    if($r1['distance'] <= 10){
                        $stmt = $this->execute($this->get('delivery_cost', "one_kg, additional_one_kg", "range_km = 1 AND auth_id='" . $r2['auth_id'] ."'"))->fetch();
                        if($r2['weight'] > 1) {
                            $shipping = $stmt['one_kg'] + ($r2['weight'] - 1)*$stmt['additional_one_kg'];
                        }
                        else {
                            $shipping = $stmt['one_kg'];
                        }
                    
                    }
                    else if($r1['distance'] <=50){
                        $stmt = $this->execute($this->get('delivery_cost', "one_kg, additional_one_kg", "range_km = 2 AND auth_id='" . $r2['auth_id'] ."'"))->fetch();
                        if($r2['weight'] > 1) {
                            $shipping = $stmt['one_kg'] + ($r2['weight'] - 1)*$stmt['additional_one_kg'];
                        }
                        else {
                            $shipping = $stmt['one_kg'];
                        }
                    
                    }
                    else if($r1['distance'] <=150){
                        $stmt = $this->execute($this->get('delivery_cost', "one_kg, additional_one_kg", "range_km = 3 AND auth_id='" . $r2['auth_id'] ."'"))->fetch();
                        if($r2['weight'] > 1) {
                            $shipping = $stmt['one_kg'] + ($r2['weight'] - 1)*$stmt['additional_one_kg'];
                        }
                        else {
                            $shipping = $stmt['one_kg'];
                        }
                    
                    }
                    else{
                        $stmt = $this->execute($this->get('delivery_cost', "one_kg, additional_one_kg", "range_km = 4 AND auth_id='" . $r2['auth_id'] ."'"))->fetch();
                        if($r2['weight'] > 1) {
                            $shipping = $stmt['one_kg'] + ($r2['weight'] - 1)*$stmt['additional_one_kg'];
                        }
                        else {
                            $shipping = $stmt['one_kg'];
                        }
                    
                    }

                    $t_shipping = $t_shipping + $shipping;
                }

                $dataToInsert2 = [
                    "selling_order_id" => $max_id['MAX(id)'],
                    "product_id" => $obj[$i]->product_id[$y],
                    "delivery" => $r1['delivery'],
                    "amount" => $t,
                    "delivery_fee" => $shipping,
                ];

                $this->exec($this->save('product_order', $dataToInsert2));

            }

            $total_amount = $t_amount + $t_shipping;

            
            $dataToUpdate = ["amount" => $total_amount];
    

            $amount_for_coins = $amount_for_coins + $t_amount;
        $this->exec($this->update('selling_order', $dataToUpdate, "id='" . $max_id['MAX(id)'] . "'"));

        }
        $coin_rate = 50;

        $stmt4 = $this->execute($this->get("coins","*", "user_id = '" . $id . "'"))->fetch();
        $new_amount = 0;
        $new_coins = 0;
        if($stmt4 != ""){
            $temp_amount = $stmt4['amount'] + $amount_for_coins;
            if($temp_amount >= $coin_rate){
                $d = ((int)($temp_amount/$coin_rate));
                $new_coins = $stmt4['coins'] + $d;
                $new_amount = $temp_amount - ($d*$coin_rate);
            }
            else{
                $new_amount = $temp_amount;
            }

            $dataToUpdate1 = [
                "amount" => $new_amount,
                "coins" => $new_coins,
            ];
    
            $this->exec($this->update('coins', $dataToUpdate1, "user_id ='". $id ."'"));
            
        }
        else{
            $temp_amount = $amount_for_coins;
            if($temp_amount >= $coin_rate){
                $d = ((int)($temp_amount/$coin_rate));
                $new_coins = $d;
                $new_amount = $temp_amount - ($d*$coin_rate);
            }
            else{
                $new_amount = $temp_amount;
            }

            $dataToInsert3 = [
                "user_id" => $id,
                "amount" => $new_amount,
                "coins" => $new_coins,
            ];
    
            $this->exec($this->save("coins", $dataToInsert3));

        }

        View::response("success");
    

    }

    public function getNotifsAction(){
        $id = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token'] . "'"))->fetch()['id'];
        $stmt = $this->execute($this->get('notification' , "*" , "auth_id = '" . $id . "' AND status = 1" ));
        View::response($stmt->fetchAll());
    }

    public function readAllAction(){
        $id = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token'] . "'"))->fetch()['id'];
        $dataToUpdate = ["status" => "2"];
        $this->exec($this->update('notification', $dataToUpdate, "auth_id='" . $id . "'"));
        View::response("success");  
    }

    public function hideNotifAction(){
        $id = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token'] . "'"))->fetch()['id'];
        $dataToUpdate = ["status" => "2"];
        $this->exec($this->update('notification', $dataToUpdate, "auth_id='" . $id . "' AND id = '" . $this->data['id'] ."'"));
        View::response("success");  
    }

    public function getArticlesAction(){
        // $stmt = $this->execute($this->get('article', "*", "status = 1"));
        $stmt = $this->execute("SELECT id, pic, summary, category, title, DATE(date) AS date FROM article WHERE status=1 ");
        View::response($stmt->fetchAll());
    }
    public function getLatestArticlesAction(){
        $stmt = $this->execute("SELECT id, pic, summary, category, title, DATE(date) AS date FROM article WHERE status=1 ORDER BY id DESC LIMIT 3");
        View::response($stmt->fetchAll());
    }
    public function getArticleAction(){
        View::response($this->execute($this->get('article','*',"id='" . $this->data['id'] ."'"))->fetch());
    }

    public function getFishDataAction(){
        $stmt = $this->execute($this->get('fish_article','*'));
        View::response($stmt->fetchAll());
    }

    public function getNativeCountriesAction(){
        $stmt = $this->execute($this->get('native_to','country',"fish_article_id='" . $this->data['id'] ."'"));
        View::response($stmt->fetchAll());
    }

    public function getOtherNameOfFishAction(){
        $stmt = $this->execute($this->get('other_names_of_fish','name',"fish_article_id='" . $this->data['id'] ."'"));
        View::response($stmt->fetchAll());
    }

    public function getCompatibleFishAction(){
        $id = $this->data['id'];
        $stmt = $this->execute(" SELECT fish_article.name
        FROM compatible_fish
        INNER JOIN fish_article ON fish_article.id = compatible_fish.compatible_fish_id
        WHERE compatible_fish.fish_article_id = $id
        ") ;
        View::response($stmt->fetchAll());
    }
    public function getCompatibleFishByNameAction(){
        $stmt1 = $this->execute($this->get('fish_article','id',"name='" . $this->data['name'] ."'"));
        $id = ($stmt1->fetch())['id'];
        $stmt = $this->execute(" SELECT fish_article.name, fish_article.img_1
        FROM compatible_fish
        INNER JOIN fish_article ON fish_article.id = compatible_fish.compatible_fish_id
        WHERE compatible_fish.fish_article_id = $id
        ") ;
        View::response($stmt->fetchAll());
    }

    public function getFishDataPostAction(){
        View::response($this->execute($this->get('fish_article','*',"id='" . $this->data['id'] ."'"))->fetch());
    }

    public function getTransactionsAction(){
        $id = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token'] . "'"))->fetch()['id'];
        $stmt = $this->execute($this->get('selling_order', "*", "buyer_auth_id = '" . $id . "'"))->fetchAll();
        
        $array = array();
        for($x=0 ; $x < sizeof($stmt) ; $x++){
            $res = array();
            $stmt2 = $this->execute($this->get('product_order', "*", "selling_order_id = '" . $stmt[$x]['id'] . "'"))->fetch();
            $stmt3 = $this->execute($this->get('products', "product_name", "id = '" . $stmt2['product_id'] . "'"))->fetch();
            $total = $stmt2['amount'] + $stmt2['delivery_fee'];
            $res = array("id" => $stmt2['id'] ,"order_id" => $stmt2['selling_order_id'] , "product_name" => $stmt3['product_name'], "amount" => $total , "date" => $stmt[$x]['date'], "status" => $stmt[$x]['status']);
            array_push($array,$res);
        }
 
        View::response($array);

    }

    
    public function getFishDataImageAction()
    {
        $stmt = $this->execute($this->get('fish_article', "description,img_1", "name ='" . $this->data['name'] . "'"));
        View::response($stmt->fetch());
    }

    public function getPostImageAction()
    {
        $stmt = $this->execute($this->get('products', "price,img1,description", "id ='" . $this->data['id'] . "'"));
        View::response($stmt->fetch());
    }
  
    public function refundAction(){
        $id = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token'] . "' AND user_type='1'"))->fetch()['id'];

        $iName1 = "";
        $iName1 = microtime(true) . "." . $this->data['exen1'];
        $iDir1 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName1;
        $flag1 = file_put_contents($iDir1, base64_decode($this->data['img1']));

        $iName2 = "";
        $iName2 = microtime(true) . "." . $this->data['exen2'];
        $iDir2 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName2;
        $flag2 = file_put_contents($iDir2, base64_decode($this->data['img2']));

        $iName3 = "";
        $iName3 = microtime(true) . "." . $this->data['exen3'];
        $iDir3 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/product/" . $iName3;
        $flag3 = file_put_contents($iDir3, base64_decode($this->data['img3']));

        if (!$flag1) {
            throw new \Exception("file didn't come to backend");
        }
        if (!$flag2) {
            throw new \Exception("file didn't come to backend");
        }
        if (!$flag3) {
            throw new \Exception("file didn't come to backend");
        }

        $dataToInsert = [
            "user_id" => $id,
            "product_order_id" => $this->data['product_order_id'],
            "reason" => $this->data['reason'],
            "deliver_status" => $this->data['deliver_status'],
            "img1" => $iName1,
            "img2" => $iName2,
            "img3" => $iName3,
        ];

        
        // $this->exec($this->save('products', $dataToInsert));
        $this->exec($this->save('refund', $dataToInsert ));

        View::response("success");
      
         
    }

    public function getActivePostsAction(){
        $id = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token'] . "'"))->fetch()['id'];
        $stmt = $this->execute($this->get("products","*", "auth_id = '" . $id . "'"))->fetchAll();
        View::response($stmt);
    
    }

    public function getCoinCountAction(){
        $id = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token'] . "'"))->fetch()['id'];
        $stmt = $this->execute($this->get('coins',"coins","user_id = '" . $id ."'")) ->fetch();
        if($stmt == ""){
            View::response(0);
        }
        else{
            View::response($stmt['coins']);
        }

    }
  
    public function addCoinsAction(){
        $id = $this->execute($this->get('user_auth', "*", "access_token = '" . $_COOKIE['access_token'] . "'"))->fetch()['id'];
        $stmt = $this->execute($this->get("coins","*", "user_id = '" . $id . "'"))->fetch();
        if($stmt != ""){
            $new_coins = $stmt['coins'] + ($this->data['no_of_coins']);

            $dataToUpdate = [
                "coins" => $new_coins,
            ];
    
            $this->exec($this->update('coins', $dataToUpdate, "user_id ='". $id ."'"));
            
        }
        else{
            $new_coins = $this->data['no_of_coins'];
            $new_amount = 0;

            $dataToInsert1 = [
                "user_id" => $id,
                "amount" => $new_amount,
                "coins" => $new_coins,
            ];
    
            $this->exec($this->save("coins", $dataToInsert1));

        }

        View::response("success");
       

    }

    public function removeMyPostAction(){
        $dataToUpdate = [
            "status" => 2,
        ];
        $this->exec($this->update('products', $dataToUpdate,"id='" . $this->data['id'] . "'"));

    }

    public function getTankCapacityAction(){

        $data = json_encode($this->data);
        $obj = json_decode($data);

        $max_capacity = 0;
        $biggest_fish = "";
        foreach($obj as $key=>$value){

            $capacity = $this->execute($this->get('fish_article', 'tank_capacity',"name = '" . $key ."'" ))->fetch();
            if($capacity['tank_capacity']>$max_capacity){
                $max_capacity = $capacity['tank_capacity'];
                $biggest_fish = $key;
            }
        }

        $required_capacity = $max_capacity;
        foreach($obj as $key=>$value){

            if($key != $biggest_fish){
                $capacity = $this->execute($this->get('fish_article', 'tank_capacity',"name = '" . $key ."'" ))->fetch();
                $required_capacity = $required_capacity + ($capacity['tank_capacity'])*(25/100)*((int)($value));
            }
            else{
                $final_value = ((int)($value))-1;
                $capacity = $this->execute($this->get('fish_article', 'tank_capacity',"name = '" . $key ."'" ))->fetch();
                $required_capacity = $required_capacity + (($capacity['tank_capacity'])*(25/100))*($final_value);
            }
        }

        View::response($required_capacity);

    }

    public function getTanks(){
        $stmt = $this->execute($this->get('products','*', "category = 'tank' AND status=1 AND capacity >= '" . $this->data['capacity'] ."'" ));
        View::response($stmt->fetchAll());
    }
    public function getFilters(){
        $stmt = $this->execute($this->get('products','*', "category = 'filter' AND status=1 AND capacity >= '" . $this->data['capacity'] ."'" ));
        View::response($stmt->fetchAll());
    }
}



