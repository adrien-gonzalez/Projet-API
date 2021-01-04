<?php

namespace App\Controllers;

use Exception;
use App\Models\UserModel;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;


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
                    'message' => 'Page not found'
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
            echo json_decode($deleteUser);

        } catch (Exception $e) {
            return $this->getResponse(
                [
                    'message' => 'User not deleted !'
                ],
                ResponseInterface::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}