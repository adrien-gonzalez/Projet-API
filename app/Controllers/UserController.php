<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\HTTP\RequestInterface;

class UserController extends BaseController
{

    public function user() {
        $method = $_SERVER["REQUEST_METHOD"];
        $actions = [
            "GET" => "getUsers",
            "POST" => "postUser",
            "PUT" => "putUser",
            "DELETE" => "deleteUser"
        ];

        $call = $actions[$method];
        
        $response = $this->$call();
        return $response;

    }

    public function getUsers() {
            $model = new UserModel();
            $users = $model->getUsers();

            echo json_encode($users);
    }

    public function getUserById($id) {
        $model = new UserModel();
        $users = $model->getUserById($id);

        echo json_encode($users);
    }

    public function putUser() {
        $requestBody = $this->request->getRawInput();

        // En dessous c'est mes tests, tkt delete pas stp, merci bro
        // var_dump($id);
        //var_dump($this->request);
        // var_dump($this->request->getBody());
        // $test = '{"name": 1,"coucou": 1 }';
        // var_dump($test);
        // var_dump(json_decode($test));
        // $json = '{"a":1,"b":2,"c":3,"d":4,"e":5}';
        // Fin de mes tests

        var_dump($requestBody);
    }
    
}