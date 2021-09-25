<?php

namespace Core;


/**
 * jwt token to authentication and authorization
 */
class Token extends \Core\Model
{
    private $token;

    private $SECRET = "aquaspace_SECRETE";
    private $header = "our secrete header";

    private $signature = "our secrete signature";

    private $payload;
    private $timevalue;

    private function setTimeValue()
    {
        $this->timevalue =  time();
    }

    protected function setToken($payload, $userId)
    {
        $this->payload = $payload;
        $this->setTimeValue();

        $stmt = $this->execute($this->get('user_auth', 'id', 'id=' . $userId));
        if ($stmt->rowCount() == 1) {
            $preInfo = base64_encode($this->header) . "." . base64_encode($this->payload);
            $info = $preInfo . "." . md5($this->SECRET . $this->timevalue);
            $this->signature = md5($info);

            $this->token = $preInfo . "." . $this->signature;
            $this->execute($this->update('user_auth', ['access_token' => $this->token], 'id=' . $userId));
            setcookie("access_token", $this->token, time() + 60 * 60 * 24 * 7, NULL, NULL, NULL, TRUE);
        } else {
            return false;
        }
    }

    protected function authorize()
    {
        if (!isset($_COOKIE["access_token"])) return false;
        return $this->execute($this->get('user_auth', 'access_token=' . $_COOKIE["access_token"]));
    }
}