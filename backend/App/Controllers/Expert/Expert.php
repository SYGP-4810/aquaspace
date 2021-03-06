<?php

namespace App\Controllers\Expert;

use Core\View;


/**
 * Expert controller
 *
 * 
 */
class Expert extends \Core\Controller
{
   
   
    protected function before()
    {
        // Make sure an Expert user is logged in for example
        // return false;
    }

    //get all question need to be answered which asked by regular user
    public function getQuestionAction(){
        $sql = "SELECT expert_question.id , expert_question.question, regular_user.first_name, regular_user.last_name FROM expert_question,user_auth,regular_user WHERE user_auth.id = regular_user.auth_id AND expert_question.reply IS NULL AND user_auth.id = expert_question.sender_id";
        View::response($this->execute($sql)->fetchAll());
    }

    //get individual questions which are claimed to answer
    public function getOneQuestionAction(){
        View::response($this->execute($this->get('expert_question','*',"id='" . $this->data['id'] . "'"))->fetch());
    }

    //write a answer to the question which asked by regular user
    public function writeAnswerAction(){
        $replyAuthId = $this->execute($this->get('user_Auth','id',"access_token ='" . $_COOKIE['access_token'] . "'"))->fetch()['id'];
        $updateArr = ['reply' => $this->data['answer'],'replyer_id' => $replyAuthId];
        $this->execute($this->update('expert_question',$updateArr,"id='" . $this->data['id'] ."'"));
        View::response("successfully send the answer");
    }

    //get claimed questions of the logged in expert's
    public function getClaimedQuestionsAction(){
        $authId = $this->execute($this->get('user_auth','id',"access_token ='" . $_COOKIE['access_token'] . "'"))->fetch()['id'];
        $sql = "SELECT expert.first_name, expert.last_name, expert_question.question, expert_question.reply FROM expert, expert_question WHERE expert.auth_id = '".$authId."' AND expert_question.replyer_id = '".$authId."'";
        View::response($this->execute($sql)->fetchAll());
    }

    //get compatible fish to enter fish artcle
    public function getCompatibleFishAction(){
        View::response($this->execute($this->getAll('fish_article','*'))->fetchAll());
    }

    //insert fish article 
    public function addFishArticleAction(){
        
        $authId = $this->execute($this->get('user_Auth','id',"access_token ='" . $_COOKIE['access_token'] . "'"))->fetch()['id'];
        // //save images
        $iName1 = "";
        $iName1 = microtime(true) . "." . $this->data['exen1'];
        $iDir1 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/fish_article/" . $iName1;
        $flag1 = file_put_contents($iDir1, base64_decode($this->data['pic1']));

        $iName2 = "";
        $iName2 = microtime(true) . "." . $this->data['exen2'];
        $iDir2 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/fish_article/" . $iName2;
        $flag2 = file_put_contents($iDir2, base64_decode($this->data['pic2']));

        $iName3 = "";
        $iName3 = microtime(true) . "." . $this->data['exen3'];
        $iDir3 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/fish_article/" . $iName3;
        $flag3 = file_put_contents($iDir3, base64_decode($this->data['pic3']));

        $iName4 = "";
        $iName4 = microtime(true) . "." . $this->data['exen4'];
        $iDir4 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/fish_article/" . $iName4;
        $flag4 = file_put_contents($iDir4, base64_decode($this->data['pic4']));

        if (!$flag1) {
            throw new \Exception("file1 didn't come to backend");
        }
        if (!$flag2) {
            throw new \Exception("file2 didn't come to backend");
        }
        if (!$flag3) {
            throw new \Exception("file3 didn't come to backend");
        }
        if (!$flag4) {
            throw new \Exception("file4 didn't come to backend");
        }


        //save in database
        $dataToInsertToFishArticleTable = [
            'description' => $this->data['description'],
            'max_water_temp' => $this->data['maxWaterTemp'],
            'min_water_temp' => $this->data['minWaterTemp'],
            'min_ph' => $this->data['minPh'],
            'max_ph' => $this->data['maxPh'],
            'special_diet' => $this->data['diet'],
            'care_level' => $this->data['careLevel'],
            'tank_capacity' => $this->data['tankCapacity'],
            'name' => $this->data['fishName'],
            'ability_to_sell' => $this->data['abilityToSell'],
            'ability_to_release' => $this->data['abiltyToRelease'],
            'environment' => $this->data['environment'],
            'img_1' => $iName1,
            'img_2' => $iName2,
            'img_3' => $iName3,
            'img_4' => $iName4,
            'auth_id' => $authId,
            'max_length' => $this->data['petMaxLength'],
        ];
        $this->exec($this->save('fish_article',$dataToInsertToFishArticleTable));
        $id = $this->execute($this->get('fish_article','id',"name ='".$this->data['fishName']. "'"))->fetch()['id'];//id of the fish that jst inserted
        $dataToInsertOtherFishName = [
            'fish_article_id' => $id,
            'name' => $this->data['fishName']
        ];
        $this->exec($this->save('other_names_of_fish',$dataToInsertOtherFishName));
        $numberOfOtherNames  = count($this->data['otherNames']);
        for($i=0;$i<$numberOfOtherNames;$i++){
            $dataToInsertOtherFishName = [
                'fish_article_id' => $id,
                'name' => $this->data['otherNames'][$i]
            ];
            $this->exec($this->save('other_names_of_fish',$dataToInsertOtherFishName));
        }
        if($this->data['compatibleFishes']){
            foreach($this->data['compatibleFishes'] as $cFish){
                $cId = $this->execute($this->get('fish_article','*',"name LIKE '".$cFish ."%'"))->fetch()['id'];
                if(!is_null($cId)){
                $dataToInsertOtherCompatibleFishTable = [
                    'fish_article_id' => $id,
                    'compatible_fish_id' => $cId
                ];
                $this->exec($this->save('compatible_fish',$dataToInsertOtherCompatibleFishTable));
                }

            }

        }


        $numberOfNative = count($this->data['nativeTo']);
        for($i = 0; $i < $numberOfNative; $i++){
            $dataToInsertNativeToTable = [
                'fish_article_id' => $id,
                'country' => $this->data['nativeTo'][$i]
            ];
            $this->exec($this->save('native_to',$dataToInsertNativeToTable));
        }
        $this->notifyHimself("successfully add new fish ".$this->data['fishName']);
        View::response("successfully added");
    }

