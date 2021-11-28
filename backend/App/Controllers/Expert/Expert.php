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



    
}