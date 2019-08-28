<?php

namespace Tulic\aPiE\Season;

use Tulic\aPiE\Base\Controller;

class SeasonController extends Controller
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
          $getWeeks = ($this->request->getNextParam() == 'week');
          $input = $this->request->getInput();
          if ($this->request->getMethod() == 'GET') {
               if ($getWeeks) { 
                    $result = $this->getWeeks($id);
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
               return $this->db->select('season', 'id = ' . $id);
          } else {
               return $this->db->select('season');
          }
     }

     protected function getWeeks($id) {
          if ($id) {
               return $this->db->select('week', 'season_id = ' . $id);
          } else {
               return false;
          }
     }

     protected function post($input)
     {
          if ($this->user->getId()) {
               if ($this->db->insert('season', $input)) {
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
               if ($this->db->update('season', $input, 'id = ' . $id)) {
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
               if ($this->db->delete('season', 'id = ' . $id)) {
                    return true;
               } else {
                    return false;
               }
          } else {
               $this->setMessage('missing rights');
          }
     }
}
