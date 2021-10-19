<?php

namespace App\Controllers;

use Core\View;


/**
 * authintication controller
 * 
 *
 * 
 */
class Common extends \Core\Controller
{

    /**
     * Before filter
     *
     * @return void
     */
    protected function before()
    {
    }

    public function getProductAction()
    {
        $stmt = $this->execute($this->get('products', "*", "id ='" . $this->data['id'] . "'"));
        View::response($stmt->fetch());
    }


}    