<?php

namespace Core;


/**
 * Error and exception handler
 *
 * PHP version 5.4
 */
class Error
{

    /**
     * Error handler. Convert all errors to Exceptions by throwing an ErrorException.
     *
     * @param int $level  Error level
     * @param string $message  Error message
     * @param string $file  Filename the error was raised in
     * @param int $line  Line number in the file
     *
     * @return void
     */
    public static function errorHandler($level, $message, $file, $line)
    {
        if (error_reporting() !== 0) {  // to keep the @ operator working
            throw new \ErrorException($message, 0, $level, $file, $line);
        }
    }


    /**
     * Exception handler.
     *
     * @param Exception $exception  The exception
     *
     * @return void
     */
    public static function exceptionHandler($exception)
    {
        // Code is 404 (not found) or 500 (general error)
        $code = $exception->getCode();
        $erCode = $code;
        if ($code != 404) {
            $code = 500;
        }

        if (\App\Config::SHOW_ERRORS) {

            http_response_code(200);

            $errResponse = "<h1>Error occur</h1>";
            $errResponse .= "error code : " . $erCode . "\n";
            $errResponse .= "Uncaught exception: " . get_class($exception) . "\n";
            $errResponse .= "Message: " . $exception->getMessage() . "\n";
            $errResponse .= "Stack trace: " . $exception->getTraceAsString() . "\n";
            $errResponse .= "Thrown in " . $exception->getFile() . "' on line " . $exception->getLine();
            echo json_encode(nl2br($errResponse));
        } else {
            $log = dirname(__DIR__) . '/logs/' . date('Y-m-d') . '.txt';
            ini_set('error_log', $log);
            $message = "Uncaught exception: '" . get_class($exception) . "'";
            $message = "with error code : " . $erCode . "'";
            $message .= " with message '" . $exception->getMessage() . "'";
            $message .= "\nStack trace: " . $exception->getTraceAsString();
            $message .= "\nThrown in '" . $exception->getFile() . "' on line " . $exception->getLine();

            error_log($message);
            http_response_code($code);
        }
    }
}