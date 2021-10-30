<?php

namespace App\Controllers\Admin;

use Core\View;


/**
 * User admin controller
 * just a sample of controller
 *
 * 
 */
class Users extends \Core\Controller
{

    /**
     * Before filter
     *
     * @return void
     */
    protected function before()
    {
        // Make sure an admin user is logged in for example
        // return false;
    }
}