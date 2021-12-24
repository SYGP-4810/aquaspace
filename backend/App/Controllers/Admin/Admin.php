<?php

namespace App\Controllers\Admin;

use Core\View;


/**
 * admin controller
 *
 * 
 */
class Admin extends \Core\Controller
{
   
   
    protected function before()
    {
        // Make sure an admin user is logged in for example
        // return false;
    }

    //add new admins to the system
    public function addAdminAction()
    {
        $num_str = sprintf("%06d", mt_rand(1, 999999));
        $password = "Admin@" . $num_str;
        $stmt = $this->execute($this->get('user_auth', '*', "email='" . $this->data['email'] . "'"));
        if ($stmt->rowCount() > 0) {
            View::response([
                "status" => 0,
                "msg" => "email is taken"
            ]);
        } else {
            $dataToInsertAuthTable = [
                "email" => $this->data['email'],
                "tp" => $this->data['telNo'],
                "password" => md5($password),
                "user_type" => "4",
                "user_status" => "4"
            ];
            $this->exec($this->save('user_auth', $dataToInsertAuthTable));
            $stmt = $this->execute($this->get('user_auth', "*", "email ='" . $this->data["email"] . "'"));
            $authId = $stmt->fetch()['id'];
            $dataToInsertAdminTable = [
                "auth_id" => $authId,
                "first_name" => $this->data['fName'],
                "last_name" => $this->data['lName'],
                "address" => $this->data['address'],
                "city" => $this->data['city']
            ];
            $this->exec($this->save('admin', $dataToInsertAdminTable));
            $to = $this->data['email'];
            $subject = "posted as aquaspace admin";
            $message = "
            <html>
            <head>
            <title>posted as an aquaspace admin</title>
            </head>
            <body>
            <p>your email can login to the aquaspace by using follwing password</p>
            <div>Your Password : " . $password . "</div>
            </body>
            </html>
            ";
            $this->sendMail($to, $subject, $message);
            View::response(["status" => 2, "msg" => "successfully added the admin to the system"]);
        }
    }

