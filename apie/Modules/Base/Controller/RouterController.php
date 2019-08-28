<?php

namespace Tulic\aPiE\Base;

use Tulic\aPiE\Base\Controller;
use Tulic\aPiE\Base\Utils;

/**
 * Description of RouterController
 *
 * @author Peter Tulic
 */

date_default_timezone_set('Europe/Bratislava');
class RouterController extends Controller implements RouterInterface
{

	/**
	 * @Inject
	 * @var DbAdapter
	 */
	private $db;

	/**
	 * @Inject
	 * @namespace Tulic\aPiE\User
	 * @var User
	 */
	private $user;

	/**
	 * @Inject
	 * @namespace Tulic\aPiE\User
	 * @var UserController
	 */
	private $userController;

	public function processRequest($params = [])
	{
		$method = $this->request->getMethod();

		$module = $this->request->getNextParam();
		$id = $this->request->getNextParam(true);
		$input = $this->request->getInput();

		if (!$module) {
			$this->setData('message', 'no action available');
			return;
		}
		if ($module == 'user') {
			$this->userController->processRequest();
			$data = $this->userController->getData();
		} else {
			if ($method == 'GET') {
				$data = $this->get($module, $id);
			} else {
				if ($this->user->getId()) {
					if ($method == 'POST') {
						$data = $this->post($module, $input);
					} elseif ($method == 'PUT') {
						$data = $this->put($module, $id, $input);
					} elseif ($method == 'DELETE') {
						$data = $this->delete($module, $id);
					} else {
						$this->setData('message', 'ERROR' . ERROR_METHOD_NOT_ALLOWED);
						return;
					}
				} else {
					$this->setData('message', 'no rights');
					return;
				}
			}
		}
		$this->setData('data', $data);
	}

