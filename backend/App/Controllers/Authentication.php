<?php

namespace App\Controllers;

use Core\View;


/**
 * authintication controller
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
                    $timeToEnd = time() - $stmt->fetch()['attemp_time'];
                    $cookie_name = "timeToEnd";
                    $cookie_value = $timeToEnd;
                    setcookie($cookie_name, $cookie_value, time() + $timeToEnd, "/");
                    $res = array("status" => "2", "redirect" => "");
                    View::response($res);
                    break;
                case '3':
                    //peromenatly block due to the issue
                    throw new \Exception("peromenatly blocked user", 404);
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
            switch ($result['type']) {
                case '1':
                    $red = $_SERVER['SERVER_NAME'] . "/aquaspace/frontend/index.html";
                    break;
                case '2':
                    $red = $_SERVER['SERVER_NAME'] . "/aquaspace/frontend/expert/expert-dashboard.html";
                    break;
                case '3':
                    $red = $_SERVER['SERVER_NAME'] . "/aquaspace/frontend/store/store-dashboard.html";
                    break;
                case '4':
                    $red = $_SERVER['SERVER_NAME'] . "/aquaspace/frontend/admin/admin-dashbord.html";
                    break;
                default:
                    //No default
                    break;
            }
            $res = array("status" => "4", "redirect" => $red);
            View::response($res);
        } elseif ($stmt->rowCount() > 1) {
            throw new \Exception("database error duplicate user accounts", 500);
        } else {
            $stmt = $this->execute($this->get('user_auth', 'email =' . $this->data["email"] . " OR mobile =" . $this->data["mobile"]));


            if ($stmt->fetch()['attepmt'] < 5) {
                $time = time();
                $this->execute("UPDATE user_auth SET attempt = attempt + 1 , attempt_time = {$time} WHERE email='{$this->data["userName"]}' OR mobile='{$this->data["userName"]}'");
                $res = array("status" => "3", "redirect" => "", "numberOfAttemp" => $stmt->fetch()['attempt']);
                View::response($res);
            } else {
                $timeToEnd = time() - $stmt->fetch()['attemp_time'];
                $this->execute("UPDATE user_auth SET attempt = attempt + 1 user_statues = 5 WHERE email='{$this->data["userName"]}' OR mobile='{$this->data["userName"]}'");
                $cookie_name = "timeToEnd";
                $cookie_value = $timeToEnd;
                setcookie($cookie_name, $cookie_value, time() + $timeToEnd, "/");
                $res = array("status" => "4", "redirect" => $_SERVER['SERVER_NAME'] . "/aquaspace/src/error/timeout.html");
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

    public function signUpRegularUserAction()
    {
    }

    public function signUpExpertAction()
    {
    }

    public function signUpAdminAction()
    {
    }
    public function emailVerificationTokenCreateAction()
    {
        $num_str = sprintf("%06d", mt_rand(1, 999999));
        $email = $this->data['email'];
        setcookie("emailToken", md5($num_str), time() + 60 * 5, NULL, NULL, NULL, TRUE);
        $to = $email;
        $subject = "email verification";

        $message = "
<html>
<head>
<title>verify aquaspace account</title>
</head>
<body>
<div>Your verification code : " . $num_str . "</div>
</body>
</html>
";

        // Always set content-type when sending HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

        // More headers
        // $headers .= 'From: <webmaster@example.com>' . "\r\n";
        // $headers .= 'Cc: myboss@example.com' . "\r\n";

        mail($to, $subject, $message, $headers);
        View::response("check your inbox");
    }
    public function emailVerifyAction()
    {
        if (isset($_COOKIE['emailToken'])) {
            if (md5($this->data['emailToken']) == $_COOKIE['emailToken']) {
                View::response();
            } else {
                View::response();
            }
        } else {
            View::response();
        }
    }

    public function emailRecoveryAction()
    {
        $email = $this->data['email'];
        if (isset($email)) {


            $stmt = $this->execute($this->get('user_auth', 'email =' . $this->data['email']));
            $rows = $stmt->rowCount();
            $result = $stmt->fetch();
            if ($rows == 1) {
                if ($result['user_status'] == 4) {
                    $id = $result['id'];
                    $time = time();
                    $secret = "i am a" . md5($time) . " secrete";
                    $idForLink = base64_encode($id) . "." . md5($secret);
                    $link = $_SERVER['name'] . "frontend/recoveraccount.html?id" . $idForLink;
                    $link = "have to create";
                    $to = $email;
                    $subject = "email verification";

                    $message = "
<html>
<head>
<title>recover aquaspace account</title>
</head>
<body>
<div><a href='" . $link . "'>click here to recover your aquspace account</a></div>
</body>
</html>
";

                    // Always set content-type when sending HTML email
                    $headers = "MIME-Version: 1.0" . "\r\n";
                    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

                    // More headers
                    // $headers .= 'From: <webmaster@example.com>' . "\r\n";
                    // $headers .= 'Cc: myboss@example.com' . "\r\n";

                    mail($to, $subject, $message, $headers);
                    View::response("check your inbox");
                } else {
                    View::response("can not recover at the moment");
                }
            } else {
                View::response("could not found the account");
            }
        } else {
            View::response("have to enter email");
        }
    }

    public function recoverEmailVerificationAction()
    {
        $encryptedMsg = $this->data['id'];
        $encryptedId = explode('.', $encryptedMsg);
        $id = base64_decode($encryptedId[0]);
        $stmt = $this->execute($this->get('user_auth', "id=" . $id));
        if ($stmt->rowCount == 1) {
            //update the password

        } else {
            //send unsuccefull response
        }
    }
}