    //get contribution of the expert
    public function getContributionAction(){
        $allQuestion = $this->execute("SELECT COUNT(id) AS qCount FROM expert_question WHERE replyer_id IS NOT NULL")->fetch()['qCount'];
        $allArticle = $this->execute("SELECT COUNT(id) AS aCount FROM fish_article")->fetch()['aCount'];
        $allPost = $this->execute("SELECT COUNT(id) AS pCount FROM products WHERE verifier_id IS NOT NULL")->fetch()['pCount'];
        $expertId = $this->execute($this->get('user_auth','id',"access_token ='" . $_COOKIE['access_token'] . "'"))->fetch()['id'];
        $sqlProduct = "SELECT COUNT(id) AS pCount FROM products WHERE verifier_id='".$expertId."'";
        $sqlArticle = "SELECT COUNT(id) AS aCount FROM fish_article WHERE auth_id='".$expertId."'";
        $sqlQuestion = "SELECT COUNT(id) AS qCount FROM expert_question WHERE replyer_id='".$expertId."'";
        $reExpert = $this->execute($this->get('expert','*',"auth_id='".$expertId."'"))->fetch(); 
        $allBlogArticlesql = "SELECT COUNT(article.id) aBlogCount FROM article ";
        $allBlogArticleCount = $this->execute($allBlogArticlesql)->fetch()['aBlogCount'];
        $bArticleSql = "SELECT COUNT(article.id) bCount FROM article WHERE auth_id = '".$expertId."'";
        $bArticleCount = $this->execute($bArticleSql)->fetch()['bCount'];
        $res = [
            "aBcount" => $allBlogArticleCount,
            "bCount" => $bArticleCount,
            "productCount" => $this->execute($sqlProduct)->fetch()['pCount'],
            "articleCount" => $this->execute($sqlArticle)->fetch()['aCount'],
            "questionCount" => $this->execute($sqlQuestion)->fetch()['qCount'],
            "auth_id" => $expertId,
            "profile_img" => $this->execute($this->get('user_auth','*',"id='".$expertId."'"))->fetch()['profile_img'],
            "first_name" => $reExpert['first_name'],
            "last_name" => $reExpert['last_name'],
            "allQuestion" => $allQuestion,
            "allArticle" => $allArticle,
            "allPost" => $allPost
        ];
        View::response($res);
    }