	protected function get($module, $id)
	{
		if ($id) {
			if ($module == 'season') {
				$res = $this->db->run('
					SELECT 
					week.id as week_id, week.name as week_name,
					match.id as match_id,
					match.team_one as team_one_id, match.team_two as team_two_id, 
					match.score_one as team_one_score, match.score_two as team_two_score,
					team_one.name as team_one_name, team_one.logo_path as team_one_logo,
					team_two.name as team_two_name, team_two.logo_path as team_two_logo
					FROM season
					JOIN week ON season.id = week.season_id
					JOIN match ON week.id = match.week_id
					JOIN team AS team_one ON match.team_one = team_one.id
					JOIN team AS team_two ON match.team_two = team_two.id
					WHERE season.id = ?
					ORDER BY week_id
				', [$id]);
				$season = [];
				$seasonCache = [];
				foreach ($res as $r) {
					if (!in_array($r['week_id'], $seasonCache)) {
						$seasonCache[] = $r['week_id'];
						$season[] = [
							'id' => $r['week_id'],
							'name' => $r['week_name'],
							'matches' => []
						];
					}
					$season[array_search($r['week_id'], $seasonCache)]['matches'][] = [
						'match_id' => $r['match_id'],
						'team_one' => [
							'id' => $r['team_one_id'],
							'name' => $r['team_one_name'],
							'logo' => $r['team_one_logo'],
							'score' => (int)$r['team_one_score']
						],
						'team_two' => [
							'id' => $r['team_two_id'],
							'name' => $r['team_two_name'],
							'logo' => $r['team_two_logo'],
							'score' => (int)$r['team_two_score']
						]
					];
				}

				return $season;
			}
		} else {
			if ($module == 'season') {
				$seasons = $this->db->select('season');
				$seasonsRet = [];
				foreach ($seasons as $season) {
					$type = $season['is_football'] ? 'f' : 'p';
					$seasonsRet[$type][$season['name']] = [
						'id' => $season['id'],
						'weeks' => $this->get('season', $season['id'])
					];
				}
				return $seasonsRet;
			}

			if ($module == 'team') {
				$actualSeasons = $this->db->select('season', 'name = ?', [date('Y')]);
				$actualSeasonIdP = 0;
				$actualSeasonIdF = 0;
				foreach ($actualSeasons as $s) {
					if ($s['is_football']) {
						$actualSeasonIdF = $s['id'];
					} else {
						$actualSeasonIdP = $s['id'];
					}
				}

				$res = $this->db->run($this->getTeamQuery($actualSeasonIdF));
				$team = [];
				$teamCache = [];
				foreach ($res as $r) {
					if (!in_array($r['teamId'], $teamCache)) {
						$teamCache[] = $r['teamId'];
						$team[] = ['id' => $r['teamId'], 'name' => $r['teamName'], 'wins' => $r['wins'], 'loses' => $r['loses'], 'members' => []];
					}
					if ($r['memberId']) {
						$team[array_search($r['teamId'], $teamCache)]['members'][] = ['id' => $r['memberId'], 'name' => $r['memberName']];
					}
				}

				$football = $team;

				$res = $this->db->run($this->getTeamQuery($actualSeasonIdP));
				$team = [];
				$teamCache = [];
				foreach ($res as $r) {
					if (!in_array($r['teamId'], $teamCache)) {
						$teamCache[] = $r['teamId'];
						$team[] = ['id' => $r['teamId'], 'name' => $r['teamName'], 'wins' => $r['wins'], 'loses' => $r['loses'], 'members' => []];
					}
					if ($r['memberId']) {
						$team[array_search($r['teamId'], $teamCache)]['members'][] = ['id' => $r['memberId'], 'name' => $r['memberName']];
					}
				}

				$pingpong = $team;


				return ['p' => $pingpong, 'f' => $football];
			}
		}

		return false;
	}

	private function getTeamQuery($seasonId)
	{
		return '
					SELECT team.id          AS teamId,
							team.name        AS teamName,
							team_member.id   AS memberId,
							team_member.name AS memberName,
						((SELECT count(match.id) FROM 
						match 
						JOIN week ON match.week_id = week.id
						WHERE week.season_id = ' . $seasonId . ' AND match.team_one = team.id
						AND match.score_one > match.score_two
						) + (SELECT count(match.id) FROM 
						match 
						JOIN week ON match.week_id = week.id
						WHERE week.season_id = ' . $seasonId . ' AND match.team_two = team.id
						AND match.score_one < match.score_two)) as wins,
						((SELECT count(match.id) FROM 
						match 
						JOIN week ON match.week_id = week.id
						WHERE week.season_id = ' . $seasonId . ' AND match.team_one = team.id
						AND match.score_one < match.score_two
						) + (SELECT count(match.id) FROM 
						match 
						JOIN week ON match.week_id = week.id
						WHERE week.season_id = ' . $seasonId . ' AND match.team_two = team.id
						AND match.score_one > match.score_two)) as loses
						FROM team 
				LEFT JOIN team_member 
						ON team.id = team_member.team_id
				';
	}

	protected function post($module, $input)
	{
		if ($module == 'season') {
			$res = $this->db->run('
				INSERT INTO season (name, is_football)
				VALUES (?, ?)
			', [$input['name'], $input['is_football']]);

			return ['success' => (boolean)$res];
		}
		if ($module == 'match') {
			$res = $this->db->run('
				INSERT INTO match (team_one, team_two, score_one, score_two, week_id)
				VALUES (?, ?, ?, ?, ?)
			', [$input['team_one'], $input['team_two'], $input['score_one'], $input['score_two'], $input['week_id']]);


			if ($res) {
				return ['id' => $this->db->lastInsertId()];
			} else {
				return ['success' => false];
			}
		}
		if ($module == 'team') {
			$res = $this->db->run('
				INSERT INTO team (name) VALUES (?)
			', [$input['name']]);
			if ($res) {
				return ['id' => $this->db->lastInsertId()];
			} else {
				return ['success' => false];
			}
		}
		if ($module == 'player') {
			$res = $this->db->run('
				INSERT INTO team_member (name, team_id) VALUES (?, ?)
			', [$input['name'], $input['team_id']]);
			
			if ($res) {
				return ['id' => $this->db->lastInsertId()];
			} else {
				return ['success' => false];
			}
		}
	}

	protected function put($module, $id, $input)
	{
		if ($module == 'score') {
			if (in_array($input['teamOrder'], ['one', 'two '])) {

				$res = $this->db->run('
				UPDATE match SET score_' . $input['teamOrder'] . ' = ? WHERE id = ?
			', [$input['score'], $id]);

				return ['success' => (boolean)$res];
			} else {
				return ['error' => 'invalid order'];
			}
		}
		if ($module == 'match') {
			if (in_array($input['teamOrder'], ['one', 'two '])) {

				$res = $this->db->run('
				UPDATE match SET team_' . $input['teamOrder'] . ' = ? WHERE id = ?
			', [$input['teamId'], $id]);

				return ['success' => (boolean)$res];
			} else {
				return ['error' => 'invalid order'];
			}
		}
		if ($module == 'team') {
			$res = $this->db->run('
				UPDATE team SET name = ? WHERE id = ?
			', [$input['name'], $id]);

			return ['success' => (boolean)$res];
		}

		if ($module == 'player') {
			$res = $this->db->run('
				UPDATE team_member SET name = ?, team_id = ? WHERE id = ?
			', [$input['name'], $input['team_id'], $id]);

			return ['success' => (boolean)$res];
		}
	}

	protected function delete($module, $id)
	{ }

	public function run()
	{
		$this->processRequest();
	}

	public function getResult()
	{
		return $this->getData();
	}
}
