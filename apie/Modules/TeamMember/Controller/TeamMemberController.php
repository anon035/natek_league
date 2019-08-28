<?php

namespace Tulic\aPiE\TeamMember;

use Tulic\aPiE\Base\Controller;

class TeamMemberController extends Controller
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
          if ($this->request->getMethod() == 'GET') {
               $result = $this->get($id);
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
               return $this->db->select('team_member', 'id = ' . $id);
          } else {
               return $this->db->select('team_member');
          }
     }

     protected function post($input)
     {
          if ($this->user->getId()) {
               if ($this->db->insert('team_member', $input)) {
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
               if ($this->db->update('team_member', $input, 'id = ' . $id)) {
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
               if ($this->db->delete('team_member', 'id = ' . $id)) {
                    return true;
               } else {
                    return false;
               }
          } else {
               $this->setMessage('missing rights');
          }
     }
}
