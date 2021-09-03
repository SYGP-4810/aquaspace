<?php

/**
 * Front controller
 *
 * 
 */

/**
 * Composer
 */
require '../vendor/autoload.php';




/**
 * Error and Exception handling
 */
error_reporting(E_ALL);
set_error_handler('Core\Error::errorHandler');
set_exception_handler('Core\Error::exceptionHandler');



/**
 * Routing
 */
$router = new Core\Router();

// Add the routes
//$router->add('', ['controller' => 'Home', 'action' => 'index']);
$router->add('{controller}/{action}');
$router->add('{controller}/{id:\d+}/{action}');
$router->add('admin/{controller}/{action}', ['namespace' => 'Admin']);

$reqData = json_decode(file_get_contents('php://input'), true);

$router->dispatch($_SERVER['QUERY_STRING'], $reqData);
//$reqData[0]->route param, $reqData[1] -> data if there is