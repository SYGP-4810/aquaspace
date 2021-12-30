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
        $replyAuthId = $this->execute($this->get('userAuth','id',"access_token ='" . $_COOKIE['access_token'] . "'"))->fetch()['id'];
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
        View::response($this->execute($this->getAll('fish_article','name'))->fetchAll());
    }

    //insert fish article 
    public function addFishArticleAction(){

        //save images
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


        // //save in database
        $dataToInsertToFishArticleTable = [
            'description' => $this->data['description'],
            'max_water_temp' => $this->data['maxWaterTemp'],
            'min_water_temp' => $this->data['minWaterTemp'],
            'min_ph' => $this->data['minPh'],
            'max_ph' => $this->data['maxPh'],
            'special_diet' => $this->data['diet'],
            'care_level' => $this->data['careLevel'],
            'tank_capacity' => $this->data['tankCapacity'],
            'name' => $this->data['name'],
            'ability_to_sell' => $this->data['abilityToSell'],
            'ability_to_release' => $this->data['abilityToRelease'],
            'environment' => $this->data['environment'],
            'img_1' => $iName1,
            'img_2' => $iName2,
            'img_3' => $iName3,
            'img_4' => $iName4
        ];
        $this->exec($this->save('fish_article',$dataToInsertToFishArticleTable));
        $id = $this->execute($this->get('fish_article','id',"name ='".$this->data['name']. "'"))->fetch()['id'];//id of the fish that jst inserted
        $dataToInsertOtherFishName = [
            'fish_article_id' => $id,
            'name' => $this->data['name']
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
        if(isset($this->data['compatibleFishes'])){
            $numberOfCompatibleFish = count($this->data['compatibleFishes']);
            for($i=0;$i<$numberOfCompatibleFish;$i++){
                $dataToInsertOtherCompatibleFishTable = [
                    'fish_article_id' => $id,
                    'compatible_fish_id' => $this->data['compatibleFishes'][$i]
                ];
            $this->exec($this->save('compatible_fish',$dataToInsertOtherCompatibleFishTable));
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
        $this->notifyHimself("successfully add new fish ".$this->data['name']);
        View::response("successfully added");
    }



    
}