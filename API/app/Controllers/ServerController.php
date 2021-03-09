<?php

namespace App\Controllers;

use Exception;
use Config\Services;
use Firebase\JWT\JWT;
use App\Models\ServerModel;
use App\Models\UserModel;
use OpenApi\Annotations as OA;
use CodeIgniter\RESTful\ResourceController;

class ServerController extends ResourceController
{

    public function server() {

        $method = $_SERVER["REQUEST_METHOD"];

        if ( $method == "POST" || $method == "DELETE" ) {
            $key        = Services::getSecretKey();
            $authHeader = $this->request->getServer('HTTP_AUTHORIZATION');
            if (is_null($authHeader)) { //JWT is absent
                return $this->respond(['message' => "Token introuvable"], 401);
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
                return $this->respond(['message' => "Token invalide"], 401);
            }
        }

        $actions = [
            "GET" => "getServers",
            "POST" => "postServer",
            // "PUT" => "putServer",
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
     *      tags={"Serveur"},
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
     *      tags={"Serveur"},
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
     *      tags={"Serveur"},
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
        $decodedToken = $this->decodeToken();  
        $model = new ServerModel();

        if(isset($_FILES['file']['name']))
        {
            $idImage = uniqid();
            $folderPath = "../public_html/assets/miniature_server/";   
            $file_tmp = $_FILES['file']['tmp_name'];
            $file_ext = strtolower(end(explode('.',$_FILES['file']['name'])));
            $file = $folderPath . $idImage . '.'.$file_ext;
            $imageServer = $idImage.'.'.$file_ext;
        }

        if ( !isset($_POST["name"]) || empty($_POST["name"]) ) {
            array_push($errors["errors"], ['nameServerEmpty' => "Veuillez renseigner un nom de serveur"]);
            $stop = true;
        }
        
        if ( !isset($imageServer)) {
            array_push($errors["errors"], ['miniatureEmpty' => "Veuillez renseigner une miniature pour votre serveur"]);
            $stop = true;
        }
        
        if ( !isset($_POST["description"]) || empty($_POST["description"]) ) {
            array_push($errors["errors"], ['descriptionEmpty' => "Veuillez renseigner une description"]);
            $stop = true;
        }

        if ( !isset($_POST["gameId"]) || empty($_POST["gameId"]) ) {
            array_push($errors["errors"], ['name_gameEmpty' => "Veuillez renseigner un jeu"]);
            $stop = true;
        }

        if ( $stop === true ) {
            return $this->respond($errors, 401);
        } else {
            try {
                $model->postServers($decodedToken->id, $imageServer);
                move_uploaded_file($file_tmp, $file);
                return true;

            } catch (Exception $e) {
                array_push($errors["errors"], ['nameAlreadyExist' => $e->getMessage()]);
                return $this->respond($errors, 401);
                // return $e->getMessage();
            }
        }
    }

     /**
     * @OA\PUT(
     *      path="/servers?id={id}",
     *      description="Modifier les détails d'un serveur",
     *      security={{"bearerAuth":{}}}, 
     *      tags={"Serveur"},     
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
	 *               	@OA\Property(property="name_server", type="string" ),
	 *               	@OA\Property(property="description", type="string"),
	 *               	@OA\Property(property="miniature", type="string" ),
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
    public function updateServer()
    {
        if (isset($_GET["id"]) && is_numeric($_GET["id"])) {
            
            $errors = ["errors" => []];
            $stop = false;
            
            // Décodage du token pour récupérer les infos
            $decodedToken = $this->decodeToken();
            $model = new ServerModel();
            $isMyServer = $model->isMyServer($_GET["id"], $decodedToken->id);

            if ($isMyServer) {
                if ( !isset($_POST["name"]) || empty($_POST["name"]) ) {
                    array_push($errors["errors"], ['nameServerEmpty' => "Veuillez renseigner un nom de serveur"]);
                    $stop = true;
                }
                              
                if ( !isset($_POST["description"]) || empty($_POST["description"]) ) {
                    array_push($errors["errors"], ['descriptionEmpty' => "Veuillez renseigner une description"]);
                    $stop = true;
                }
        
                if ( $stop === true ) {
                    return $this->respond($errors, 401);
                } else {
                    try {
                        if(isset($_FILES['file']['name']))
                        {
                            $idImage = uniqid().$_GET['id'];
                            $folderPath = "../public_html/assets/miniature_server/";   
                            $file_tmp = $_FILES['file']['tmp_name'];
                            $file_ext = strtolower(end(explode('.',$_FILES['file']['name'])));
                            $file = $folderPath . $idImage . '.'.$file_ext;
                            move_uploaded_file($file_tmp, $file);
                            $imageServer = $idImage.'.'.$file_ext;
                        } else {
                            $imageServer = null;
                        }
                        $model->updateServer($imageServer);
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
     *      tags={"Serveur"},
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
       
        if ( isset($_GET["id"]) && is_numeric($_GET["id"]) ) {

           
            // Décodage du token pour récupérer les infos
            $decodedToken = $this->decodeToken();
            $param = $this->request->getRawInput();
            $model = new ServerModel();
            $modelUser = new UserModel();
            $idUser = $decodedToken->id;
            $getByID = $modelUser->getUserById($idUser);
            $errors = ["errors" => []];


            

            $isMyServer = $model->isMyServer($_GET["id"], $idUser);

            if ($isMyServer) {
                if (password_verify($this->request->getRawInput()["password"], $getByID[0]->password)) {
                    try {
                        $server = $model->deleteServer();
                        return true;
                    }
                    catch(Exception $e) {
                        return $this->respond(['message' => "Une erreur est survenue"], 401);
                    }
                }
                else {
                    array_push($errors["errors"], ['password_error' => "Le mot de passe actuel est incorrect."]);
                    return $this->respond($errors, 401);
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


