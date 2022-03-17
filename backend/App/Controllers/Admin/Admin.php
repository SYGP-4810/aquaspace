<?php

namespace App\Controllers\Admin;

use Core\View;


/**
 * admin controller
 *
 * 
 */
class Admin extends \Core\Controller
{
   
   
    protected function before()
    {
        // Make sure an admin user is logged in for example
        // return false;
    }

    //add new admins to the system
    public function addAdminAction()
    {
        $num_str = sprintf("%06d", mt_rand(1, 999999));
        $password = "Admin@" . $num_str;
        $stmt = $this->execute($this->get('user_auth', '*', "email='" . $this->data['email'] . "'"));
        if ($stmt->rowCount() > 0) {
            View::response([
                "status" => 0,
                "msg" => "email is taken"
            ]);
        } else {
            $dataToInsertAuthTable = [
                "email" => $this->data['email'],
                "tp" => $this->data['telNo'],
                "password" => md5($password),
                "user_type" => "4",
                "user_status" => "4"
            ];
            $this->exec($this->save('user_auth', $dataToInsertAuthTable));
            $stmt = $this->execute($this->get('user_auth', "*", "email ='" . $this->data["email"] . "'"));
            $authId = $stmt->fetch()['id'];
            $dataToInsertAdminTable = [
                "auth_id" => $authId,
                "first_name" => $this->data['fName'],
                "last_name" => $this->data['lName'],
                "address" => $this->data['address'],
                "city" => $this->data['city']
            ];
            $this->exec($this->save('admin', $dataToInsertAdminTable));
            $to = $this->data['email'];
            $subject = "posted as aquaspace admin";
            $message = "
            <html>
            <head>
            <title>posted as an aquaspace admin</title>
            </head>
            <body>
            <p>your email can login to the aquaspace by using follwing password</p>
            <div>Your Password : " . $password . "</div>
            </body>
            </html>
            ";
            $this->sendMail($to, $subject, $message);
            View::response(["status" => 2, "msg" => "successfully added the admin to the system"]);
        }
    }

