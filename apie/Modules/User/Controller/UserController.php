<?php

namespace Tulic\aPiE\User;

use Tulic\aPiE\Base\Controller;

/**
 * Description of UserController
 *
 * @author Peter Tulic
 */
class UserController extends Controller
{

	/**
	 * @Inject
	 * @var UserManager
	 */
	private $userMan;

	/**
	 * @Inject
	 * @var User
	 */
	private $user;
	private $action = '';

	public function processRequest($params = [])
	{
		$method = $this->request->getMethod();
		$input = $this->request->getInput();
		$id = $this->request->getNextParam();

		$this->action = $id;
		$this->post(null, $input);
	}

	protected function post($module, $input)
	{
		$token = null;
		if ($this->action == 'login') {
			$token = $this->userMan->login($input['username'], $input['password']);
		} elseif ($this->action == 'renew-token') {
			$token = $this->userMan->isValidToken($this->request->getAuthorization(), true);
		}
		if ($token) {
			if ($token['token']) {
				$this->setData('token', $token['token']);
			}
			if ($token['message']) {
				$this->setMessage($token['message']);
			}
		}
	}
}