    //get logged in admins details
    public function getAdminAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token ='" . $_COOKIE['access_token'] . "'" . " AND user_type='4'"));
        $result = $stmt->fetch();
        $id = $result['id'];
        $stmt = $this->execute($this->get('admin', "*", "auth_id ='" . $id . "'"));
        $result2 = $stmt->fetch();
        $res = [
            "fName" => $result2['first_name'],
            "lName" => $result2['last_name'],
            "email" => $result['email'],
            "address" => $result2['address'],
            "city" => $result2['city'],
            "tp" => $result['tp'],
            "profile_img" => $result['profile_img']
        ];
        View::response($res);
    }

    //get all admins details
    public function getAdminListAction()
    {
        $stmt = $this->execute($this->join("user_auth, admin", "email,tp,user_auth.id AS id,first_name,last_name,profile_img", "user_auth.id = admin.auth_id"));
        $result = $stmt->fetchAll();
        View::response($result);
    }

    //get individual profile of admin by using id
    public function getAdminDetailsAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "id ='" . $this->data['id'] . "'"));
        $result = $stmt->fetch();
        $stmt = $this->execute($this->get('admin', "*", "auth_id ='" . $this->data['id'] . "'"));
        $result2 = $stmt->fetch();
        $res = [
            "fName" => $result2['first_name'],
            "lName" => $result2['last_name'],
            "email" => $result['email'],
            "address" => $result2['address'],
            "city" => $result2['city'],
            "tp" => $result['tp'],
            "profile_img" => $result['profile_img']
        ];
        View::response($res);
    }

    //get store,expert accounts which are not verified yet
    public function getAdminVerifyDetailsAction()
    {
        $stmt = $this->execute($this->get('user_auth', " id,email,user_type,tp ", "user_status ='5'"));
        View::response($stmt->fetchAll());
    }

    //get expert details to verify 
    public function getAdminVerifyDetailsExpertAction()
    {
        $stmt = $this->execute($this->get('expert', "*", "auth_id ='" . $this->data['id'] . "'"));
        $res['expert'] = $stmt->fetch();
        $res['user'] = $this->execute($this->get('user_auth', "tp,email", "id='" . $this->data['id'] . "'"))->fetch();
        View::response($res);
    }

    //get expert details to verify
    public function getAdminVerifyDetailsStoreAction()
    {
        $stmt = $this->execute($this->get('store', "*", "auth_id ='" . $this->data['id'] . "'"));
        View::response($stmt->fetch());
    }

    //update new expert,store account as verified accounts
    public function getAdminVerifyDetailsAcceptAction()
    {
        $dataToUpdate = ["user_status" => "4"];
        $this->exec($this->update('user_auth', $dataToUpdate, "id='" . $this->data['id'] . "'"));
        $stmt = $this->execute($this->get('user_auth', "*", " id='" . $this->data['id'] . "'"));
        $to = $stmt->fetch()['email'];
        $subject = "about accepting your account in aquaspace";
        $msg = "
        <html>
            <head><title>About accepting your account in aquaspace</title></head>
            <body>
                <p>your account has been accepted<p>
                <a href='" . $_SERVER['HTTP_HOST'] . "/aquaspace/frontend/src/login.html" . "'>Click here to login</a>
            </body>
        </html>>
        ";
        $this->sendMail($to, $subject, $msg);
        View::response("successfully confirm user");
    }

    //reject new store,expert accounts 
    public function getAdminVerifyDetailsRejectAction()
    {
        $dataToUpdate = ["user_status" => "3"];
        $this->exec($this->update('user_auth', $dataToUpdate, "id='" . $this->data['id'] . "'"));
        if ($this->data['type'] == 2) {
            $this->exec($this->delete('expert', " auth_id='" . $this->data['id'] . "'"));
        } else if ($this->data['type'] == 3) {
            $this->exec($this->delete('store', " auth_id='" . $this->data['id'] . "'"));
        }
        $stmt = $this->execute($this->get('user_auth', "*", " id='" . $this->data['id'] . "'"));
        $to = $stmt->fetch()['email'];
        $subject = "about rejecting your account in aquaspace";
        $msg = "
        <html>
            <head><title>About accepting your account in aquaspace</title></head>
            <body>
                <p>your account has been rejected<p>
                <p>sorry for the troubles!</p>
            </body>
        </html>>
        ";
        $this->sendMail($to, $subject, $msg);

        View::response("successfully Reject user");
    }

    //logged in admin password reset 
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

    //update logged in admins's details
    public function updateAdminAction()
    {

        $stmt = $this->execute($this->get('user_auth', '*', "access_token ='" . $_COOKIE['access_token'] . "'"));
        $result = $stmt->fetch();
        $updateData = [
            "first_name" => $this->data['fName'],
            "last_name" => $this->data['lName'],
            "address" => $this->data['address'],
            "city" => $this->data['city']
        ];
        $ext = array("jpg", "png", "jpeg");
        if (in_array($this->data['exen'], $ext)) {
            $iName1 = "";
            $iName1 =  microtime(true) . "." . $this->data['exen'];
            $iDir1 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/profile/" . $iName1;
            $flag1 = file_put_contents($iDir1, base64_decode($this->data['pic']));
            if (!$flag1) {
                throw new \Exception("file did not come to the backend");
            }
            if (file_exists("/aquaspace/frontend/images/profile/" . $result['profile_img'])) {
                //delete photo from the directory
                unlink("/aquaspace/frontend/images/profile/" . $result['profile_img']);
            }
            $this->exec($this->update('user_auth', ["tp" => $this->data['tp'], "profile_img" => $iName1], "id='" . $result['id'] . "'"));
        } else {
            $this->exec($this->update('user_auth', ["tp" => $this->data['tp']], "id='" . $result['id'] . "'"));
        }


        $this->exec($this->update('admin', $updateData, "auth_id='" . $result['id'] . "'"));
        View::response("Successfully updated");
    }

    //get the list of charges 
    public function getRateAction()
    {
        View::response($this->execute($this->getAll('rate', '*'))->fetchAll());
    }

    //update the list of charges
    public function updateRateAction(){
        $i = 0;
        while($i < count($this->data)){
            $this->exec($this->update("rate", ["rate"=>$this->data[$i]], "id='" . ++$i . "'"));
        }
        view::response("successfully updated");

    }

    //get the appeals for individual posts
    public function getAppealAction(){
        $needToBeExtract = "appeal.appeal , appeal.product_id, products.product_name, products.img1";
        $tablesWhichDataContains = "appeal , products";
        $condition = "appeal.product_id = products.id AND products.status = '4'";
        $sql = $this->join($tablesWhichDataContains,$needToBeExtract,$condition);
        View::response($this->execute($sql)->fetchAll());
    }

    //get reasons for the appeals of individual posts
    public function getReasonsAppealAction(){
        View::response($this->execute($this->get("report","*","product_id='". $this->data['productId'] . "'"))->fetchAll());
    }

    //unblock the blocked product 
    public function unblockProductAction(){
        $dataToBeUpdate = [
            "status" => "1"
        ];
        $this->exec($this->update("products",$dataToBeUpdate,"id='". $this->data['productId'] . "'"));
        View::response("successfully updated");
    }

    //decline the appeal for a product
    public function declineAppealAction(){
        $result = $this->execute($this->get('products','*',"id='". $this->data['productId']."'"))->fetch();
        $id = $result['auth_id'];
        $this->exec($this->update("products",["status" => '5'],"id='".$this->data['productId']. "'"));
        $this->notifyOther($id,"your appeal declined");
        View::response("successfully decline the appeal for the product ".$result['product_name']);
    }

    //get the users who sent appeals to unblock account
    public function getUserAppealAction(){
        $dataColumn = "user_auth.email, user_auth.profile_img,user_auth.user_type, user_appeal.appeal";
        $tables = "user_appeals, user_auth";
        $condition = "user_auth.id=user_appeal.auth_id AND user_auth.user_status='3'";
        $sql = $this->join($tables,$dataColumn,$condition);
        View::response($sql);
        // View::response($this->execute($sql)->fetchAll());
    } 
    


}
