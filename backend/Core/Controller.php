<?php

namespace Core;
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

/**
 * Base controller
 *
 * 
 */
class Controller extends \Core\Token
{

    /**
     * Parameters from the matched route
     * @var array
     */
    protected $route_params = [];
    protected $data = [];

    /**
     * Class constructor
     *
     * @param array $route_params  Parameters from the route
     * @param array $data any type of data except id 
     * @return void
     */
    public function __construct($route_params, $data = [])
    {
        $this->route_params = $route_params;
        $this->data = $data;
    }

    /**
     * Magic method called when a non-existent or inaccessible method is
     * called on an object of this class. Used to execute before and after
     * filter methods on action methods. Action methods need to be named
     * with an "Action" suffix, e.g. indexAction, showAction etc.
     *
     * @param string $name  Method name
     * @param array $args Arguments passed to the method
     *
     * @return void
     */
    public function __call($name, $args)
    {
        $method = $name . 'Action';

        if (method_exists($this, $method)) {
            if ($this->before() !== false) {
                call_user_func_array([$this, $method], $args);
                $this->after();
            } else {
                throw new \Exception("authorization failed", 403);
            }
        } else {
            throw new \Exception("Method $name not found in controller " . get_class($this));
        }
    }

    /**
     * Before filter - called before an action method.
     *
     * @return void
     */
    protected function before()
    {
    }

    /**
     * After filter - called after an action method.
     *
     * @return void
     */
    protected function after()
    {
    }

    /**
     * send email 
     * @param string $to : to whom you are sending the email
     * @param string $subject : subject of the email
     * @param string $message : message of the email
     */

    public function sendMail($to, $subject, $message)
    {





        //Create an instance; passing `true` enables exceptions
        $mail = new PHPMailer(true);

        //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'ssl://smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'aquaspaceg48@gmail.com'; //                     //SMTP username
        $mail->Password   = 'Aqua#2019';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom('aquaspaceg48@gmail.com', 'Admin');
        //Add a recipient
        $mail->addAddress($to);               //Name is optional

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body    = $message;
        $mail->send();
    }

    public function checkPermissions()
    {
        $userTypeAndId = [];
        if (isset($_COOKIE['emailToken'])) {
            $stmt = $this->execute($this->get('user_auth', "*", "access_token ='" . $_COOKIE['emailToken'] . "'"));
            if ($stmt->rowCount() > 1) {
                throw new \Exception("token repeat ");
            } else if ($stmt->rowCount() == 0) {
                $userTypeAndId['userType'] = 0;
                $userTypeAndId['id'] = null;
            } else {
                $userTypeAndId['userType'] = $stmt->fetch()['user_type'];
                $userTypeAndId['id'] = $stmt->fetch()['id'];
            }
        } else {
            $userTypeAndId['userType'] = 0;
            $userTypeAndId['id'] = null;
        }
    }
}