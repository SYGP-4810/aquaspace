<?php

namespace App\Controllers\Admin;


class Users extends \Core\Controller
{



    /**
     * Before filter
     *
     * @return void
     */
    public function before()
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
        $data['index'] =  "hello this is the index";
        $data['name'] = "hello world";
        $this->sendResponse($data);
    }

    public function after()
    {
    }
}