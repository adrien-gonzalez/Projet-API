<?php

namespace App\Controllers;

use Config\Services;
use App\Models\UserModel;

class PasswordController extends BaseController
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
            $users_mail = $model->getUsers_mail($mail);
            if (!empty($users_mail)) {
                $token = bin2hex(random_bytes(24));
                $users = $model->putToken($token, $mail);

                // Envoie du mail 
                $email = Services::email();
                $email->setTo($mail);
                $email->setFrom('APIserve@APIserve.com', 'APIserve');
                $email->setSubject('Modification du mot de passe');
                $email->setMessage('<h1>Bonjour !</h1><br>
                                    Une demande de nouveau mot de passe a été faite. <br><br>
                                    Cliquez sur le lien suivant : <a href="' . base_url() . '/API/resetpassword?token=' . $token . '">Nouveau mot de passe</a>');

                if ($email->send()) {
                    // à modifier
                    echo 'ok mail envoyé';
                } else {
                    $data = $email->printDebugger(['headers']);
                    var_dump($data);
                }
            } else {
                // à modifier
                echo 'Cet email est incorrect. Veuillez réessayer.';
            }
        } else {
            // à modifier
            echo 'Renseignez le champ avec un email valide';
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
        $test = $this->checkexpiredate($users[0]->date_token);

        if($test)
        {
            echo json_encode($users);
        }
        else {
            echo 'token expiré';
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

        if($this->validate($rules))
        {
            $params = $this->request->getRawInput();
            $password = $params['password'];
            $id = $params['id'];
    
            $model = new UserModel();
    
            $users = $model->putUser($id,'password',password_hash($password, PASSWORD_DEFAULT));
        }
        else{
            echo 'mdp pas correct';
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
        if($timediff < 900)
        {
            return true;
        }
        else {
            return false;
        }

    }
}
