<?php

namespace App\Controllers;

use App\Models\ServerModel;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\RESTful\ResourceController;
use Config\Services;
use Firebase\JWT\JWT;
use Exception;

class ServerController extends ResourceController
{

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

    public function getServers($id = null)
    {
        try {
            $model = new ServerModel();
            if ($id == null) {
                $servers = $model->getServers();
            }
            else {
                $servers = $model->getServers($id);
            }
            echo json_encode($servers);
    
        } catch (Exception $e) {
            return $this->respond(['message' => "Page introuvable"], 404);
        }
    }

    public function postServer()
    {
        try {
            // récup id user
            $users_fk = 3;
            $param = $this->request->getRawInput();
            $model = new ServerModel();
            $model->postServers($users_fk, $param);
            return true;

        } catch (Exception $e) {
            return $this->respond(['message' => $e->getMessage()], 500);
        }
    }

    public function putServer()
    {
        try {
            $server_id = $_GET['id'];
            $param = $this->request->getRawInput();
            $model = new ServerModel();
            $model->putServers($server_id, $param);
            return true;

        } catch (Exception $e) {
            return $this->respond(['message' => $e->getMessage()], 500);
        }
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