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
        $stmt = $this->execute($this->get('user_auth', "*", "access_token ='" . $_COOKIE['access_token'] . "'" . " user_type='4'"));
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
}