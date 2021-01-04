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
            "DELETE" => "deleteUser"
        ];

        $call = $actions[$method];
        $response = $this->$call();
        return $response;
    }

    public function getUsers() {
        try {
          
            $model = new UserModel();
            $users = $model->getUsers();
            echo json_encode($users);

        } catch (Exception $e) {
            return $this->getResponse(
                [
                    'message' => 'Could not find client for specified ID'
                ],
                ResponseInterface::HTTP_NOT_FOUND
            );
        }
    }

    public function deleteUser() {

        // récup id user
        try {
            $id = $_GET['id'];
            $model = new UserModel();
            $deleteUser = $model->deleteUser($id);

        } catch (Exception $e) {
            return $this->getResponse(
                [
                    'message' => 'Could not find client for specified ID'
                ],
                ResponseInterface::HTTP_NOT_FOUND
            );
        }
    }
}