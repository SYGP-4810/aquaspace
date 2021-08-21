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
        $this->data['index'] =  "hello this is the index";
    }

    public function after(){
        //make sure send response as json
        echo json_encode(isset($this->data) ? $this->data : null);
    }
}