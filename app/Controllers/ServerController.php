<?php

namespace App\Controllers;

use Exception;
use Config\Services;
use Firebase\JWT\JWT;
use App\Models\ServerModel;
use OpenApi\Annotations as OA;
use CodeIgniter\RESTful\ResourceController;

class ServerController extends ResourceController
{

    public function server() {
        
        $method = $_SERVER["REQUEST_METHOD"];

        if ( $method == "POST" || $method == "PUT" || $method == "DELETE" ) {
            $key        = Services::getSecretKey();
            $authHeader = $this->request->getServer('HTTP_AUTHORIZATION');
            if (is_null($authHeader)) { //JWT is absent
                throw new Exception('Missing JWT in request');
            }
            else {
                $arr        = explode(' ', $authHeader);
                $token      = $arr[1];
            }
    
            try
            {
                $decodedToken = JWT::decode($token, $key, ['HS256']);
            }
            catch (\Exception $e)
            {
                throw new Exception("Invalid JWT");
            }
        }

        $actions = [
            "GET" => "getServers",
            "POST" => "postServer",
            "PUT" => "putServer",
            "DELETE" => "deleteServer"
        ];

        $call = $actions[$method];
        
        $response = $this->$call();

        return $response;

    }

     /**
     * @OA\GET(
     *      path="/servers?id={id}",
     *      description="Détail d'un serveur",
     *      @OA\Parameter(
     *          name="id",
     *          in="query",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Détail du serveur",
     *          @OA\JsonContent(type="object"),
     *      ),
     *      @OA\Response(
     *          response="404",
     *          description="Page not found (serveur non trouvé)",
     *          @OA\JsonContent(type="object"),
     *      )
     * )
     */

     /**
     * @OA\GET(
     *      path="/servers?game={id}",
     *      description="Liste les serveurs en fonction du jeu",
     *      @OA\Parameter(
     *          name="game",
     *          in="query",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="Liste des serveurs",
     *          @OA\JsonContent(type="object"),
     *      ),
     *      @OA\Response(
     *          response="404",
     *          description="Page not found (jeu non trouvé)",
     *          @OA\JsonContent(type="object"),
     *      )
     * )
     */
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

     /**
     * @OA\POST(
     *      path="/servers",
     *      description="Créer un serveur",
     *      security={{"bearerAuth":{}}}, 
     *      @OA\RequestBody(
 	 *         	@OA\MediaType(
	 *           mediaType="application/x-www-form-urlencoded",
	 *           	@OA\Schema(
	 *               	type="object",
	 *               	@OA\Property(property="name_server", type="string"),
	 *               	@OA\Property(property="description", type="string"),
	 *               	@OA\Property(property="miniature", type="string"),
	 *               	@OA\Property(property="port", type="string"),
	 *               	@OA\Property(property="website", type="string"),
	 *               	@OA\Property(property="ip", type="string"),
	 *               	@OA\Property(property="discord", type="string"),
	 *               	@OA\Property(property="image_servers", type="string"),
	 *            	)
	 *			)
     *      ),
     *       @OA\Response(
     *          response="200",
     *          description="True",
     *          @OA\JsonContent(type="object"),
     *      ),
     *      @OA\Response(
     *          response="401",
     *          description="Des champs sont vides",
     *          @OA\JsonContent(type="object"),
     *      )
     * )
     */
    public function postServer()
    {
        $errors = ["errors" => []];
        $stop = false;

        // Décodage du token pour récupérer les infos
        // $decodedToken = $this->decodeToken();
        // récup id user connecté
        $user_fk = 1;
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

     /**
     * @OA\PUT(
     *      path="/servers?id={id}",
     *      description="Modifier les détails d'un serveur",
     *      security={{"bearerAuth":{}}}, 
     *      @OA\Parameter(
     *          name="id",
     *          in="query",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\RequestBody(
 	 *         	@OA\MediaType(
	 *           mediaType="application/x-www-form-urlencoded",
	 *           	@OA\Schema(
	 *               	type="object",
	 *               	@OA\Property(property="name_server", type="string"),
	 *               	@OA\Property(property="description", type="string"),
	 *               	@OA\Property(property="miniature", type="string"),
	 *               	@OA\Property(property="port", type="string"),
	 *               	@OA\Property(property="website", type="string"),
	 *               	@OA\Property(property="ip", type="string"),
	 *               	@OA\Property(property="discord", type="string"),
     *                  @OA\Property(property="image_servers", type="string")
	 *            	)
	 *			)
 	 *      ),
     *      @OA\Response(
     *          response="200",
     *          description="True",
     *          @OA\JsonContent(type="object"),
     *      ),
     *      @OA\Response(
     *          response="401",
     *          description="Des champs sont vides",
     *          @OA\JsonContent(type="object"),
     *      )
     * )
     */
    public function putServer()
    {
        if (isset($_GET["id"]) && is_numeric($_GET["id"])) {

            $errors = ["errors" => []];
            $stop = false;
            
            // Décodage du token pour récupérer les infos
            $decodedToken = $this->decodeToken();
            $param = $this->request->getRawInput();
            $model = new ServerModel();
            $isMyServer = $model->isMyServer($_GET["id"], $decodedToken->id);

            if ($isMyServer) {

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
                        $model->putServers($param);
                        return true;

                    } catch (Exception $e) {
                        return $this->respond(['message' => $e->getMessage()], 500);
                    } 
                }
            } else {
                return $this->respond(['message' => "Le serveur ne vous appartient pas"], 401);
            }
        }
    }

     /**
     * @OA\DELETE(
     *      path="/servers?id={id}",
     *      description="Supprimer un serveur",
     *      security={{"bearerAuth":{}}}, 
     *      @OA\Parameter(
     *          name="id",
     *          in="query",
     *          required=true,
     *          @OA\Schema(type="integer")
     *      ),
     *      @OA\Response(
     *          response="200",
     *          description="True",
     *          @OA\JsonContent(type="object"),
     *      )
     * )
     */
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


