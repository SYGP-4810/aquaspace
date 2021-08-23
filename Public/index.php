<?php


/**
 *Front Controller 

 */


/**
 * Autoloader
 */

spl_autoload_register(function ($class) {
    $root = dirname(__DIR__);   // get the parent directory
    $file = $root . '/' . str_replace('\\', '/', $class) . '.php';
    if (is_readable($file)) {
        require_once $root . '/' . str_replace('\\', '/', $class) . '.php';
    }
});


/**
 * Error and Exception handling
 * this will get serverside all errors
 */
error_reporting(E_ALL);
set_error_handler('Core\Error::errorHandler');
set_exception_handler('Core\Error::exceptionHandler');




/**
 * get the action,controller,namespace throgh json 
 */
//get json values
$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['namespace'])) {
    $params['namespace'] = $data['namespace'];
}
if (isset($data['data'])) {
    $params['data'] = $data['data'];
}
if (isset($data['controller'])) {
    $params['controller'] = $data['controller'];
} else {
    throw new \Exception("controller is not set");
}
if (isset($data['action'])) {
    $params['action'] = $data['action'];
} else {
    throw new \Exception("action is not set");
}





/**
 * Convert the string with hyphens to StudlyCaps,
 * e.g. post-authors => PostAuthors
 *
 * @param string $string The string to convert
 *
 * @return string
 */
function convertToStudlyCaps($str)
{
    return str_replace(' ', '', ucwords(str_replace('-', ' ', $str)));
}


/**
 * Convert the string with hyphens to camelCase,
 * e.g. add-new => addNew
 *
 * @param string $string The string to convert
 *
 * @return string
 */
function convertToCamelCase($string)
{
    return lcfirst(convertToStudlyCaps($string));
}
/**
 * reequire controllers
 */

/**
 * Routing
 */

$namespace = 'App\Controllers\\'; //default namespace
if (array_key_exists('namespace', $params)) {
    $namespace .= $params['namespace'] . '\\';
}
$controller = $params['controller'];
$controller = convertToStudlyCaps($controller);
$controller = $namespace . $controller;

if (class_exists($controller)) {
    $controller_object = new $controller($params);

    $action = $params['action'];
    $action = $convertToCamelCase($action);

    if (is_callable([$controller_object, $action])) {
        $controller_object->$action();
    } else {
        throw new \Exception("Method $action (in controller $controller) not found");
    }
} else {
    throw new \Exception("Controller class $controller not found");
}