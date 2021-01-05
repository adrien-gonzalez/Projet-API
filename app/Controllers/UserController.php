<?php

namespace App\Controllers;

use Exception;
use RuntimeException;
use App\Models\UserModel;
use App\Controllers\BaseController;

class UserController extends BaseController
{
    /**
     * Fonction qui redirige vers la fonction qui correspond à la méthode utilisée
     */
    public function user()
    {
        $method = $_SERVER["REQUEST_METHOD"];
        $actions = [
            "GET" => "getUser",
            "POST" => "postUser",
            "PUT" => "putUser",
            "DELETE" => "deleteUser"
        ];

        $call = $actions[$method];

        $response = $this->$call();
        return $response;
    }

    /**
     * Récupère les informations de l'utilisateur connecté
     */
    public function getUser()
    {
        $id = $_GET['id'];

        $model = new UserModel();
        $users = $model->getUsers($id);

        echo json_encode($users);
    }

    /**
     * Modifie les informations de l'utilisateur 
     */
    public function putUser()
    {
        // gère les restrictions du formulaire
        $rules_email = [
            'email' => [
                'rules' => 'required|valid_email',
            ],
        ];
        $rules_login = [
            'login' => [
                'rules' => 'required',
            ],
        ];
        $rules_pwd = [
            'password' => [
                'rules' => 'required|min_length[8]',
            ],
        ];

        $params = $this->request->getRawInput();
        $file = $this->request->getFile('profil_picture');
        $id = $_POST['id'];

        $model = new UserModel();

        switch ($params || $file) {
            case isset($params['login']):
                if ($this->validate($rules_login)) {
                    $users = $model->putUser($params['id'], 'login', $params['login']);
                    return true;
                } else {
                    // echo les erreurs
                    echo $this->validator->listErrors();
                }
            case isset($params['email']):
                if ($this->validate($rules_email)) {
                    $users = $model->putUser($params['id'], 'email', $params['email']);
                    return true;
                } else {
                    // echo les erreurs
                    echo $this->validator->listErrors();
                }
            case isset($params['password']):
                if ($this->validate($rules_pwd)) {
                    $users = $model->putUser($params['id'], 'password', password_hash($params['password'], PASSWORD_DEFAULT));
                    return true;
                } else {
                    // echo les erreurs
                    echo $this->validator->listErrors();
                }
            case (isset($file) && isset($id)):
                if (!$file->isValid()) {
                    throw new Exception($file->getErrorString() . '(' . $file->getError() . ')');
                } else {
                    // Generate a new secure name
                    $name = $file->getRandomName();
                    $pictures = scandir('../App/Sauvegarde/Profil_picture');
                    foreach ($pictures as $picture) {
                        $pic = strstr($picture, $id . '__');
                        if (!empty($pic)) {
                            unlink('../App/Sauvegarde/Profil_picture/' . $pic);
                        }
                    }

                    // Tableau des extensions acceptées
                    $extensions = ['jpg', 'png', 'jpeg'];
                    if (in_array($file->getExtension(), $extensions)) {
                        // Move the file to it's new home
                        $file->move('../App/Sauvegarde/Profil_picture', $id . '__' . $name);
                        $users = $model->putUser($id, 'picture_profil', $id . '__' . $name);
                    } else {
                        throw new Exception('L\'extension du fichier n\'est pas prise en compte.');
                    }
                }
                break;
        }
    }

    /**
     * Fonction créé pour mes tests
     */
    public function profil_picture()
    {
        return view('profil_picture.php');
    }
}
