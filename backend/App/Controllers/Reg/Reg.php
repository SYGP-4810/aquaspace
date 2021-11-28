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
}