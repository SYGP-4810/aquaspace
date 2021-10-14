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
        $email = $this->data['email'];
        $password = $this->data['password'];
        $errors = [];
        $errFlag = 0;
        if (!isset($this->data['email'])) {
            array_push($errors, "email required.");
            $errFlag++;
        }
        if (!isset($this->data['password'])) {
            array_push($errors, "password required.");
            $errFlag++;
        }
        if ($errFlag > 0) {
            $res = ["status" => "7", "msg" => $errors];
            View::response($res);
        } else {
            $stmt = $this->execute($this->get('user_auth', "*", "email ='" . $email . "' AND password ='" . md5($password) . "'"));
            $rows = $stmt->rowCount();
            $result = $stmt->fetch();
            if ($rows == 1) {
                //Check wheather user able to login the system
                if ($result['user_status'] == 1) {
                    //temporially blocked login failed
                    $timeToEnd = time() - $result['attempt_time'];
                    $cookie_name = "timeToEnd";
                    $cookie_value = $timeToEnd;
                    setcookie($cookie_name, $cookie_value, time() + $timeToEnd, "/");
                    $res = array("status" => "1", "redirect" => "/aquaspace/src/error/restrict.html");
                    View::response($res);
                } elseif ($result['user_status'] == 2) {
                    //temporially block due to the issue
                    $res = array("status" => "2", "redirect" => "");
                    View::response($res);
                } elseif ($result['user_status'] == 3) {
                    //peromenatly block due to the issue
                    throw new \Exception("peromenatly blocked user", 404);
                } elseif ($result['user_status'] == 4) {
                    //active user

                    $payload = "{id:" . $result['id'] . ",email:'" . $result['email'] . "'}";
                    //set token
                    $this->setToken($payload, $result['id']);
                    //reset access_attept to zero
                    $time = time();
                    $this->execute("UPDATE user_auth SET attempt = 0, attempt_time = {$time} WHERE email='{$email}'");
                    //redirect to the user's  home here
                    $red = "/aquaspace/frontend/src/";
                    $res = array("status" => "3", "redirect" => $red);
                    View::response($res);
                } else {
                    //have not admin confirm 
                    $res = ["status" => "7", "redirect" => "/aquaspace/frontend/src/error/WaitUntilConfirm.html"];
                    View::response($res);
                }
            } elseif ($stmt->rowCount() > 1) {
                throw new \Exception("database error duplicate user accounts", 500);
            } else {
                $stmt = $this->execute($this->get('user_auth', "email ='" . $email . "'"));


                if ($stmt->fetch()['attepmt'] < 5) {
                    $time = time();
                    $this->execute("UPDATE user_auth SET attempt = attempt + 1 , attempt_time = '{$time}' WHERE email='{$email}' ");
                    $res = array("status" => "5", "redirect" => "", "attempt" => $stmt->fetch()['attempt']);
                    View::response($res);
                } else {
                    $timeToEnd = time() - $stmt->fetch()['attempt_time'];
                    $this->execute("UPDATE user_auth SET attempt = attempt + 1 user_statues = 5 WHERE email='{$email}'");
                    $cookie_name = "timeToEnd";
                    $cookie_value = $timeToEnd;
                    setcookie($cookie_name, $cookie_value, time() + $timeToEnd, "/");
                    $res = array("status" => "6", "redirect" => "/aquaspace/src/error/restrict.html");
                    View::response($res);
                }
            }
        }
    }

    public function requestLogoutAction()
    {
        setcookie("access_token", "", time() - 60 * 60 * 24 * 7, NULL, NULL, NULL, TRUE);
        $res = ["status" => "1", "msg" => "You have been logged out"];
        View::response($res);
    }

    public function signUpRegularUserAction()
    {
        $errFlag = 0;
        $errors = [];
        if (!isset($this->data['fName'])) {
            array_push($errors, "first name required.");
            $errFlag++;
        }

        if (!isset($this->data['lName'])) {
            array_push($errors, "last name required.");
            $errFlag++;
        }
        if (!isset($this->data['password'])) {
            array_push($errors, "password required.");
            $errFlag++;
        }
        if (!isset($this->data['cPassword'])) {
            array_push($errors, "confirm password required.");
            $errFlag++;
        }
        if (!isset($this->data['city'])) {
            array_push($errors, "city required.");
            $errFlag++;
        }
        if (!isset($this->data['address'])) {
            array_push($errors, "address required.");
            $errFlag++;
        }
        if (!isset($this->data['emailToken'])) {
            array_push($errors, "verification code required.");
            $errFlag++;
        }
        if (!isset($this->data['email'])) {
            array_push($errors, "verification code required.");
            $errFlag++;
        }
        if (!isset($this->data['tp'])) {
            array_push($errors, "telephone  required.");
            $errFlag++;
        }
        if ($errFlag > 0) {
            $res = array("status" => "0", "error" => $errors);
            View::response($res);
        } else {
            $fName = $this->data['fName'];
            $lName = $this->data['lName'];
            $password = $this->data['password'];
            $cPassword = $this->data['cPassword'];
            $city = $this->data['city'];
            $address = $this->data['address'];
            $token = $this->data['emailToken'];
            $email = $this->data['email'];
            $tp = $this->data['tp'];
            if (!(filter_var($email, FILTER_VALIDATE_EMAIL)
                && preg_match('/@.+\./', $email))) {
                $errFlag++;
                array_push($errors, "invalid email address");
            }
            $stmt = $this->execute($this->get('user_auth', "*", "email ='" . $this->data["email"] . "'"));
            if ($stmt->rowCount() > 0) {
                array_push($errors, "email is taken");
                $errFlag++;
            }
            if ($cPassword != $password) {
                array_push($errors, "password and confirm password are not same");
                $errFlag++;
            }
            $containsLetter  = preg_match('/[a-zA-Z]/',    $password);
            $containsDigit   = preg_match('/\d/',          $password);
            $containsSpecial = preg_match('/[^a-zA-Z\d]/', $password);
            if (!($containsSpecial && $containsDigit && $containsLetter)) {
                array_push($errors, "password should contain atleast one letter , one special character , one digit");
                $errFlag++;
            }
            if (strlen($password) < 8) {
                array_push($errors, "password should contain atleast 8 characters");
                $errFlag++;
            }


            if (md5($token) != $_COOKIE['emailToken']) {
                array_push($errors, "email is not verified");
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
                    "user_type" => "1",
                    "user_status" => "4"
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
    }

    public function signUpExpertAction()
    {
        $errFlag = 0;
        $errors = [];
        if (!isset($this->data['fName'])) {
            array_push($errors, "first name required.");
            $errFlag++;
        }

        if (!isset($this->data['lName'])) {
            array_push($errors, "last name required.");
            $errFlag++;
        }
        if (!isset($this->data['password'])) {
            array_push($errors, "password required.");
            $errFlag++;
        }
        if (!isset($this->data['cPassword'])) {
            array_push($errors, "confirm password required.");
            $errFlag++;
        }
        if (!isset($this->data['city'])) {
            array_push($errors, "city required.");
            $errFlag++;
        }
        if (!isset($this->data['address'])) {
            array_push($errors, "address required.");
            $errFlag++;
        }
        if (!isset($this->data['emailToken'])) {
            array_push($errors, "verification code required.");
            $errFlag++;
        }
        if (!isset($this->data['email'])) {
            array_push($errors, "verification code required.");
            $errFlag++;
        }
        if (!isset($this->data['tp'])) {
            array_push($errors, "telephone  required.");
            $errFlag++;
        }
        if (!isset($this->data['qualifications'])) {
            array_push($errors, "qualification  required.");
            $errFlag++;
        }
        if (!isset($this->data['qualificationExtension'])) {
            array_push($errors, "qualification extension did not come.");
            $errFlag++;
        }
        if ($errFlag > 0) {
            $res = array("status" => "0", "error" => $errors);
            View::response($res);
        } else {
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
            $acceptingFileTypes = ["png", "jpeg", "jpg"];
            if (!in_array($qualificationExtension, $acceptingFileTypes)) {
                array_push($errors, "file type is not accepted");
                $errFlag++;
            }
            if (!(filter_var($email, FILTER_VALIDATE_EMAIL)
                && preg_match('/@.+\./', $email))) {
                $errFlag++;
                array_push($errors, "invalid email address");
            }
            $stmt = $this->execute($this->get('user_auth', "*", "email ='" . $this->data["email"] . "'"));
            if ($stmt->rowCount() > 0) {
                array_push($errors, "email is taken");
                $errFlag++;
            }
            if ($cPassword != $password) {
                array_push($errors, "password and confirm password are not same");
                $errFlag++;
            }
            $containsLetter  = preg_match('/[a-zA-Z]/',    $password);
            $containsDigit   = preg_match('/\d/',          $password);
            $containsSpecial = preg_match('/[^a-zA-Z\d]/', $password);
            if (!($containsSpecial && $containsDigit && $containsLetter)) {
                array_push($errors, "password should contain atleast one letter , one special character , one digit");
                $errFlag++;
            }
            if (strlen($password) < 8) {
                array_push($errors, "password should contain atleast 8 characters");
                $errFlag++;
            }
            if (md5($token) != $_COOKIE['emailToken']) {
                array_push($errors, "email is not verified");
                $errFlag++;
            }
            $qName = "";
            if (strlen($qualifications) > 0) {
                $qName = round(microtime(true) * 1000) . ".txt";
                $qDir = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/qualifications/" . $qName;
                $flag = file_put_contents($qDir, $qualifications);
                if (!$flag) {
                    $errFlag++;
                    array_push($errors, "qualification is not inserted");
                }
            } else {
                array_push($errors, "qualification did not come to backend");
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
                    "user_status" => "5"
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
    }

    public function signUpStoreAction()
    {


        $errFlag = 0;
        $errors = [];

        if (!isset($this->data['deliveryMethod'])) {
            array_push($errors, "delevery method did not come to backend");
            $errFlag++;
        }
        if (!isset($this->data['regNo'])) {
            array_push($errors, "registration number required.");
            $errFlag++;
        }
        if (!isset($this->data['manNIC'])) {
            array_push($errors, "manager NIC required.");
            $errFlag++;
        }
        if (!isset($this->data['cName'])) {
            array_push($errors, "compnay name required.");
            $errFlag++;
        }

        if (!isset($this->data['manName'])) {
            array_push($errors, "manager name required.");
            $errFlag++;
        }
        if (!isset($this->data['password'])) {
            array_push($errors, "password required.");
            $errFlag++;
        }
        if (!isset($this->data['cPassword'])) {
            array_push($errors, "confirm password required.");
            $errFlag++;
        }
        if (!isset($this->data['city'])) {
            array_push($errors, "city required.");
            $errFlag++;
        }
        if (!isset($this->data['address'])) {
            array_push($errors, "address required.");
            $errFlag++;
        }
        if (!isset($this->data['emailToken'])) {
            array_push($errors, "verification code required.");
            $errFlag++;
        }
        if (!isset($this->data['email'])) {
            array_push($errors, "verification code required.");
            $errFlag++;
        }
        if (!isset($this->data['tp'])) {
            array_push($errors, "telephone  required.");
            $errFlag++;
        }
        if ($errFlag > 0) {
            $res = array("status" => "0", "error" => $errors);
            View::response($res);
        } else {
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
            if (!(filter_var($email, FILTER_VALIDATE_EMAIL)
                && preg_match('/@.+\./', $email))) {
                $errFlag++;
                array_push($errors, "invalid email address");
            }
            $stmt = $this->execute($this->get('user_auth', "*", "email ='" . $this->data["email"] . "'"));
            if ($stmt->rowCount() > 0) {
                array_push($errors, "email is taken");
                $errFlag++;
            }
            if ($cPassword != $password) {
                array_push($errors, "password and confirm password are not same");
                $errFlag++;
            }
            $containsLetter  = preg_match('/[a-zA-Z]/',    $password);
            $containsDigit   = preg_match('/\d/',          $password);
            $containsSpecial = preg_match('/[^a-zA-Z\d]/', $password);
            if (!($containsSpecial && $containsDigit && $containsLetter)) {
                array_push($errors, "password should contain atleast one letter , one special character , one digit");
                $errFlag++;
            }
            if (strlen($password) < 8) {
                array_push($errors, "password should contain atleast 8 characters");
                $errFlag++;
            }


            if (md5($token) != $_COOKIE['emailToken']) {
                array_push($errors, "email is not verified");
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
                    "user_type" => "3",
                    "user_status" => "5"
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
    }
    public function signUpAdminAction()
    {
    }
    public function emailVerificationTokenCreateAction()
    {
        $email = $this->data['email'];
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $res = ["status" => "1", "msg" => "invalid email address"];
            View::response($res);
            return;
        } else {
            $stmt = $this->execute($this->get('user_auth', "*", "email ='" . $this->data["email"] . "'"));
            if ($stmt->rowCount() > 0) {
                $res = ["status" => "2", "msg" => "email is taken"];
                View::response($res);
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
            $res = array("status" => "3", "msg" => "check your email");
            View::response($res);
        }
    }


    public function recoverEmailVerificationCreateAction()
    {
        $email = $this->data['email'];
        $stmt = $this->execute($this->get('user_auth', "*", "email='" . $email . "'"));
        $to = $email;
        $subject = "Aquaspace account recover";
        $nRows = $stmt->rowCount();

        if ($nRows == 1) {
            //update the password
            $time = time();
            $id = $stmt->fetch()['id'];
            $secret = "i am a" . md5($time) . " secrete";
            $idForLink = base64_encode($id) . "." . md5($secret);
            $link = $_SERVER['HTTP_HOST'] . "/aquaspace/frontend/src/recoveraccount.html?id=" . $idForLink;
            $msg = "
            <html>
<head>
<title>recover aquaspace account</title>
</head>
<body>
<div><a href='" . $link . "'>click here to recover your Aquspace account</a></div>
</body>
</html>
            
            ";
            $res = ["status" => "1", "msg" => "check your email"];
            $this->sendMail($to, $subject, $msg);
            View::response($res);
        } else if ($nRows == 0) {
            //send unsuccefull response
            $msg = "
            <html>
<head>
<title>recover aquaspace account</title>
</head>
<body>
<div><h3>you dont have an Aquaspace account</h3><div>
<div><a href='" . $_SERVER['HTTP_HOST'] . "/aquaspace/frontend/src/signup.html'>click here to create an Aquspace account</a></div>
</body>
</html>
            ";
            $res = ["status" => "2", "msg" => "you are not found"];
            $this->sendMail($to, $subject, $msg);
            View::response($res);
        } else {
            throw new \Exception("email repeat in authentication");
        }
    }

    public function recoverAction()
    {
        $idEncrypted = explode(".", $this->data['id']);
        $id = base64_decode($idEncrypted[0]);
        $stmt = $this->execute($this->get('user_auth', "*", "id ='" . $id . "'"));
        $nPassword = md5($this->data['password']);
        if ($stmt->rowCount() == 0) {
            $res = ["status" => "1", "msg" => "your link is broken try again with new link"];
        } else if ($stmt->rowCount() == 1) {
            if ($nPassword == $stmt->fetch()['password']) {
                $res = ["status" => "2", "msg" => "your new password and old password are equal try new password"];
            } else {
                $this->exec($this->update('user_auth', ["password" => $nPassword], "id='" . $id . "'"));
                $res = ["status" => "3", "msg" => "successfuly updated the password"];
            }
        } else {
            throw new \Exception("id repeat in authentication");
        }
        View::response($res);
    }

    public function userTypeIdentifyAction()
    {
        if (isset($_COOKIE['access_token'])) {
            $stmt = $this->execute($this->get('user_auth', "*", "access_token='" . $_COOKIE['access_token'] . "'"));
            if ($stmt->rowCount() == 1) {
                $type = $stmt->fetch()['user_type'];
                $row = $stmt->fetch();
            } else if ($stmt->rowCount() == 0) {
                $type = 0;
            } else {
                throw new \Exception("token repeat ");
            }
        } else {
            $type = 0;
        }
        if ($type == 0) {
            $res = [
                "status" => "0",
                "msg" => "user is not authenticated",
            ];
            View::response($res);
        } else {
            $res = [
                "status" => "1",
                "msg" => "user is authenticated",
                "type" => $type
            ];
            View::response($res);
        }
    }
}