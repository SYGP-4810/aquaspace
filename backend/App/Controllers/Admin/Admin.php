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
}