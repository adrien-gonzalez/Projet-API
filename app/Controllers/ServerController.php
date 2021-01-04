<?php

namespace App\Controllers;

use App\Models\ServerModel;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\HTTP\RequestInterface;


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
                    'message' => 'Could not find servers for specified gameID'
                ],
                ResponseInterface::HTTP_NOT_FOUND
            );
        }
    }

    public function postServers()
    {
        // récup id user
        $users_fk = 3;
        $param = $this->request->getRawInput();
        $model = new  ServerModel();
        $server = $model->postServers($users_fk, $param);
    }

    public function putServers()
    {
        try {
            $server_id = $_GET['id'];
            $param = $this->request->getRawInput();
            $model = new  ServerModel();
            $server = $model->putServers($server_id, $param);

            echo json_encode($server);
        } catch (Exception $e) {
            return $this->getResponse(
                [
                    'message' => 'Could not find servers for specified gameID'
                ],
                ResponseInterface::HTTP_NOT_FOUND
            );
        }
    }
}