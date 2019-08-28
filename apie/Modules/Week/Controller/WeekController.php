<?php

namespace Tulic\aPiE\Week;

use Tulic\aPiE\Base\Controller;

class WeekController extends Controller
{

     /**
      * @Inject
      * @namespace Tulic\aPiE\Base
      * @var DbAdapter
      */
     private $db;

     /**
      * @Inject
      * @namespace Tulic\aPiE\User
      * @var User
      */
     private $user;

     public function processRequest($params = [])
     {
          $id = $this->request->getNextParam();
          $input = $this->request->getInput();
          $getMatches = ($this->request->getNextParam() == 'match');
          if ($this->request->getMethod() == 'GET') {
               if ($getMatches){
                    $result = $this->getMatches($id);
               } else {
                    $result = $this->get($id);
               }
          } else if ($this->request->getMethod() == 'POST') {
               $result = $this->post($input);
          } else if ($this->request->getMethod() == 'PUT') {
               $result = $this->put($id, $input);
          } else if ($this->request->getMethod() == 'DELETE') {
               $result = $this->delete($id);
          }
          $this->mapData($result);
     }

     protected function get($id)
     {
          if ($id) {
               return $this->db->select('week', 'id = ' . $id);
          } else {
               return $this->db->select('week');
          }
     }

     protected function post($input)
     {
          if ($this->user->getId()) {
               if ($this->db->insert('week', $input)) {
                    return true;
               } else {
                    return false;
               }
          } else {
               $this->setMessage('missing rights');
          }
     }

     protected function put($id, $input)
     {
          if ($this->user->getId()) {
               if ($this->db->update('week', $input, 'id = ' . $id)) {
                    return true;
               } else {
                    return false;
               }
          } else {
               $this->setMessage('missing rights');
          }
     }

     protected function delete($id)
     {
          if ($this->user->getId()) {
               if ($this->db->delete('week', 'id = ' . $id)) {
                    return true;
               } else {
                    return false;
               }
          } else {
               $this->setMessage('missing rights');
          }
     }
}
