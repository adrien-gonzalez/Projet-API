<?php

namespace App\Controllers;

use Exception;
use App\Models\GameModel;
use Config\Services;
use Firebase\JWT\JWT;
use OpenApi\Annotations as OA;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\RESTful\ResourceController;


class GameController extends ResourceController
{

    public function game() {

        $method = $_SERVER["REQUEST_METHOD"];

        // if ($method == "GET") {
        //     $key        = Services::getSecretKey();
        //     $authHeader = $this->request->getServer('HTTP_AUTHORIZATION');
        //     // var_dump($authHeader);
        //     // die;
        //     if (is_null($authHeader)) { //JWT is absent
        //         return $this->respond(['message' => "Token introuvable"], 401);
        //     } else {
        //         $arr        = explode(' ', $authHeader);
        //         $token      = $arr[1];
        //     }

        //     try {
        //         $decodedToken = JWT::decode($token, $key, ['HS256']);
        //     } catch (\Exception $e) {
        //         return $this->respond(['message' => "Token invalide"], 401);

        //     }
        // }

        $actions = [
            "GET" => "getGames",
            "POST" => "postGames",
            "PUT" => "putGames",
            "DELETE" => "deleteGames"
        ];

        $call = $actions[$method];
        
        $response = $this->$call();
        return $response;

    }

    /**
     * @OA\GET(
     *      path="/games?popular={num}",
     *      description="Liste des jeux les plus populaires",
     *      tags={"Game"},
     *      @OA\Parameter(
     *          name="num",
     *          in="query",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Liste des jeux les plus populaires",
     *          @OA\JsonContent(type="object"),
     *      ),
     *      @OA\Response(
     *          response="401",
     *          description="Page not found",
     *          @OA\JsonContent(type="object"),
     *      )
     * )
     */

    /**
     * @OA\GET(
     *      path="/games",
     *      description="Liste des jeux",
     *      tags={"Game"},
     *      @OA\Response(
     *          response="200",
     *          description="Liste des jeux",
     *          @OA\JsonContent(type="object"),
     *      ),
     *      @OA\Response(
     *          response="401",
     *          description="Page not found",
     *          @OA\JsonContent(type="object"),
     *      )
     * )
     */

    public function getGames() {
            $model = new GameModel();
            $games = $model->getGames();

            echo json_encode($games);
    }
    
}