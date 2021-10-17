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

    public function addAdminAction()
    {

        $num_str = sprintf("%06d", mt_rand(1, 999999));
        $password = "Admin@" . $num_str;
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
        View::response("new admin was added");
    }

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
            "tp" => $result['tp']
        ];
        View::response($res);
    }

    public function getAdminListAction()
    {
        $stmt = $this->execute($this->join("user_auth, admin", "email,tp,user_auth.id AS id,first_name,last_name", "user_auth.id = admin.auth_id"));
        $nRows = $stmt->rowCount();
        $result = $stmt->fetchAll();
        View::response($result);
    }

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
            "tp" => $result['tp']
        ];
        View::response($res);
    }

    public function getAdminVerifyDetailsAction()
    {
        $stmt = $this->execute($this->get('user_auth', " id,email,user_type,tp ", "user_status ='5'"));
        View::response($stmt->fetchAll());
    }

    public function getAdminVerifyDetailsExpertAction()
    {
        $stmt = $this->execute($this->get('expert', "*", "auth_id ='" . $this->data['id'] . "'"));
        View::response($stmt->fetch());
    }

    public function getAdminVerifyDetailsStoreAction()
    {
        $stmt = $this->execute($this->get('store', "*", "auth_id ='" . $this->data['id'] . "'"));
        View::response($stmt->fetch());
    }

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

    public function updatePasswordAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token='" . $_COOKIE['access_token'] . "'"));
        $result = $stmt->fetch();
        $errFlag = 0;
        if ($result['password'] != $this->data['password']) {
            $res = ["status" => 1, "msg" => "Your current password does not match"];
            $errFlag++;
        }
        if ($result['password'] == $this->data['newPassword']) {
            $res = ["status" => 2, "msg" => "current password should not be matched to the new password"];
            $errFlag++;
        }
        if ($errFlag == 0) {
            $dataToUpdate = [
                "password" => $this->data['newPassword']
            ];
            $this->exec($this->update('user_auth', $dataToUpdate, "access_token='" . $_COOKIE['access_token'] . "'"));
            $res = ["status" => 3, "msg" => "successfully updated your password"];
        }
        View::response($res);
    }
}