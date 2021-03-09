<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use Config\Services;
use Firebase\JWT\JWT;
use App\Models\UserModel;
use Exception;

class Auth extends ResourceController
{

	protected $format = 'json';

	/**
     * @OA\POST(
     *      path="/auth",
	 * 		description="Permet de se connecter et créer un token",
	 * 		tags={"User"},
	 * 		@OA\RequestBody(
 	 *         	@OA\MediaType(
	 *           mediaType="application/x-www-form-urlencoded",
	 *           	@OA\Schema(
	 *               	type="object",
	 *               	@OA\Property(property="login", type="string"),
	 *               	@OA\Property(property="password", type="string")
	 *            	)
	 *			)
 	 *      ),
     *      @OA\Response(
     *          response="200",
     *          description="True",
     *          @OA\JsonContent(type="object"),
     *      ),
	 * 		@OA\Response(
     *          response="401",
     *          description="Erreur login / password",
     *          @OA\JsonContent(type="object"),
     *      )
     * )
     */
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
					'exp' => $issuedAtTime + 1200,
				];

				$payload2 = [
					'id' => intval($recupUser["id"]),
					'login' => $recupUser["login"],
					'iat' => $issuedAtTime,
				];
	
				// Initialisation du token JWT et le return
				$jwt = JWT::encode($payload, $key);
				$jwtrefresh = JWT::encode($payload2, $key);
				return $this->respond(['token' => $jwt, 'refresh' => $jwtrefresh], 200);
				// return $this->respond(['token' => $jwt], 200);
			}
			else {
				return $this->respond(['passwordError' => 'Nom d\'utilisateur ou mot de passe incorrect'], 401);
			}
		}
		else {
			return $this->respond(['loginError' => 'Ce nom d\'utilisateur n\'existe pas'], 401);
		}
		

		// add code to fetch through db and check they are valid
		// sending no email and password also works here because both are empty
		// if ($email === $password) {

		// }

		// return $this->respond(['message' => 'Invalid login details'], 401);
	}
}