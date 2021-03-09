<?php namespace App\Controllers;

use App\Models\CommentModel;
use CodeIgniter\RESTful\ResourceController;
use Config\Services;
use Firebase\JWT\JWT;
use App\Models\UserModel;
use Exception;

class CommentController extends ResourceController
{

    public function comment() {
        $method = $_SERVER["REQUEST_METHOD"];
        $actions = [
            // "GET" => "getComment",
            "POST" => "postComment",
            "PUT" => "putComment",
            "DELETE" => "deleteComment"
        ];

        $call = $actions[$method];
        
        $response = $this->$call();
        return $response;

    }


    public function postComment()
    {
        $errors = ["errors" => []];
        $decodedToken = $this->decodeToken();
        $user_fk = $decodedToken->id;
        $param = $this->request->getRawInput();
        $comment = new CommentModel();

        try {
            $comment -> postComment($user_fk, $param);
            return true;

        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    public function decodeToken()
    {
        $key = Services::getSecretKey();
        $authHeader = $this->request->getServer('HTTP_AUTHORIZATION');
        $arr        = explode(' ', $authHeader);
        $token      = $arr[1];
        $decodedToken = JWT::decode($token, $key, ['HS256']);
        return $decodedToken;
    }
}