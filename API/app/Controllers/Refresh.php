<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use Config\Services;
use Firebase\JWT\JWT;
use App\Models\UserModel;
use Exception;

class Refresh extends ResourceController
{

	protected $format = 'json';

	public function create()
	{

		$refreshtoken = $this->request->getRawInput()["refresh"];

		$key = Services::getSecretKey();

		try {
			$decodedToken = JWT::decode($refreshtoken, $key, ['HS256']);
		} catch (\Exception $e) {
			return $this->respond(['message' => "Token faux"], 401);
		}

		$model = new UserModel();
        $id_user = $decodedToken->id;
		$getByID = $model->getUserById($id_user);
		// echo count($getByID);
		
		if (count($getByID) != 0) {
	
			$issuedAtTime = time();

			$payload = [
				'id' => $decodedToken->id,
				'login' => $decodedToken->login,
				'iat' => $issuedAtTime,
				'exp' => $issuedAtTime + 1200,
			];

			$payload2 = [
				'id' => $decodedToken->id,
				'login' => $decodedToken->login,
				'iat' => $issuedAtTime,
			];

			// Initialisation du token JWT et le return
			$jwt = JWT::encode($payload, $key);
			$jwtrefresh = JWT::encode($payload2, $key);

			return $this->respond(['token' => $jwt, 'refresh' => $jwtrefresh], 200);
		}
		else {
			return $this->respond(['message' => "Utilisateur ban"], 401);
		}
	}

}