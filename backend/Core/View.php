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

    public static function response($args)
    {
        echo json_encode($args);
    }
}