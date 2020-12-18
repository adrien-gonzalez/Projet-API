<?php

namespace App\Controllers;

use App\Models\GameServerModel;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\HTTP\RequestInterface;


class GameServerController extends BaseController
{

    public function gameServer() {
        $method = $_SERVER["REQUEST_METHOD"];
        $actions = [
            "GET" => "getServerByGame",
            //"POST" => "postServer",
            //"PUT" => "putServer",
            //"DELETE" => "deleteServer"
        ];

        $call = $actions[$method];
        $response = $this->$call();
        return $response;
    }

    public function getServerByGame()
    {
        try {
            $uri = $this->request->uri;
            $game = $uri->getSegment(1);
            $server = $uri->getSegment(2);
            $model = new  GameServerModel();
            $server = $model->getServerByGame($game, $server);

            if($server == false) {
                return redirect('home');
            } else {
                echo json_encode($server);
            }

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