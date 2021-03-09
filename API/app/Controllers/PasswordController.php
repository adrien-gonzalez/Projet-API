<?php

namespace App\Controllers;

use Config\Services;
use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;


class PasswordController extends ResourceController
{
    /**
     * Fonction qui redirige vers la fonction qui correspond à la méthode utilisée
     */
    public function resetPassword()
    {
        $method = $_SERVER["REQUEST_METHOD"];
        $actions = [
            "GET" => "getToken",
            "POST" => "SendMail",
            "PUT" => "putPassword",
        ];

        $call = $actions[$method];

        $response = $this->$call();
        return $response;
    }

    /**
     * @OA\POST(
     *      path="/resetpassword",
     *      tags={"ResetPassword"},
     *      description=" Vérifie l'email renseigné et envoie le lien de modification du mdp",
     *      @OA\RequestBody(
     *         	@OA\MediaType(
     *           mediaType="application/x-www-form-urlencoded",
     *           	@OA\Schema(
     *               	type="object",
     *               	@OA\Property(property="email", type="string"),
     *            	)
     *			)
     *      ),
     *       @OA\Response(
     *          response="200",
     *          description="Serveur créé !",
     *          @OA\JsonContent(type="object"),
     *      ),
     *      @OA\Response(
     *          response="401",
     *          description="Des champs sont vides",
     *          @OA\JsonContent(type="object"),
     *      )
     * )
     */
    public function SendMail()
    {
        $model = new UserModel();
        $errors = ["errors" => []];

        // gère les restrictions du formulaire
        $rules = [
            'email' => [
                'rules' => 'required|valid_email',
            ],
        ];

        if ($this->validate($rules)) {
            $params = $this->request->getRawInput();
            $mail = $params['email'];
            $verif_email = $model->getUserByEmail($mail);
            if (!empty($verif_email)) {
                $token = bin2hex(random_bytes(24));
                $model->putToken($token, $mail);

                // Envoie du mail 
                $email = Services::email();
                $email->setTo($mail);
                $email->setFrom('servetop.contact@gmail.com', 'Serve Top');
                $email->setSubject('Modification du mot de passe');
                $email->setMessage('<h1>Bonjour !</h1>
                                    <p>Une demande de nouveau mot de passe a été faite.</p>
                                    <p>Voici le token de modification: </p>
                                    <h4 style="color: #66A5F9">' . $token . '</h4>');

                if ($email->send()) {
                    return true;
                } else {
                    $data = $email->printDebugger(['headers']);
                    return $data; // Retourne l'erreur (Probablement à modifier)
                }
            } else {
                array_push($errors["errors"], ['email_error' => "Cet email est incorrect. Veuillez réessayer."]);
                return $this->respond($errors, 401);
            }
        } else {
            array_push($errors["errors"], ['email_error' => $this->validator->getError('email')]);
            return $this->respond($errors, 401);
        }
    }

    /**
     * @OA\GET(
     *      path="/resetpassword?token={token}",
     *      description="Vérifie si le token utilisé est toujours valide",
     *      tags={"ResetPassword"},
     *      @OA\Parameter(
     *          name="token",
     *          in="query",
     *          required=true,
     *          @OA\Schema(type="string")
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Informations de l'utilisateur possedant ce token",
     *          @OA\JsonContent(type="object"),
     *      ),
     *      @OA\Response(
     *          response="401",
     *          description="Erreur Token",
     *          @OA\JsonContent(type="object"),
     *      )
     * )
     */
    public function getToken()
    {
        $errors = ["errors" => []];
        $token = $_GET['token'];

        $model = new UserModel();

        $users = $model->getUsers_token($token);
        $date_token = $this->checkexpiredate($users[0]->date_token);

        if ($date_token) {
            return json_encode($users);
        } else {
            array_push($errors["errors"], ['reset_token_error' => "Le token est expiré, veuillez faire une nouvelle demande."]);
            return $this->respond($errors, 401);
        }
    }

    /**
     * @OA\PUT(
     *      path="/resetpassword",
     *      description="modifie le mot de passe de l'utilisateur qui a fait la demande",
     *      tags={"ResetPassword"},
     *      @OA\RequestBody(
     *         	@OA\MediaType(
     *           mediaType="application/x-www-form-urlencoded",
     *           	@OA\Schema(
     *               	type="object",
     *               	@OA\Property(property="password", type="string"),
     *               	@OA\Property(property="conf_password", type="string"),
     *               	@OA\Property(property="token", type="string"),
     *               	@OA\Property(property="id", type="string"),
     *            	)
     *			)
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Mot de passe réinitialisé",
     *          @OA\JsonContent(type="object"),
     *      ),
     *      @OA\Response(
     *          response="401",
     *          description="Erreur champs",
     *          @OA\JsonContent(type="object"),
     *      )
     * )
     */
    public function putPassword()
    {
        $errors = ["errors" => []];

        // gère les restrictions du formulaire
        $rules = [
            'password' => [
                'rules' => 'required|min_length[8]',
            ],
            'conf_password' => [
                'rules' => 'required|matches[password]',
            ],
        ];

        $params = $this->request->getRawInput();
        $password = $params['password'];
        $id = $params['id'];
        $model = new UserModel();

        if ($this->validate($rules)) {
            if (!preg_match("/^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/", $password)) {
                array_push($errors["errors"], ['password_error' => "Le mot de passe doit contenir une lettre majuscule, une lettre minuscule et un chiffre"]);
                return $this->respond($errors, 401);
            } else {
                $model->putUser($id, 'password', password_hash($password, PASSWORD_BCRYPT, $options = ["cost" => 12]));
                $model->resetToken($id);
                return true;
            }
        } else {
            array_push($errors["errors"], ['conf_password_error' => $this->validator->getError('conf_password')]);
            array_push($errors["errors"], ['password_error' => $this->validator->getError('password')]);
            return $this->respond($errors, 401);
        }
    }

    /**
     * Fonction qui détermine la diff entre le moment actuel et la date du token
     */
    public function checkexpiredate($time)
    {
        $uptime = strtotime($time);
        $current_time = time();
        $timediff = $current_time - $uptime;
        if ($timediff < 900) {
            return true;
        } else {
            return false;
        }
    }
}
