<?php

/**
 * Front controller
 *
 * 
 */

/**
 * Composer autoloader for autoloading classes and require file
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
$router->add('Admin/{controller}/{action}', ['namespace' => 'Admin']);
$router->add('Expert/{controller}/{action}', ['namespace' => 'Expert']);
$router->add('Reg/{controller}/{action}', ['namespace' => 'Reg']);


/**
 * @var array $reqData associative array of data which wouldnt send through the route parameter 
 */

$reqData = json_decode(file_get_contents('php://input'), true);

$router->dispatch($_SERVER['QUERY_STRING'], $reqData);