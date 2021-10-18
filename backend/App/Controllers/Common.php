<?php

namespace App\Controllers;

use Core\View;

class Common extends \Core\Controller
{
    public function getLandingPagePostAction()
    {
        $stmtForNewPost = $this->execute("SELECT DISTINCT(products.id),products.product_name, COUNT(product_order.product_id) AS countOfRating, sum(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id AND products.id IN (SELECT id FROM products WHERE status='1' ORDER BY id DESC) LIMIT 4;");
        $stmtForFish = $this->execute("SELECT DISTINCT(products.id),products.product_name, COUNT(product_order.product_id) AS countOfRating, sum(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id AND products.id IN (SELECT id FROM products WHERE status='1' AND type='1' ORDER BY id DESC) LIMIT 4;");
        $stmtForPlant = $this->execute("SELECT DISTINCT(products.id),products.product_name, COUNT(product_order.product_id) AS countOfRating, sum(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id AND products.id IN (SELECT id FROM products WHERE status='1' AND type='2' ORDER BY id DESC) LIMIT 4;");
        $stmtForeq = $this->execute("SELECT DISTINCT(products.id),products.product_name, COUNT(product_order.product_id) AS countOfRating, sum(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id AND products.id IN (SELECT id FROM products WHERE status='1' AND type='3' ORDER BY id DESC) LIMIT 4;");
        View::response([
            "newPost" => $stmtForNewPost->fetchAll(),
            "fishPost" => $stmtForFish->fetchAll(),
            "plantPost" => $stmtForPlant->fetchAll(),
            "eqPost" => $stmtForeq->fetchAll()
        ]);
    }
}