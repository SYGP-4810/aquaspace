<?php

namespace App\Controllers;

use Core\View;

class Common extends \Core\Controller
{
    public function getLandingPagePostAction()
    {
        $stmtForNewPost = $this->execute("SELECT products.id,products.product_name, COUNT(product_order.product_id) AS countOfRating, SUM(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id GROUP BY products.id ORDER BY products.id DESC LIMIT 4;");
        $stmtForFish = $this->execute("SELECT products.id,products.product_name, COUNT(product_order.product_id) AS countOfRating, SUM(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id AND products.type='1' GROUP BY products.id ORDER BY products.id DESC LIMIT 4;");
        $stmtForPlant = $this->execute("SELECT products.id,products.product_name, COUNT(product_order.product_id) AS countOfRating, SUM(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id AND products.type='2' GROUP BY products.id ORDER BY products.id DESC LIMIT 4;");
        $stmtForeq = $this->execute("SELECT products.id,products.product_name, COUNT(product_order.product_id) AS countOfRating, SUM(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id AND products.type='3' GROUP BY products.id ORDER BY products.id DESC LIMIT 4;");
        View::response([
            "newPost" => $stmtForNewPost->fetchAll(),
            "fishPost" => $stmtForFish->fetchAll(),
            "plantPost" => $stmtForPlant->fetchAll(),
            "eqPost" => $stmtForeq->fetchAll()
        ]);
    }

    public function getProductAction()
    {
        $stmt = $this->execute($this->get('products', "*", "id ='" . $this->data['id'] . "'"));
        View::response($stmt->fetch());
    }
}