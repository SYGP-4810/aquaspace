<?php

namespace App\Controllers;

use Core\View;


/**
 * authintication controller
 * 
 *
 * 
 */
class Authentication extends \Core\Controller
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
        $stmt = $this->execute($this->get('user_auth', 'email =' . $this->data["email"] . 'AND password =' . md5($this->data["password"])));
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
                    $timeToEnd = time() - $stmt->fetch()['attemp_time'];
                    $cookie_name = "timeToEnd";
                    $cookie_value = $timeToEnd;
                    setcookie($cookie_name, $cookie_value, time() + $timeToEnd, "/");
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
            $time = time();
            $this->execute("UPDATE user_auth SET attempt = 0, attemp_time = {$time} WHERE email='{$this->data["email"]}'");
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
            $res = array("status" => "3", "redirect" => $red);
            View::response($res);
        } elseif ($stmt->rowCount() > 1) {
            throw new \Exception("database error duplicate user accounts", 500);
        } else {
            $stmt = $this->execute($this->get('user_auth', 'email =' . $this->data["email"]));


            if ($stmt->fetch()['attepmt'] < 5) {
                $time = time();
                $this->execute("UPDATE user_auth SET attempt = attempt + 1 , attempt_time = {$time} WHERE email='{$this->data["email"]}' ");
                $res = array("status" => "5", "redirect" => "", "numberOfAttemp" => $stmt->fetch()['attempt']);
                View::response($res);
            } else {
                $timeToEnd = time() - $stmt->fetch()['attemp_time'];
                $this->execute("UPDATE user_auth SET attempt = attempt + 1 user_statues = 5 WHERE email='{$this->data["email"]}'");
                $cookie_name = "timeToEnd";
                $cookie_value = $timeToEnd;
                setcookie($cookie_name, $cookie_value, time() + $timeToEnd, "/");
                $res = array("status" => "3", "redirect" => $_SERVER['SERVER_NAME'] . "/aquaspace/src/error/restrict.html");
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

        $fName = $this->data['fName'];
        $lName = $this->data['lName'];
        $password = $this->data['password'];
        $cPassword = $this->data['cPassword'];
        $city = $this->data['city'];
        $address = $this->data['address'];
        $token = $this->data['emailToken'];
        $email = $this->data['email'];
        $tp = $this->data['tp'];
        $errFlag = 0;
        if (!(filter_var($email, FILTER_VALIDATE_EMAIL)
            && preg_match('/@.+\./', $email))) {
            $errFlag++;
            $errors[] = "invalid email address";
        }
        $stmt = $this->execute($this->get('user_auth', "*", "email ='" . $this->data["email"] . "'"));
        if ($stmt->rowCount() > 0) {
            $error[] = "email is taken";
            $errFlag++;
        }
        if ($cPassword != $password) {
            $errors[] = "password and confirm password are not same";
            $errFlag++;
        }
        $containsLetter  = preg_match('/[a-zA-Z]/',    $password);
        $containsDigit   = preg_match('/\d/',          $password);
        $containsSpecial = preg_match('/[^a-zA-Z\d]/', $password);
        if (!($containsSpecial && $containsDigit && $containsLetter)) {
            $errors[] = "password should contain atleast one letter , one special character , one digit";
            $errFlag++;
        }
        if (strlen($password) < 8) {
            $errors[] = "password should contain atleast 8 characters";
            $errFlag++;
        }
        if (empty($city)) {
            $errors[] = "city is required";
            $errFlag++;
        }
        if (empty($address)) {
            $errors[] = "address is required";
            $errFlag++;
        }
        if (empty($fName)) {
            $errors[] = "first name is required";
            $errFlag++;
        }
        if (empty($lName)) {
            $errors[] = "last name is required";
            $errFlag++;
        }
        // if (md5($_COOKIE['emailToken']) != $token) {
        //     $errors[] = "email is not verified";
        //     $errFlag++;
        // }
        if ($errFlag > 0) {
            $res = array("status" => "0", "error" => $errors);
            View::response($res);
        } else {
            $dataToInsertAuthTable = [
                "email" => $email,
                "tp" => $tp,
                "password" => md5($password),
                "user_type" => "1",
                "user_status" => "1"
            ];
            $this->exec($this->save("user_auth", $dataToInsertAuthTable));
            $stmt = $this->execute($this->get('user_auth', "*", "email ='" . $this->data["email"] . "'"));
            $authId = $stmt->fetch()['id'];
            $dataToInsertRegularTable = [
                "first_name" => $fName,
                "last_name" => $lName,
                "city" => $city,
                "address" => $address,
                "auth_id" => $authId
            ];
            $this->exec($this->save('regular_user', $dataToInsertRegularTable));
            $res = array("status" => "1", "msg" => "success");
            View::response($res);
        }
    }

    public function signUpExpertAction()
    {
        $fName = $this->data['fName'];
        $lName = $this->data['lName'];
        $password = $this->data['password'];
        $cPassword = $this->data['cPassword'];
        $city = $this->data['city'];
        $address = $this->data['address'];
        $token = $this->data['emailToken'];
        $email = $this->data['email'];
        $tp = $this->data['tp'];
        $qualifications = $this->data['qualifications'];
        $qualificationExtension = $this->data['qualificationExtension'];
        $errFlag = 0;
        $acceptingFileTypes = ["png", "jpeg", "jpg"];
        if (!in_array($qualificationExtension, $acceptingFileTypes)) {
            $errors[] = "file type is not accepted";
            $errFlag++;
        }
        if (!(filter_var($email, FILTER_VALIDATE_EMAIL)
            && preg_match('/@.+\./', $email))) {
            $errFlag++;
            $errors[] = "invalid email address";
        }
        $stmt = $this->execute($this->get('user_auth', "*", "email ='" . $this->data["email"] . "'"));
        if ($stmt->rowCount() > 0) {
            $error[] = "email is taken";
            $errFlag++;
        }
        if ($cPassword != $password) {
            $errors[] = "password and confirm password are not same";
            $errFlag++;
        }
        $containsLetter  = preg_match('/[a-zA-Z]/',    $password);
        $containsDigit   = preg_match('/\d/',          $password);
        $containsSpecial = preg_match('/[^a-zA-Z\d]/', $password);
        if (!($containsSpecial && $containsDigit && $containsLetter)) {
            $errors[] = "password should contain atleast one letter , one special character , one digit";
            $errFlag++;
        }
        if (strlen($password) < 8) {
            $errors[] = "password should contain atleast 8 characters";
            $errFlag++;
        }
        if (empty($city)) {
            $errors[] = "city is required";
            $errFlag++;
        }
        if (empty($address)) {
            $errors[] = "address is required";
            $errFlag++;
        }
        if (empty($fName)) {
            $errors[] = "first name is required";
            $errFlag++;
        }
        if (empty($lName)) {
            $errors[] = "last name is required";
            $errFlag++;
        }
        // if (md5($_COOKIE['emailToken']) != $token) {
        //     $errors[] = "email is not verified";
        //     $errFlag++;
        // }
        $qName = "";
        if (strlen($qualifications) > 0) {
            $qName = round(microtime(true) * 1000) . ".txt";
            $qDir = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/qualifications/" . $qName;
            $flag = file_put_contents($qDir, $qualifications);
            if (!$flag) {
                $errFlag++;
                $errors[] = "qualification is not inserted";
            }
        } else {
            $errors[] = "qualification did not come to backend";
            $errFlag++;
        }
        if ($errFlag > 0) {
            $res = array("status" => "0", "error" => $errors);
            View::response($res);
        } else {
            $dataToInsertAuthTable = [
                "email" => $email,
                "tp" => $tp,
                "password" => md5($password),
                "user_type" => "2",
                "user_status" => "1"
            ];
            $this->exec($this->save("user_auth", $dataToInsertAuthTable));
            $stmt = $this->execute($this->get('user_auth', "*", "email ='" . $this->data["email"] . "'"));
            $authId = $stmt->fetch()['id'];
            $dataToInsertExpertTable = [
                "first_name" => $fName,
                "last_name" => $lName,
                "city" => $city,
                "address" => $address,
                "auth_id" => $authId,
                "qualification" => $qName
            ];
            $this->exec($this->save('expert', $dataToInsertExpertTable));
            $res = array("status" => "1", "msg" => "success");
            View::response($res);
        }
    }

    public function signUpStoreAction()
    {

        $cName = $this->data['cName'];
        $manName = $this->data['manName'];
        $manNIC = $this->data['manNIC'];
        $regNo = $this->data['regNo'];
        $password = $this->data['password'];
        $cPassword = $this->data['cPassword'];
        $city = $this->data['city'];
        $address = $this->data['address'];
        $token = $this->data['emailToken'];
        $email = $this->data['email'];
        $tp = $this->data['tp'];
        $delMode = $this->data['deliveryMethod'];
        $errFlag = 0;
        if (!(filter_var($email, FILTER_VALIDATE_EMAIL)
            && preg_match('/@.+\./', $email))) {
            $errFlag++;
            $errors[] = "invalid email address";
        }
        $stmt = $this->execute($this->get('user_auth', "*", "email ='" . $this->data["email"] . "'"));
        if ($stmt->rowCount() > 0) {
            $error[] = "email is taken";
            $errFlag++;
        }
        if ($cPassword != $password) {
            $errors[] = "password and confirm password are not same";
            $errFlag++;
        }
        $containsLetter  = preg_match('/[a-zA-Z]/',    $password);
        $containsDigit   = preg_match('/\d/',          $password);
        $containsSpecial = preg_match('/[^a-zA-Z\d]/', $password);
        if (!($containsSpecial && $containsDigit && $containsLetter)) {
            $errors[] = "password should contain atleast one letter , one special character , one digit";
            $errFlag++;
        }
        if (strlen($password) < 8) {
            $errors[] = "password should contain atleast 8 characters";
            $errFlag++;
        }
        if (empty($city)) {
            $errors[] = "city is required";
            $errFlag++;
        }
        if (empty($address)) {
            $errors[] = "address is required";
            $errFlag++;
        }
        if (empty($cName)) {
            $errors[] = "company name is required";
            $errFlag++;
        }
        if (empty($manNIC)) {
            $errors[] = "manager NIC is required";
            $errFlag++;
        }
        if (empty($manName)) {
            $errors[] = "manager name is required";
            $errFlag++;
        }
        if (empty($regNo)) {
            $errors[] = "registration number is required";
            $errFlag++;
        }
        if (empty($delMode)) {
            $errors[] = "atleast one of delivery method is required";
            $errFlag++;
        }

        // if (md5($_COOKIE['emailToken']) != $token) {
        //     $errors[] = "email is not verified";
        //     $errFlag++;
        // }
        if ($errFlag > 0) {
            $res = array("status" => "0", "error" => $errors);
            View::response($res);
        } else {
            $dataToInsertAuthTable = [
                "email" => $email,
                "tp" => $tp,
                "password" => md5($password),
                "user_type" => "3",
                "user_status" => "1"
            ];
            $this->exec($this->save("user_auth", $dataToInsertAuthTable));
            $stmt = $this->execute($this->get('user_auth', "*", "email ='" . $this->data["email"] . "'"));
            $authId = $stmt->fetch()['id'];
            $dataToInsertStoreTable = [
                "company_name" => $cName,
                "city" => $city,
                "address" => $address,
                "auth_id" => $authId,
                "man_name" => $manName,
                "man_nic" => $manNIC,
                "registration_num" => $regNo,
                "del_mode" => $delMode

            ];
            $this->exec($this->save('store', $dataToInsertStoreTable));
            $res = array("status" => "1", "msg" => "success");
            View::response($res);
        }
    }
    public function signUpAdminAction()
    {
    }
    public function emailVerificationTokenCreateAction()
    {
        $email = $this->data['email'];
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            View::response("invalid email");
            return;
        } else {
            $stmt = $this->execute($this->get('user_auth', "*", "email ='" . $this->data["email"] . "'"));
            if ($stmt->rowCount() > 0) {
                View::response("email is taken");
                return;
            }
            $num_str = sprintf("%06d", mt_rand(1, 999999));
            $email = $this->data['email'];
            setcookie("emailToken", md5($num_str), time() + 60 * 60 * 24, NULL, NULL, NULL, TRUE);
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
            $this->sendMail($to, $subject, $message);
            $res = array("status" => "1", "msg" => "check your email");
            View::response($res);
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