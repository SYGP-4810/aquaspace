<?php

namespace App\Controllers;

use Core\View;

/***
 * common controller for all users
 */
class Common extends \Core\Controller
{
    //get product details which shows in landing page
    public function getLandingPagePostAction()
    {
        $stmtForNewPost = $this->execute("SELECT * FROM products WHERE status='1' ORDER BY id DESC LIMIT 4");
        $stmtForFish = $this->execute("SELECT products.id,products.product_name, COUNT(product_order.product_id) AS countOfRating, SUM(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id AND products.type='1' GROUP BY products.id ORDER BY products.id DESC LIMIT 4;");
        $stmtForPlant = $this->execute("SELECT products.id,products.product_name, COUNT(product_order.product_id) AS countOfRating, SUM(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id AND products.type='2' GROUP BY products.id ORDER BY products.id DESC LIMIT 4;");
        $stmtForeq = $this->execute("SELECT products.id,products.product_name, COUNT(product_order.product_id) AS countOfRating, SUM(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id AND products.type='3' GROUP BY products.id ORDER BY products.id DESC LIMIT 4;");
        $stmtForAdopt = $this->execute("SELECT * FROM products WHERE type='4' AND status='1' ORDER BY id DESC LIMIT 4");
        View::response([
            "newPost" => $stmtForNewPost->fetchAll(),
            "fishPost" => $stmtForFish->fetchAll(),
            "plantPost" => $stmtForPlant->fetchAll(),
            "eqPost" => $stmtForeq->fetchAll(),
            "adopt" => $stmtForAdopt->fetchAll()
        ]);
    }

    //get product details
    public function getProductAction()
    {
        $stmt = $this->execute($this->get('products', "*", "id ='" . $this->data['id'] . "'"));
        View::response($stmt->fetch());
    }

    public function getCategoryPostAction()
    {
        // $stmtForNewPost = $this->execute("SELECT * FROM products WHERE status='1' ORDER BY id DESC ");
        $stmtForAll = $this->execute("SELECT products.id,products.product_name, products.delivery,products.lat,products.lan,  COUNT(product_order.product_id) AS countOfRating, SUM(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id AND products.type !='4' GROUP BY products.id ORDER BY products.id DESC;");
        $stmtForFish = $this->execute("SELECT products.id,products.product_name, products.delivery, products.lat,products.lan,   COUNT(product_order.product_id) AS countOfRating, SUM(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id AND products.type='1' GROUP BY products.id ORDER BY products.id DESC;");
        $stmtForPlant = $this->execute("SELECT products.id,products.product_name, products.delivery, products.lat,products.lan,   COUNT(product_order.product_id) AS countOfRating, SUM(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id AND products.type='2' GROUP BY products.id ORDER BY products.id DESC;");
        $stmtForEq = $this->execute("SELECT products.id,products.product_name, products.delivery, products.lat,products.lan,   COUNT(product_order.product_id) AS countOfRating, SUM(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id AND products.type='3' GROUP BY products.id ORDER BY products.id DESC;");
        $stmtForAdopt = $this->execute("SELECT * FROM products WHERE type='4' AND status='1' ORDER BY id DESC");
        View::response([
            "allPost" => $stmtForAll->fetchAll(),
            "fishPost" => $stmtForFish->fetchAll(),
            "plantPost" => $stmtForPlant->fetchAll(),
            "eqPost" => $stmtForEq->fetchAll(),
            "adoptPost" => $stmtForAdopt->fetchAll()
        ]);
    }

    public function getProductLocationAction()
    {
        $stmtForAll = $this->execute("SELECT products.id,products.product_name,products.lat,products.lan, COUNT(product_order.product_id) AS countOfRating, SUM(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id AND products.type !='4' GROUP BY products.id ORDER BY products.id DESC;");
        $stmtForFish = $this->execute("SELECT products.id,products.product_name, products.lat,products.lan, COUNT(product_order.product_id) AS countOfRating, SUM(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id AND products.type='1' GROUP BY products.id ORDER BY products.id DESC;");
        $stmtForPlant = $this->execute("SELECT products.id,products.product_name, products.lat,products.lan,  COUNT(product_order.product_id) AS countOfRating, SUM(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id AND products.type='2' GROUP BY products.id ORDER BY products.id DESC;");
        $stmtForEq = $this->execute("SELECT products.id,products.product_name,products.lat,products.lan,  COUNT(product_order.product_id) AS countOfRating, SUM(selling_order.rating) AS sumOfRating, products.price,products.img1 FROM selling_order,product_order,products WHERE products.id=product_order.product_id AND selling_order.id=product_order.selling_order_id AND products.type='3' GROUP BY products.id ORDER BY products.id DESC;");
        $stmtForAdopt = $this->execute("SELECT * FROM products WHERE type='4' AND status='1' ORDER BY id DESC");
       
        View::response([
            "allPost" => $stmtForAll->fetchAll(),
            "fishPost" => $stmtForFish->fetchAll(),
            "plantPost" => $stmtForPlant->fetchAll(),
            "eqPost" => $stmtForEq->fetchAll(),
            "adoptPost" => $stmtForAdopt->fetchAll()
        ]);
        
    }

}