    public function addArticleAction(){
        $authId = $this->execute($this->get('user_auth','*',"access_token ='" . $_COOKIE['access_token'] . "'"))->fetch()['id'] ;
        //save images
        $iName1 = "";
        $iName1 = microtime(true) . "." . $this->data['picExtension'];
        $iDir1 = $_SERVER['DOCUMENT_ROOT'] . "/aquaspace/frontend/images/article/" . $iName1;
        $flag1 = file_put_contents($iDir1, base64_decode($this->data['pic']));
        if (!$flag1) {
            throw new \Exception("thumbnail didn't come to backend");
        }
        $dataToSaveArcticle = [
            "auth_id" => $authId,
            "article" => $this->data['article'],
            "summary" => $this->data['summary'],
            "title" => $this->data['title'],
            "pic" => $iName1,
            "category" => $this->data['category']
        ];
        $this->exec($this->save('article',$dataToSaveArcticle));
        $condition = "auth_id='".$authId."' AND article='".$this->data['article']."'";
        $articleId = $this->execute($this->get('article','*',$condition))->fetch()['id'];
        $fishCount = $this->data['countFish'];
        $fishes = $this->data['relaventFishes'];
        

        for($i=0;$i< $fishCount ;$i++){
            $dataToInsertRelevantFish = [
                "article_id" => $articleId,
                "fish_article_id" => $fishes[$i]
            ];
            $this->exec($this->save('relevant_fish_for_article',$dataToInsertRelevantFish));
        }
        $this->notifyHimself("You can view Your new article in the blog section");
        View::response("successfully uploaded the article");
        


    }

    //view the article list which expert added
    public function viewArticleListAction(){
        $authId = $this->execute($this->get('user_auth','*',"access_token ='" . $_COOKIE['access_token'] . "'"))->fetch()['id'] ;
        View::response($this->execute($this->get('article','*',"auth_id ='" . $authId . "'"))->fetchAll());
    }

    
    //view fish related Articles
    public function viewFishArticleListAction(){
        $authId = $this->execute($this->get('user_auth','*',"access_token ='" . $_COOKIE['access_token'] . "'"))->fetch()['id'] ;
        View::response($this->execute($this->get('fish_article','*',"auth_id ='" . $authId . "'"))->fetchAll());
    }

    //get request to validate name of the fishe
    public function getRequestAction(){
        View::response($this->execute($this->get('products','*',"status = '3'"))->fetchAll());
    }

    //verify the fish names
    public function verifyFishName(){
        $expertId = $this->execute($this->get('user_auth','*',"access_token ='" . $_COOKIE['access_token'] . "'"))->fetch()['id'];
        $status = $this->execute($this->get('fish_article','*', "name='" . $this->data['name'] . "'"))->fetch()['ability_to_sell'];
        if($status == 1){
            $dataToUpdate = [
                "status" => '1',
                "product_name" => $this->data['name'],
                "verifier_id" => $expertId
            ];
            $mail = "
            <html>
                <head>
                    <title>product relasing</title>
                </head>
                <body>
                    <p>Your product ".$this->data['oldName']." is released to sell with new name ".$this->data['name']."</p>
                </body>
            </html>
        ";
        }else{
            $dataToUpdate = [
                "status" => '5',
                "product_name" => $this->data['name'],
                "verifier_id" => $expertId
            ];
            $mail = "
            <html>
                <head>
                    <title>product relasing</title>
                </head>
                <body>
                    <p>Your product ".$this->data['oldName']." is  removed from the products with new name ".$this->data['name']."</p>
                </body>
            </html>
        ";
        }
        $this->exec($this->update('products', $dataToUpdate, "id='" . $this->data['productId']."'"));
        $email = $this->execute($this->get('user_auth','*',"id='" . $this->data['authId']. "'"))->fetch()['email'];
        $this->notifyOther($this->data['authId'], "your product, ".$this->data['oldName']." has been updated to sell with new name ".$this->data['name']);
        $this->sendMail($email,"about product verificataion", $mail);
        View::response($email);
    }


    public function getHomeAction()
    {    
        $stmt = $this->execute($this->get('user_auth', "*", "access_token ='" . $_COOKIE['access_token'] . "'" . " AND user_type='2'"));
        $result = $stmt->fetch();
        $id = $result['id'];

        $stmt = $this->execute($this->get('expert_question', "id", "reply IS NULL"));
        $result = $stmt->fetchAll();
        $questionCount=count($result);

        $stmt = $this->execute($this->get('products', "id", "status = 3"));
        $result = $stmt->fetchAll();
        $productCount=count($result);

        $stmt = $this->execute($this->get('article', "id", "auth_id = " . $id .""));
        $result = $stmt->fetchAll();
        $articleCount=count($result);

        $count = array("question"=> $questionCount, "product"=> $productCount, "article"=>$articleCount);

        View::response($count);
        
    }
    
}