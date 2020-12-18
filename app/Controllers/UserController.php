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
            "POST" => "putUser",
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
        $params = $this->request->getRawInput();
        $file = $this->request->getFile('profil_picture');
        $id = $_POST['id'];

        $model = new UserModel();

        switch ($params || $file) {
            case isset($params['login']):
                $users = $model->putUser($params['id'], 'login', $params['login']);
                break;
            case isset($params['email']):
                if (filter_var($params['email'], FILTER_VALIDATE_EMAIL)) {
                    $users = $model->putUser($params['id'], 'email', $params['email']);
                } else {
                    throw new Exception('L\'email n\'est pas au bon format !');
                }
                break;
            case isset($params['password']):
                if (strlen($params['password']) >= 8) {
                    $users = $model->putUser($params['id'], 'password', password_hash($params['password'], PASSWORD_DEFAULT));
                } else {
                    throw new Exception('Le mot de passe doit faire au moins 8 caractères');
                }
                break;
            case (isset($file) && isset($id)):
                if (!$file->isValid()) {
                    throw new Exception($file->getErrorString() . '(' . $file->getError() . ')');
                } else {
                    // Generate a new secure name
                    $name = $file->getRandomName();
                    $pictures = scandir('../App/Sauvegarde/Profil_picture');
                    foreach ($pictures as $picture) {
                        $test = strstr($picture, $id . '__');
                        if (!empty($test)) {
                            unlink('../App/Sauvegarde/Profil_picture/' . $test);
                        }
                    }

                    // Tableau des extensions acceptées
                    $extensions = ['jpg', 'png', 'jpeg'];
                    if (in_array($file->getExtension(), $extensions)) {
                        // Move the file to it's new home
                        $file->move('../App/Sauvegarde/Profil_picture', $id . '__' . $name);
                        $users = $model->putUser($id, 'picture_profil', $id . '__' . $name);
                    } else {
                        throw new Exception('L\'extension du fichier n\'pas prise en compte.');
                    }
                }
                break;
        }
    }

    public function profil_picture()
    {
        return view('profil_picture');
    }
}
