<?php

namespace Core;

/**
 * View
 *
 * 
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

    public static function response($args = [])
    {
        if (sizeof($args) != 0) {
            echo json_encode($args);
        } else {
            //if no result then print something
        }
    }
}