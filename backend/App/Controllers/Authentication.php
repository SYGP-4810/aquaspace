<?php

namespace App\Controllers;

use Core\View;


/**
 * login controller
 * 
 *
 * 
 */
class authentication extends \Core\Controller
{

    /**
     * Before filter
     *
     * @return void
     */
    protected function before()
    {
    }

    /**
     * authintication 
     *
     * @return void
     */
    public function requestLoginAction()
    {
        $stmt = $this->execute($this->get('user_auth', 'email =' . $this->data["userName"] . " OR mobile =" . $this->data["userName"] . 'AND password =' . md5($this->data["password"])));
        $rows = $stmt->rowCount();
        $result = $stmt->fetch();
        if ($rows == 1) {
            //Check wheather user able to login the system
            switch ($result['user_status']) {
                case '0':
                    //email not confirm redirect
                    $res = array("status" => "0", "redirect" => "");
                    View::response($res);
                    break;
                case '1':
                    //temporially blocked login failed
                    $res = array("status" => "1", "redirect" => "");
                    View::response($res);
                    break;
                case '2':
                    //temporially block due to the issue
                    $res = array("status" => "2", "redirect" => "");
                    View::response($res);
                    break;
                case '3':
                    //peromenatly block due to the issue
                    throw new \Exception("peromenatly blocked user", 403);
                    break;

                default:
                    //No default
                    break;
            }
            $payload = "{id:" . $result['id'] . ",email:'" . $result['email'] . "'}";

            //set token
            $this->setToken($payload, $result['id']);

            //reset access_attept to zero
            $this->execute("UPDATE user_auth SET attempt = 0 WHERE email='{$this->data["userName"]}' OR mobile='{$this->data["userName"]}'");
            //redirect to the user's  home here
        } elseif ($stmt->rowCount() > 1) {
            throw new \Exception("database error duplicate user accounts", 500);
        } else {
            $stmt = $this->execute($this->get('user_auth', 'email =' . $this->data["email"] . " OR mobile =" . $this->data["mobile"]));


            if ($stmt->fetch()['attepmt'] < 5) {
                $time = time();
                $this->execute("UPDATE user_auth SET attempt = attempt + 1 , attempt_time = {$time} WHERE email='{$this->data["userName"]}' OR mobile='{$this->data["userName"]}'");
                $res = array("status" => "3", "redirect" => "");
                View::response($res);
            } else {
                $timeToEnd = time() - $stmt->fetch()['attemp_time'];
                $this->execute("UPDATE user_auth SET attempt = attempt + 1 user_statues = 5 WHERE email='{$this->data["userName"]}' OR mobile='{$this->data["userName"]}'");
                $res = array("status" => "4", "redirect" => "");
                View::response($res);
            }
        }
    }

    public function requestLogoutAction()
    {
        $secret = "i am a secrete" . time();
        $this->execute($this->update('user_auth', ['access_token' => md5($secret)], 'id=' . $this->params['id']));
        setcookie("access_token", "", time() - 60 * 60 * 24 * 7, NULL, NULL, NULL, TRUE);
        //redirect to the login page
    }
}