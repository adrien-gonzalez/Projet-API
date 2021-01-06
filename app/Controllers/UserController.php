<?php

namespace App\Controllers;

use Exception;
use Config\Services;
use Firebase\JWT\JWT;
use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

class UserController extends ResourceController {

    /**
     * Fonction qui redirige vers la fonction qui correspond à la méthode utilisée
     */
    public function user()
    {
        $method = $_SERVER["REQUEST_METHOD"];

        if ( $method == "PUT" || $method == "DELETE" ) {
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
            "GET" => "getUsers",
            "POST" => "postUser",
            "PUT" => "putUser",
            "DELETE" => "deleteUser"
        ];

        $call = $actions[$method];
        $response = $this->$call();
        return $response;
    }

    // public function getUsers() {
    //         $model = new UserModel();
    //         $users = $model->getUsers();

    //         echo json_encode($users);
    // }

    public function postUser() {
        
        $params = $this->request->getRawInput();
        $errors = ["errors" => []];
        $stop = false;

        if ( !isset($params["login"]) || empty($params["login"]) ) {
            array_push($errors["errors"], ['loginEmpty' => "Veuillez renseigner un nom d'utilisateur"]);
            $stop = true;
        }
        else {
            $login = $params["login"];
        }
        
        if ( !isset($params["email"]) || empty($params["email"]) ) {
            array_push($errors["errors"], ['emailEmpty' => "Veuillez renseigner une adresse email"]);
            $stop = true;
        }
        else {
            $email = $params["email"];
        }
        
        if ( !isset($params["password"]) || empty($params["password"]) ) {
            array_push($errors["errors"], ['passwordEmpty' => "Veuillez renseigner un mot de passe"]);
            $stop = true;
        }
        else {
            $password = $params["password"];
        }
        
        if ( !isset($params["cpassword"]) || empty($params["cpassword"]) ) {
            array_push($errors["errors"], ['cpasswordEmpty' => "Veuillez renseigner la confirmation de mot de passe"]);
            $stop = true;
        }
        else {
            $cpassword = $params["cpassword"];
        }

        if ( $stop === true ) {
            return $this->respond($errors, 401);
        }
        
        $login = $params["login"];
        $email = $params["email"];
        $password = $params["password"];
        $cpassword = $params["cpassword"];

        $model = new UserModel();
        $getByEmail = $model->getUserByEmail($email);
        $getByLogin = $model->getUserByLogin($login);

        if ( !empty($getByEmail) ) {
            array_push($errors["errors"], ['emailExist' => "Cet email est déjà utilisé"]);
            $stop = true;
        }

        if ( !empty($getByLogin) ) {
            array_push($errors["errors"], ['loginExist' => "Ce nom d'utilisateur est déjà utilisé"]);
            $stop = true;
        }

        if (!preg_match("/^[a-zA-Z0-9]{3,16}$/", $login)) {
            array_push($errors["errors"], ['invalidEmail' => "Le login faire minimum 3 caractères et maximum 16 caractères. Les caractères spéciaux ne sont pas autorisés"]);
            $stop = true;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            array_push($errors["errors"], ['invalidEmail' => "L'email indiqué n'est pas valide"]);
            $stop = true;
        }

        if ( $password != $cpassword ) {
            array_push($errors["errors"], ['passwordAndConfirmNotMatch' => "Les mots de passe doivent correspondre"]);
            $stop = true;
        }

        if (!preg_match("/^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/", $password)) {
            array_push($errors["errors"], ['invalidPassword' => "Le mot de passe doit faire minimum 4 caractères et doit contenir une lettre majuscule, une lettre minuscule et un chiffre"]);
            $stop = true;
        }

        if ( $stop === true ) {
            return $this->respond($errors, 401);
        }
        else {
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT, $options = ["cost" => 12]);
            try {
                $model->postUser($login, $email, $hashedPassword);
                return true;
            } catch(Exception $e) {
                return $this->respond("Une erreur est survenue", 401);
            }
        }
    }

    /**
     * Modifie les informations de l'utilisateur 
     */
    public function putUser()
    {
        // gère les restrictions du formulaire
        $rules_email = [
            'email' => [
                'rules' => 'required|valid_email',
            ],
        ];
        $rules_login = [
            'login' => [
                'rules' => 'required|min_length[3]|max_length[16]',
            ],
        ];
        $rules_pwd = [
            'password' => [
                'rules' => 'required|min_length[8]',
            ],
        ];

        $params = $this->request->getRawInput();
        $file = $this->request->getFile('profil_picture');

        $errors = ["errors" => []];

        // Décodage du token pour récupérer les infos
        $decodedToken = $this->decodeToken();

        $model = new UserModel();

        switch ($params || $file) {
            case isset($params['login']):
                if ($this->validate($rules_login)) {
                    if (!preg_match("/^[a-zA-Z0-9]{3,16}$/", $params['login'])) {
                        array_push($errors["errors"], ['login_error' => "Les caractères spéciaux ne sont pas autorisés"]);
                        return $this->respond($errors, 401);
                    } else {
                        $verif_login = $model->getUserByLogin($params['login']);
                        if (empty($verif_login)) {
                            $model->putUser($decodedToken->id, 'login', $params['login']);
                            return true;
                        } else {
                            array_push($errors["errors"], ['login_error' => "Ce nom d'utilisateur est déjà utilisé"]);
                            return $this->respond($errors, 401);
                        }
                    }
                } else {
                    array_push($errors["errors"], ['login_error' => $this->validator->getError('login')]);
                    return $this->respond($errors, 401);
                }
                break;
            case isset($params['email']):
                if ($this->validate($rules_email)) {
                    $verif_email = $model->getUserByEmail($params['email']);
                    if (empty($verif_email)) {
                        $model->putUser($decodedToken->id, 'email', $params['email']);
                        return true;
                    } else {
                        array_push($errors["errors"], ['email_error' => "Cet email est déjà utilisé"]);
                        return $this->respond($errors, 401);
                    }
                } else {
                    array_push($errors["errors"], ['email_error' => $this->validator->getError('email')]);
                    return $this->respond($errors, 401);
                }
                break;
            case isset($params['password']):
                if ($this->validate($rules_pwd)) {
                    if (!preg_match("/^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/", $params['password'])) {
                        array_push($errors["errors"], ['password_error' => "Le mot de passe doit contenir une lettre majuscule, une lettre minuscule et un chiffre"]);
                        return $this->respond($errors, 401);
                    } else {
                        $model->putUser($decodedToken->id, 'password', password_hash($params['password'], PASSWORD_BCRYPT, $options = ["cost" => 12]));
                        return true;
                    }
                } else {
                    array_push($errors["errors"], ['conf_password_error' => $this->validator->getError('conf_password')]);
                    array_push($errors["errors"], ['password_error' => $this->validator->getError('password')]);
                    return $this->respond($errors, 401);
                }
                break;
            case (isset($file) && isset($decodedToken->id)):
                if (!$file->isValid()) {
                    throw new Exception($file->getErrorString() . '(' . $file->getError() . ')');
                } else {
                    // Generate a new secure name
                    $name = $file->getRandomName();
                    $pictures = scandir('../App/Sauvegarde/Profil_picture');
                    foreach ($pictures as $picture) {
                        $pic = strstr($picture, $decodedToken->id . '__');
                        if (!empty($pic)) {
                            unlink('../App/Sauvegarde/Profil_picture/' . $pic);
                        }
                    }

                    // Tableau des extensions acceptées
                    $extensions = ['jpg', 'png', 'jpeg'];
                    if (in_array($file->getExtension(), $extensions)) {
                        // Move the file to it's new home
                        $file->move('../App/Sauvegarde/Profil_picture', $decodedToken->id . '__' . $name);
                        $model->putUser($decodedToken->id, 'picture_profil', $decodedToken->id . '__' . $name);
                    } else {
                        throw new Exception('L\'extension du fichier n\'est pas prise en compte.');
                    }
                }
                break;
        }
    }
    
    public function deleteUser() {

        // Décodage du token pour récupérer les infos
        $decodedToken = $this->decodeToken();
        $model = new UserModel();
        $id_user = $decodedToken->id;

        try {
            $model->deleteUser($id_user);
            return true;
        } catch (Exception $e) {
            return $this->getResponse(
                [
                    'message' => 'User not deleted !'
                ],
                ResponseInterface::HTTP_INTERNAL_SERVER_ERROR
            );
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

    /**
     * Fonction créé pour mes tests
     */
    public function profil_picture()
    {
        return view('profil_picture.php');
    }

}