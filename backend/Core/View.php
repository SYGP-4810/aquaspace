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
     * send response to the view file
     *
     * @param array $args  Associative array of data to display from the front end
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