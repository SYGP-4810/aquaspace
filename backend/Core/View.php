<?php

namespace Core;

/**
 * View
 *
 * PHP version 5.4
 */
class View
{

    /**
     * Render a view file
     *
     * @param string $view  The view file
     * @param array $args  Associative array of data to display in the view (optional)
     *
     * @return void
     */
    public static function renderError($view)
    {

        $file = "http://127.0.0.1/aquaspace/frontend/src/Error" . $view;  // relative to Core directory

        if (is_readable($file)) {
            header("Location : $file");
        } else {
            throw new \Exception("$file file not found");
        }
    }

    public static function response($args = [])
    {
        if (sizeof($args) != 0) {
            echo json_encode($args);
        } else {
            //if no result then print something
        }
    }
}