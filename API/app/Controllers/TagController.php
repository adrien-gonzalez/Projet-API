<?php

namespace App\Controllers;

use Exception;
use Config\Services;
use Firebase\JWT\JWT;
use App\Models\TagModel;
use OpenApi\Annotations as OA;
use CodeIgniter\RESTful\ResourceController;

class TagController extends ResourceController
{

    public function tag() {

        $method = $_SERVER["REQUEST_METHOD"];

        $actions = [
            "GET" => "getTags",
        ];

        $call = $actions[$method];
        
        $response = $this->$call();
        return $response;
    }

    public function getTags()
    {
        try {
            $model = new TagModel();
            $tags = $model->getTags();
            echo json_encode($tags);
    
        } catch (Exception $e) {
            return $this->respond(['message' => "Page introuvable"], 404);
        }
    }

}