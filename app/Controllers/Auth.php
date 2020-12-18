<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use Config\Services;
use Firebase\JWT\JWT;
use App\Filters\AuthFilter;
use App\Models\UserModel;
use Exception;

class Auth extends ResourceController
{

	protected $format = 'json';

	public function create()
	{

		$login = $this->request->getRawInput()["login"];

		$userModel = new UserModel();
		$recupUser = $userModel->getUserByLogin($login);

		// vérif si user exist
		if (!empty($recupUser)) {

			// transforme l'objet que me renvoie le model en array php
			$recupUser = get_object_vars($recupUser[0]);

			// vérif mdp
			if ( password_verify($this->request->getRawInput()["password"], $recupUser["password"]) ) {
				$key = Services::getSecretKey();

				// Infos que le token va contenir
				
				$issuedAtTime = time();

				$payload = [
					'id' => intval($recupUser["id"]),
					'login' => $recupUser["login"],
					'iat' => $issuedAtTime,
					'exp' => $issuedAtTime + 3600,
				];
	
				// Initialisation du token JWT et le return
				$jwt = JWT::encode($payload, $key);
				return $this->respond(['token' => $jwt], 200);
			}
			else {
				return $this->respond(['message' => 'Invalid login details'], 401);
			}
		}
		else {
			throw new Exception("Ce login n'existe pas");
		}
		

		// add code to fetch through db and check they are valid
		// sending no email and password also works here because both are empty
		// if ($email === $password) {

		// }

		// return $this->respond(['message' => 'Invalid login details'], 401);
	}
}