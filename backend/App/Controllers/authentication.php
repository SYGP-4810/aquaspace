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
                    break;
                case '1':
                    //temporially blocked login failed
                    break;
                case '2':
                    //temporially block due to the issue
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
                $this->execute("UPDATE user_auth SET attempt = attempt + 1 WHERE email='{$this->data["userName"]}' OR mobile='{$this->data["userName"]}'");
                View::response("url to the redirect login page with the count of attemps");
            } else {
                $this->execute("UPDATE user_auth SET attempt = attempt + 1 user_statues = WHERE email='{$this->data["userName"]}' OR mobile='{$this->data["userName"]}'");
                view::response("redirect to the tempory block state ");
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