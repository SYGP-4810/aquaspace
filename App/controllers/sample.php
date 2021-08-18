<?php

namespace App\Controllers\Admin;


class Users extends \Core\Controller
{

    /**
     * $data array for sending json response use after funtion for that
     * 
     */

    private $data = array();

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

    /**
     * Show the index page
     *
     * @return void
     */
    public function indexAction()
    {
        echo 'User admin index';
    }

    protected function after(){
        //make sure send response as json
    }
}