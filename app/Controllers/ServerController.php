<?php

namespace App\Controllers;

use App\Models\ServerModel;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\RESTful\ResourceController;
use Config\Services;
use Firebase\JWT\JWT;

class ServerController extends ResourceController
{
    protected $request;

    public function server() {
        $method = $_SERVER["REQUEST_METHOD"];
        $actions = [
            "GET" => "getServers",
            "POST" => "postServer",
            "PUT" => "putServer",
            "DELETE" => "deleteServer"
        ];

        $call = $actions[$method];
        
        if ($call == "deleteServer") {
            $response = $this->$call($request = "");
        }
        else {
            $response = $this->$call();
        }
        return $response;

    }

    public function deleteServer() {
            if ( isset($_GET["serverId"]) && is_numeric($_GET["serverId"]) ) {

                // Décodage du token pour récupérer les infos
                $decodedToken = $this->decodeToken();

                $model = new ServerModel();

                $isMyServer = $model->isMyServer($_GET["serverId"], $decodedToken->id);
                if ($isMyServer) {
                    try {
                        $server = $model->deleteServer($decodedToken);
                        return true;
                    }
                    catch(Exception $e) {
                        return $this->respond(['message' => "Une erreur est survenue"], 401);
                    }
                }
                else {
                    return $this->respond(['message' => "Le serveur ne vous appartient pas"], 401);
                }

            }
    }

    public function decodeToken() {
        $key = Services::getSecretKey();
        $authHeader = $this->request->getServer('HTTP_AUTHORIZATION');
        $arr        = explode(' ', $authHeader);
        $token      = $arr[1];
        $decodedToken = JWT::decode($token, $key, ['HS256']);
        return $decodedToken;
    }
    
}