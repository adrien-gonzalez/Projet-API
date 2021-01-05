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

    public function deleteUser() {

        // récup id user
        try {
            $id = $_GET['id'];
            $model = new UserModel();
            $model->deleteUser($id);
            return true;

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