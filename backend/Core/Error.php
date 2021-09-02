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
        http_response_code(200);

        if (\App\Config::SHOW_ERRORS) {
            $err =  "<h1>Fatal error</h1>";
            $err .= "<p> error code : " . $erCode . "</p>";
            $err .= "<p>Uncaught exception: '" . get_class($exception) . "'</p>";
            $err .= "<p>Message: '" . $exception->getMessage() . "'</p>";
            $err .= "<p>Stack trace:<pre>" . $exception->getTraceAsString() . "</pre></p>";
            $err .= "<p>Thrown in '" . $exception->getFile() . "' on line " . $exception->getLine() . "</p>";
            echo json_encode($err);
        } else {
            $log = dirname(__DIR__) . '/logs/' . date('Y-m-d') . '.txt';
            ini_set('error_log', $log);
            $message = "Uncaught exception: '" . get_class($exception) . "'";
            $message = "with error code : " . $erCode . "'";
            $message .= " with message '" . $exception->getMessage() . "'";
            $message .= "\nStack trace: " . $exception->getTraceAsString();
            $message .= "\nThrown in '" . $exception->getFile() . "' on line " . $exception->getLine();

            error_log($message);
            View::renderError("$code.html");
        }
    }
}