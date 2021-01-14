<?php

namespace App\Controllers;

use App\Models\GameModel;

class GameController extends BaseController
{

    public function game() {
        $method = $_SERVER["REQUEST_METHOD"];
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