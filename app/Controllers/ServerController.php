<?php

namespace App\Controllers;

use Exception;
use App\Models\ServerModel;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;


class ServerController extends BaseController
{

    public function server() {
        $method = $_SERVER["REQUEST_METHOD"];
        $actions = [
            "GET" => "getServers",
            "POST" => "postServers",
            "PUT" => "putServers",
        ];

        $call = $actions[$method];
        $response = $this->$call();
        return $response;
    }

    public function getServers()
    {
        try {
            $model = new ServerModel();
            $servers = $model->getServers();
            echo json_encode($servers);
    
        } catch (Exception $e) {
            return $this->getResponse(
                [
                    'message' => 'Page not found'
                ],
                ResponseInterface::HTTP_NOT_FOUND
            );
        }
    }

    public function postServers()
    {
        try {
            // récup id user
            $users_fk = 3;
            $param = $this->request->getRawInput();
            $model = new ServerModel();
            $model->postServers($users_fk, $param);
            return true;

        } catch (Exception $e) {
            return $this->getResponse(
                [
                    'message' => $e->getMessage()
                ],
                ResponseInterface::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    public function putServers()
    {
        try {
            $server_id = $_GET['id'];
            $param = $this->request->getRawInput();
            $model = new ServerModel();
            $model->putServers($server_id, $param);
            return true;

        } catch (Exception $e) {
            return $this->getResponse(
                [
                    'message' => $e->getMessage()
                ],
                ResponseInterface::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}