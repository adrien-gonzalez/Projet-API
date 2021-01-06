<?php

namespace App\Controllers;

use Exception;
use Config\Services;
use Firebase\JWT\JWT;
use App\Models\ServerModel;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;

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

    public function getServers()
    {
        try {
            $model = new ServerModel();
            $servers = $model->getServers();
            echo json_encode($servers);
    
        } catch (Exception $e) {
            return $this->respond(['message' => "Page introuvable"], 404);
        }
    }

    public function postServer()
    {
        $errors = ["errors" => []];
        $stop = false;

        // Décodage du token pour récupérer les infos
        $decodedToken = $this->decodeToken();
        // récup id user connecté
        $user_fk = $decodedToken->id;
        $param = $this->request->getRawInput();
        $model = new ServerModel();

        if ( !isset($param["name_server"]) || empty($param["name_server"]) ) {
            array_push($errors["errors"], ['nameServerEmpty' => "Veuillez renseigner un nom de serveur"]);
            $stop = true;
        }
        
        if ( !isset($param["miniature"]) || empty($param["miniature"]) ) {
            array_push($errors["errors"], ['miniatureEmpty' => "Veuillez renseigner une miniature pour votre serveur"]);
            $stop = true;
        }
        
        if ( !isset($param["description"]) || empty($param["description"]) ) {
            array_push($errors["errors"], ['descriptionEmpty' => "Veuillez renseigner une description"]);
            $stop = true;
        }

        if ( !isset($param["name_game"]) || empty($param["name_game"]) ) {
            array_push($errors["errors"], ['name_gameEmpty' => "Veuillez renseigner un jeu"]);
            $stop = true;
        }

        if ( $stop === true ) {
            return $this->respond($errors, 401);
        } else {
            try {
                $model->postServers($user_fk, $param);
                return true;

            } catch (Exception $e) {
                return $this->respond(['message' => $e->getMessage()], 500);
            }
        }
    }

    public function putServer()
    {
        if (isset($_GET["id"]) && is_numeric($_GET["id"])) {

            // Décodage du token pour récupérer les infos
            $decodedToken = $this->decodeToken();
            $model = new ServerModel();
            $isMyServer = $model->isMyServer($_GET["id"], $decodedToken->id);

            if ($isMyServer) {
                try {
                    $param = $this->request->getRawInput();
                    $model->putServers($param);
                    return true;

                } catch (Exception $e) {
                    return $this->respond(['message' => $e->getMessage()], 500);
                } 
            } else {
                return $this->respond(['message' => "Le serveur ne vous appartient pas"], 401);
            }
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
                    $server = $model->deleteServer();
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