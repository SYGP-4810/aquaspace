<?php


/**
 *Front Controller 

 */

/**
 * Error and Exception handling
 * this will get serverside all errors
 */
error_reporting(E_ALL);
set_error_handler('Core\Error::errorHandler');
set_exception_handler('Core\Error::exceptionHandler');

/**
 * Autoloader
 */
 
spl_autoload_register(function ($class) {
    $root = dirname(__DIR__);   // get the parent directory
    $file = $root . '/' . str_replace('\\', '/', $class) . '.php';
    if (is_readable($file)) {
        require $root . '/' . str_replace('\\', '/', $class) . '.php';
    }
});

/**
 * get the action,controller,namespace throgh json 
 */
//get json values
$data = json_decode(file_get_contents('php://input'), true);
$params['namespace'] = isset($data['user']) ? $data['user'] : '';
$params['controller'] = isset($data['controller']) ? $data['controller'] : null;
$params['action'] = isset($data['action']) ? $data['action'] : null;



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

?>