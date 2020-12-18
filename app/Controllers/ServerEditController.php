<?php

namespace App\Controllers;

use App\Models\ServerEditModel;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\HTTP\RequestInterface;


class ServerEditController extends BaseController
{

    public function Edit() {
        $method = $_SERVER["REQUEST_METHOD"];
        $actions = [
            "GET" => "getServerEdit",
            //"POST" => "postServer",
            "PUT" => "putServerEdit",
            //"DELETE" => "deleteServer"
        ];

        $call = $actions[$method];
        $response = $this->$call();
        return $response;
    }

    public function getServerEdit()
    {
        try {
            $uri = $this->request->uri;
            $server = $uri->getSegment(1);
            $model = new  ServerEditModel();
            $server = $model->getServerEdit($server);

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

    public function putServerEdit()
    {
        try {
            $uri = $this->request->uri;
            $server_name = $uri->getSegment(1);
            $param = $this->request->getRawInput();
            $model = new  ServerEditModel();
            $server = $model->putServerEdit($server_name, $param);
            
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