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
            "GET" => "getServersByGame",
            "POST" => "postServer",
            "PUT" => "putServer",
            "DELETE" => "deleteServer"
        ];

        $call = $actions[$method];
        $response = $this->$call();
        return $response;
    }


    public function getServersByGame()
    {
        try {
            $uri = $this->request->uri;
            $game = $uri->getSegment(1);
            if (isset($_GET['page'])) {
                $page = $_GET['page'];
                $limit = 1;
            } else {
              $page = 1;
              $limit = 1;
            }

            $model = new ServerModel();
            $servers = $model->getServersByGame($game, $page, $limit);
            
            if ($servers == false) {
                return redirect('home');
            } else {
                echo json_encode($servers);
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