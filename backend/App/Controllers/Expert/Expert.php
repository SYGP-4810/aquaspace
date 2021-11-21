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
        $sql = "SELECT expert_quetion.id , expert_quetion.question, regular_user.first_name, regular_user.last_name FROM expert_quetion,user_auth,regular_user WHERE user_auth.id = regular_user.auth_id AND expert_quetion.reply IS NULL AND user_auth.id = expert_quetion.sender_id";
        View::response($this->execute($sql)->fetchAll());
    }

    //get individual questions which are claimed to answer
    public function getOneQuestionAction(){
        View::response($this->execute($this->get('expert_quetion','*',"id='" . $this->data['id'] . "'"))->fetch());
    }

    //write a answer to the question which asked by regular user
    public function writeAnswerAction(){
        $updateArr = ['reply' => $this->data['answer']];
        $this->execute($this->update('expert_quetion',$updateArr,"id='" . $this->data['id'] ."'"));
        View::response("successfully send the answer");
    }



    
}