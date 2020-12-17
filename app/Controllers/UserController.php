<?php

namespace App\Controllers;

use App\Models\UserModel;

class UserController extends BaseController
{
    /**
     * Fonction qui redirige vers la fonction qui correspond à la méthode utilisée
     */
    public function user() {
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
    public function getUser() {

        $id = $_GET['id'];

        $model = new UserModel();
        $users = $model->getUsers($id);

        echo json_encode($users);
    }

    /**
     * Modifie les informations de l'utilisateur 
     */
    public function putUser() {

        $params = $this->request->getRawInput();

        $model = new UserModel();
        $users = $model->putUser($params);
    }
    
}