    //get logged in admins details
    public function getAdminAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token ='" . $_COOKIE['access_token'] . "'" . " AND user_type='4'"));
        $result = $stmt->fetch();
        $id = $result['id'];
        $stmt = $this->execute($this->get('admin', "*", "auth_id ='" . $id . "'"));
        $result2 = $stmt->fetch();
        $res = [
            "fName" => $result2['first_name'],
            "lName" => $result2['last_name'],
            "email" => $result['email'],
            "address" => $result2['address'],
            "city" => $result2['city'],
            "tp" => $result['tp'],
            "profile_img" => $result['profile_img']
        ];
        View::response($res);
    }

    //get all admins details
    public function getAdminListAction()
    {
        $stmt = $this->execute($this->join("user_auth, admin", "email,tp,user_auth.id AS id,first_name,last_name,profile_img", "user_auth.id = admin.auth_id"));
        $result = $stmt->fetchAll();
        View::response($result);
    }

    //get individual profile of admin by using id
    public function getAdminDetailsAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "id ='" . $this->data['id'] . "'"));
        $result = $stmt->fetch();
        $stmt = $this->execute($this->get('admin', "*", "auth_id ='" . $this->data['id'] . "'"));
        $result2 = $stmt->fetch();
        $res = [
            "fName" => $result2['first_name'],
            "lName" => $result2['last_name'],
            "email" => $result['email'],
            "address" => $result2['address'],
            "city" => $result2['city'],
            "tp" => $result['tp'],
            "profile_img" => $result['profile_img']
        ];
        View::response($res);
    }

    //get store,expert accounts which are not verified yet
    public function getAdminVerifyDetailsAction()
    {
        $stmt = $this->execute($this->get('user_auth', " id,email,user_type,tp ", "user_status ='5'"));
        View::response($stmt->fetchAll());
    }

    //get expert details to verify 
    public function getAdminVerifyDetailsExpertAction()
    {
        $stmt = $this->execute($this->get('expert', "*", "auth_id ='" . $this->data['id'] . "'"));
        $res['expert'] = $stmt->fetch();
        $res['user'] = $this->execute($this->get('user_auth', "tp,email", "id='" . $this->data['id'] . "'"))->fetch();
        View::response($res);
    }

    //get expert details to verify
    public function getAdminVerifyDetailsStoreAction()
    {
        $stmt = $this->execute($this->get('store', "*", "auth_id ='" . $this->data['id'] . "'"));
        View::response($stmt->fetch());
    }

    //update new expert,store account as verified accounts
    public function getAdminVerifyDetailsAcceptAction()
    {
        $dataToUpdate = ["user_status" => "4"];
        $this->exec($this->update('user_auth', $dataToUpdate, "id='" . $this->data['id'] . "'"));
        $stmt = $this->execute($this->get('user_auth', "*", " id='" . $this->data['id'] . "'"));
        $to = $stmt->fetch()['email'];
        $subject = "about accepting your account in aquaspace";
        $msg = "
        <html>
            <head><title>About accepting your account in aquaspace</title></head>
            <body>
                <p>your account has been accepted<p>
                <a href='" . $_SERVER['HTTP_HOST'] . "/aquaspace/frontend/src/login.html" . "'>Click here to login</a>
            </body>
        </html>>
        ";
        $this->sendMail($to, $subject, $msg);
        View::response("successfully confirm user");
    }

    //reject new store,expert accounts 
    public function getAdminVerifyDetailsRejectAction()
    {
        $dataToUpdate = ["user_status" => "3"];
        $this->exec($this->update('user_auth', $dataToUpdate, "id='" . $this->data['id'] . "'"));
        if ($this->data['type'] == 2) {
            $this->exec($this->delete('expert', " auth_id='" . $this->data['id'] . "'"));
        } else if ($this->data['type'] == 3) {
            $this->exec($this->delete('store', " auth_id='" . $this->data['id'] . "'"));
        }
        $stmt = $this->execute($this->get('user_auth', "*", " id='" . $this->data['id'] . "'"));
        $to = $stmt->fetch()['email'];
        $subject = "about rejecting your account in aquaspace";
        $msg = "
        <html>
            <head><title>About accepting your account in aquaspace</title></head>
            <body>
                <p>your account has been rejected<p>
                <p>sorry for the troubles!</p>
            </body>
        </html>>
        ";
        $this->sendMail($to, $subject, $msg);

        View::response("successfully Reject user");
    }

    //logged in admin password reset 
    public function updatePasswordAction()
    {
        $stmt = $this->execute($this->get('user_auth', "*", "access_token='" . $_COOKIE['access_token'] . "'"));
        $result = $stmt->fetch();
        $errFlag = 0;
        if ($result['password'] != md5($this->data['currentPassword'])) {
            $res = ["status" => 1, "msg" => "Your current password does not match"];
            $errFlag++;
        }
        if ($result['password'] == md5($this->data['newPassword'])) {
            $res = ["status" => 2, "msg" => "current password should not be matched to the new password"];
            $errFlag++;
        }
        if ($errFlag == 0) {
            $dataToUpdate = [
                "password" => md5($this->data['newPassword'])
            ];
            $this->exec($this->update('user_auth', $dataToUpdate, "access_token='" . $_COOKIE['access_token'] . "'"));
            $res = ["status" => 3, "msg" => "successfully updated your password"];
        }
        View::response($res);
    }

    //update logged in admins's details
    public function updateAdminAction()
    {

        $stmt = $this->execute($this->get('user_auth', '*', "access_token ='" . $_COOKIE['access_token'] . "'"));
        $result = $stmt->fetch();
        $updateData = [
            "first_name" => $this->data['fName'],
            "last_name" => $this->data['lName'],
            "address" => $this->data['address'],
            "city" => $this->data['city']
        ];
        $ext = array("jpg", "png", "jpeg");
        if (in_array($this->data['exen'], $ext)) {
            $iName1 = "";
            $iName1 =  microtime(true) . "." . $this->data['exen'];
            $iDir1 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/profile/" . $iName1;
            $flag1 = file_put_contents($iDir1, base64_decode($this->data['pic']));
            if (!$flag1) {
                throw new \Exception("file did not come to the backend");
            }
            if (file_exists("/aquaspace/frontend/images/profile/" . $result['profile_img'])) {
                //delete photo from the directory
                unlink("/aquaspace/frontend/images/profile/" . $result['profile_img']);
            }
            $this->exec($this->update('user_auth', ["tp" => $this->data['tp'], "profile_img" => $iName1], "id='" . $result['id'] . "'"));
        } else {
            $this->exec($this->update('user_auth', ["tp" => $this->data['tp']], "id='" . $result['id'] . "'"));
        }


        $this->exec($this->update('admin', $updateData, "auth_id='" . $result['id'] . "'"));
        View::response("Successfully updated");
    }

    //get the list of charges 
    public function getRateAction()
    {
        View::response($this->execute($this->getAll('rate', '*'))->fetchAll());
    }

    //update the list of charges
    public function updateRateAction(){
        $i = 0;
        while($i < count($this->data)){
            $this->exec($this->update("rate", ["rate"=>$this->data[$i]], "id='" . ++$i . "'"));
        }
        view::response("successfully updated");

    }

    //get the appeals for individual posts
    public function getAppealAction(){
        $needToBeExtract = "appeal.appeal , appeal.product_id, products.product_name, products.img1";
        $tablesWhichDataContains = "appeal , products";
        $condition = "appeal.product_id = products.id AND products.status = '4'";
        $sql = $this->join($tablesWhichDataContains,$needToBeExtract,$condition);
        View::response($this->execute($sql)->fetchAll());
    }

    //get reasons for the appeals of individual posts
    public function getReasonsAppealAction(){
        View::response($this->execute($this->get("report","*","product_id='". $this->data['productId'] . "'"))->fetchAll());
    }

    //unblock the blocked product 
    public function unblockProductAction(){
        $result = $this->execute($this->get('products','*',"id='". $this->data['productId']."'"))->fetch();
        $id = $result['auth_id'];
        $this->notifyOther($id,"your appeal declined");
        $dataToBeUpdate = [
            "status" => "1"
        ];
        $this->exec($this->update("products",$dataToBeUpdate,"id='". $this->data['productId'] . "'"));
        //send an email about product unblock
        View::response("successfully updated");
    }

    //decline the appeal for a product
    public function declineAppealAction(){
        $result = $this->execute($this->get('products','*',"id='". $this->data['productId']."'"))->fetch();
        $id = $result['auth_id'];
        $this->exec($this->update("products",["status" => '5'],"id='".$this->data['productId']. "'"));
        $this->notifyOther($id,"your appeal declined");
        //send an email about decline unblocking the product
        View::response("successfully decline the appeal for the product ".$result['product_name']);
    }

    //get the users who sent appeals to unblock account
    public function getUserAppealAction(){
        $dataColumn = "user_auth.email, user_auth.profile_img,user_auth.user_type, user_appeal.appeal,user_appeal.auth_id";
        $tables = "user_appeal, user_auth";
        $condition = "user_auth.id=user_appeal.auth_id AND user_auth.user_status='3' AND user_appeal.status='1'";
        $sql = $this->join($tables,$dataColumn,$condition);
        // View::response($sql);
        View::response($this->execute($sql)->fetchAll());
    }
    
    //get products which are blocked when user is blocked
    public function getProductsBlockedAction(){
        $id = $this->execute($this->get('user_auth','id',"email='" . $this->data['email']."'"))->fetch()['id'];
        View::response($this->execute($this->get('products','*',"status='4' AND auth_id='".$id."'"))->fetchAll());
    }

    //unblock the account according to the appeal
    public function unblockAccountForAppealAction(){
        $data = [
            "user_status" => "4"
        ];
        $email = $this->data['email'];
        $condition = "email='" . $this->data['email'] . "'";
        $this->exec($this->update('user_auth',$data,$condition));
        $id = $this->execute($this->get('user_auth','id',"email='" . $this->data['email'] . "'"))->fetch()['id'];
        $dataProduct = [
            "status" => "2"
        ];
        $conditionProduct = "auth_id='" . $id."'";
        $this->exec($this->update('products',$dataProduct,$conditionProduct));
        $this->exec($this->update('user_appeal',$dataProduct,$conditionProduct));
        $this->notifyOther($this->data['userId'],"now you can work as normal you have been unblocked");
        $msg = "
            <html>
                </head>
                    <title>Aquaspace</title>
                </head>
                <body>
                <p>You have been unblocked successfully . thank you for been a user of aquaspace</p>
                </body>
            </html>
            ";
        $this->sendMail($email,"about unblocking your aquaspace account",$msg);
        View::response("successfully unblock the account");
    }

    //decline the appeal for the account accourding to the appeal account
    public function declineAccountForAppealAction(){
        $id = $this->execute($this->get('user_auth','id',"email='" . $this->data['email'] . "'"))->fetch()['id'];
        $data = [
            "status" => "2"
        ];
        $this->exec($this->update('user_appeal',$data,"auth_id='" . $id . "'"));
        $msg = "
            <html>
                </head></head>
                <body>
                <p>Your appeal for the account has been declined. thank you for been a user of aquaspace</p>
                </body>
            </html>
            ";
        $email = $this->data['email'];
        $this->sendMail($email,"about Your aquaspace account appeal ",$msg);
        View::response("successfully decline the account");
    }

    //get total number of article expert write
    public function tNumArticle(){
        $sql = "SELECT COUNT(id) AS tNumOfArtcle FROM fish_article";
        // View::response($this->execute($sql)->fetch()['tNumOfArtcle']);
        return $this->execute($sql)->fetch()['tNumOfArtcle'];
    }

    //get total number of question expert answered
    public function tNumQuestion(){
        $sql = "SELECT COUNT(id) AS tNumOfQuestion FROM expert_question WHERE replyer_id IS NOT NULL";
        // View::response($this->execute($sql)->fetch()['tNumOfQuestion']);
        return $this->execute($sql)->fetch()['tNumOfQuestion'];
    }
    
    //get total number of posts verified by experts
    public function tNumPost(){
        $sql = "SELECT COUNT(id) AS tNumOfPost FROM products WHERE verifier_id IS NOT NULL";
        // View::response($this->execute($sql)->fetch()['tNumOfPost']);
        return $this->execute($sql)->fetch()['tNumOfPost'];
    }
    
    //get the total value for contribution
    public function countTotalContributionAction(){
        $tPost = $this->tNumPost();
        $tNumQuestion = $this->tNumQuestion();
        $tArticle = $this->tNumArticle();
        View::response($tPost*2+$tNumQuestion*3+$tArticle*10);
        

    }

    //get the total value for contribution (get best customer)
    private function countTotalContributions(){
        $tPost = $this->tNumPost();
        $tNumQuestion = $this->tNumQuestion();
        $tArticle = $this->tNumArticle();
        return ($tPost*2+$tNumQuestion*3+$tArticle*10);
        

    }

    //get contribution of experts
    public function getContributionAction(){
        $expertIds = $this->execute($this->get('user_auth','id',"user_type='2'"))->fetch();
        $i = 0;
        foreach($expertIds as $expertId){
            $sqlProduct = "SELECT COUNT(id) AS pCount FROM products WHERE verifier_id='".$expertId."'";
            $sqlArticle = "SELECT COUNT(id) AS aCount FROM fish_article WHERE auth_id='".$expertId."'";
            $sqlQuestion = "SELECT COUNT(id) AS qCount FROM expert_question WHERE replyer_id='".$expertId."'";
            $reExpert = $this->execute($this->get('expert','*',"auth_id='".$expertId."'"))->fetch(); 
            $res[$i] = [
                "productCount" => $this->execute($sqlProduct)->fetch()['pCount'],
                "articleCount" => $this->execute($sqlArticle)->fetch()['aCount'],
                "questionCount" => $this->execute($sqlQuestion)->fetch()['qCount'],
                "auth_id" => $expertId,
                "profile_img" => $this->execute($this->get('user_auth','*',"id='".$expertId."'"))->fetch()['profile_img'],
                "first_name" => $reExpert['first_name'],
                "last_name" => $reExpert['last_name']
            ];
            $i++;
        }
        View::response($res);
    }

    //last date experts are paid
    public function getLastExpertPaidDateAction(){
        $sql = "SELECT * FROM `expert_whole_payment` ORDER BY id DESC LIMIT 1";
        View::response($this->execute($sql)->fetch());
    }

    //get details to show in the Admin home
    public function getDetailsToHomeAction(){
        $numberOfActiveAdmins = $this->execute($this->get('user_auth','*',"user_type ='4' AND user_status='4'"))->rowCount();
        $numberOfExpertVerification = $this->execute($this->get('user_auth','*',"user_type ='2' AND user_status='5'"))->rowCount(); 
        $numberOfStoreVerification = $this->execute($this->get('user_auth','*',"user_type='3' AND user_status='5'"))->rowCount();
        $numberOfProductAppeal = $this->execute($this->join('products, appeal','products.id',"products.id=appeal.product_id AND products.status = '4'"))->rowCount();
        $numberOfAccountAppeal = $this->execute($this->get('user_appeal','*',"status='1'"))->rowCount();
        $res = [
            "numberOfActiveAdmins" => $numberOfActiveAdmins,
            "numberOfExpertVerification" => $numberOfExpertVerification,
            "numberOfStoreVerification" => $numberOfStoreVerification,
            "numberOfProductAppeal" => $numberOfProductAppeal,
            "numberOfAccountAppeal" => $numberOfAccountAppeal
        ];
        View::response($res);
    }

    //get date details to create the initial report
    public function getTodayAction(){
        View::response(date("Y-m-d"));
    }

    //get the report of the admin for the whole system
    public function getReportAction(){
        $sqlSubSum = "SELECT SUM(price) AS subSum FROM `subscription` WHERE date_from >= '". $this->data['dateFrom']."' AND date_to <= '".$this->data['dateTo']."'";
        $subscriptionSum = $this->execute($sqlSubSum)->fetch()['subSum'];
        $sqlTproduct = "SELECT COUNT(id) AS cProduct FROM `products` WHERE created_date >= '".$this->data['dateFrom']."' AND created_date <= '" . $this->data['dateTo']."'";
        $totalNumberOfProducts = $this->execute($sqlTproduct)->fetch()['cProduct'];
        $sqlTUser = "SELECT COUNT(id) AS cUser FROM `user_auth` WHERE create_date >= '".$this->data['dateFrom']."' AND create_date <= '".$this->data['dateTo']."'";
        $totalNumberOfUsers = $this->execute($sqlTUser)->fetch()['cUser'];
        $sqlBestStore = "SELECT store.company_name , user_auth.create_date, SUM(selling_order.amount) AS sum_amount FROM store, user_auth, selling_order WHERE user_auth.id = store.auth_id AND user_auth.id = selling_order.seller_auth_id GROUP BY user_auth.id ORDER BY sum_amount LIMIT 5 ";
        $bestCustomerList = $this->execute($sqlBestStore)->fetchAll();
        $totalPointExpert = (int)$this->countTotalContributions();
        $sqlBestExpert = ""; //have to write
        $bestCustomerList = $this->execute($sqlBestStore)->fetchAll();
        $sqlDailySales = "SELECT SUM(amount) FROM subscription WHERE date >= '".$this->data['dateFrom']."' AND date<= '".$this->data['dateTo']."'GROUP BY date";
        $dailySales = $this->execute($sqlDailySales)->fetchAll();
        $sqlDailyProductAdding = "SELECT COUNT(id) AS daily_product_adding FROM products WHERE created_date >= '".$this->data['dateFrom']."' AND created_date <= '".$this->data['dateTo']."' GROUP BYORDER BY created_date";
        $dailyProductAdding = $this->execute($sqlDailyProductAdding)->fetchAll();
        $sqlBestExpert = "SELECT (COUNT(expert_question.id)*2 + COUNT(products.id)*3 + COUNT(fish_article.id)*10) AS point, expert.first_name, expert.last_name, user_auth.create_date FROM user_auth, expert, expert_question,fish_article,products WHERE expert.auth_id = user_auth.id AND user_auth.id = expert_question.replyer_id AND user_auth.id = fish_article.auth_id AND products.verifier_id = user_auth.id GROUP BY user_auth.id ORDER BY point LIMIT 5";
        $bestExpertList =  $this->execute($sqlBestExpert)->fetchAll();
        $res = [
            "subscriptionSum" => $subscriptionSum,
            "totalNumOfProducts" => $totalNumberOfProducts,
            "totalNumOfUsers" => $totalNumberOfUsers,
            "bestCustomerList" => $bestCustomerList,
            "totalPointExpert" => $totalPointExpert,
            "dailySales" => $dailySales,
            "dailyProductAdding" => $dailyProductAdding,
            "bestExpertList" => $bestExpertList
        ];
        View::response($res);
    }

    //get the data to generate pay sheet for experts
    public function getPaySheetExpertAction(){
       $lastPaidMonth = date("Ym", strtotime(
       $this->execute("SELECT * FROM `expert_whole_payment` WHERE status = 1 ORDER BY id DESC LIMIT 1;")->fetch()['date']
       ));
       $thisMonth =  date("Ym");
       if($thisMonth == $lastPaidMonth){
            $result = [
                "status" => 0
            ];
       }else{
        $expertIds = $this->execute($this->get('user_auth','id',"user_type='2'"))->fetch();
        $i = 0;
        foreach($expertIds as $expertId){
            $sqlProduct = "SELECT COUNT(id) AS pCount FROM products WHERE verifier_id='".$expertId."'";
            $sqlArticle = "SELECT COUNT(id) AS aCount FROM fish_article WHERE auth_id='".$expertId."'";
            $sqlQuestion = "SELECT COUNT(id) AS qCount FROM expert_question WHERE replyer_id='".$expertId."'";
            $reExpert = $this->execute($this->get('expert','*',"auth_id='".$expertId."'"))->fetch(); 
            $res[$i] = [
                "productCount" => $this->execute($sqlProduct)->fetch()['pCount'],
                "articleCount" => $this->execute($sqlArticle)->fetch()['aCount'],
                "questionCount" => $this->execute($sqlQuestion)->fetch()['qCount'],
                "auth_id" => $expertId,
                "profile_img" => $this->execute($this->get('user_auth','*',"id='".$expertId."'"))->fetch()['profile_img'],
                "first_name" => $reExpert['first_name'],
                "last_name" => $reExpert['last_name'],
                "account_no" => $reExpert['account_no'],
                "branch_code" => $reExpert['branch_id'],
                "bank" => $reExpert['bank_name']
            ];
            $i++;
        }
        $year = date('Y');
        $month = date('m');
        $startOfMonth = date('Y-m-d',mktime(0,0,0,$month,1,$year));
        $endOfMonth = date('Y-m-d',mktime(0,0,0,$month,30,$year));
        $sql = "SELECT SUM(price) FROM subscription WHERE date_from <= '" .date('Y-m-d') ."' AND date_to >= '" .date('Y-m-d')."'";
        $totalAmmount = 0;
        $totalAmmount += (int)$this->execute($sql)->fetch()['SUM(price)'];
        $totalAmmount = (int)$totalAmmount/12;
        $sql = "SELECT SUM(post_payments.payment) FROM post_payments, products WHERE post_payments.product_id = products.id AND products.created_date >='" .$startOfMonth ."' AND products.created_date <= '" .$endOfMonth."'";
        $totalAmmount += (int)$this->execute($sql)->fetch()['SUM(post_payments.payment)'];
        $tDay = date("Y-m-d");
        $result = [
            "res" => $res,
            "status" => 1,
            "total_ammount" => $totalAmmount*0.4,
            "res" => $res,
            "today" => $tDay,
            "status" => 1
        ];
        $this->execute($this->save('expert_whole_payment',['amount' => $totalAmmount]));
       }
          
      View::response($result);
    }

    //record expert paid ammount
    public function expertPaidAction(){
        $id = $this->execute("SELECT * FROM `expert_whole_payment` ORDER BY id DESC LIMIT 1")->fetch()['id'];
        $data = [
            "status" => 1
        ];
        $this->exec($this->update('expert_whole_payment',$data,"id='".$id."'"));
        View::response("successfully updated");
    }

}
