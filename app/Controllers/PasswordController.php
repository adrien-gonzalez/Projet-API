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
     * Vérifie l'email renseigné et envoie le lien de modification du mdp
     */
    public function SendMail()
    {
        $model = new UserModel();

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
                $email->setFrom('APIserve@APIserve.com', 'APIserve');
                $email->setSubject('Modification du mot de passe');
                $email->setMessage('<h1>Bonjour !</h1><br>
                                    Une demande de nouveau mot de passe a été faite. <br><br>
                                    Cliquez sur le lien suivant : <a href="' . base_url() . '/API/resetpassword?token=' . $token . '">Nouveau mot de passe</a>');

                if ($email->send()) {
                    return true;
                } else {
                    $data = $email->printDebugger(['headers']);
                    return $data; // Retourne l'erreur (Probablement à modifier)
                }
            } else {
                return $this->respond(['message' => "Cet email est incorrect. Veuillez réessayer."], 401);
            }
        } else {
            return $this->validator->listErrors();
        }
    }

    /**
     * Vérifie si le token utilisé est toujours valide 
     */
    public function getToken()
    {
        $token = $_GET['token'];

        $model = new UserModel();

        $users = $model->getUsers_token($token);
        $date_token = $this->checkexpiredate($users[0]->date_token);

        if ($date_token) {
            return json_encode($users);
        } else {
            return $this->respond(['message' => "Le token est expiré, veuillez faire une nouvelle demande."], 401);
        }
    }

    public function putPassword()
    {
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
                return $this->respond(['message' => "Le mot de passe doit contenir une lettre majuscule, une lettre minuscule et un chiffre"], 401);
            } else {
                $model->putUser($id, 'password', password_hash($password, PASSWORD_BCRYPT, $options = ["cost" => 12]));
                $model->resetToken($id);
                return true;
            }
        } else {
            echo $this->validator->listErrors();
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
