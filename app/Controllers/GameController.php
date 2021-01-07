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

    public function getGames() {
            $model = new GameModel();
            $games = $model->getGames();

            echo json_encode($games);
    }
    
}