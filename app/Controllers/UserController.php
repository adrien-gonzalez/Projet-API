<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\HTTP\Response;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\RESTful\ResourceController;

class UserController extends ResourceController
{

    public function user() {
        $method = $_SERVER["REQUEST_METHOD"];
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

    public function getUsers() {
            $model = new UserModel();
            $users = $model->getUsers();

            echo json_encode($users);
    }

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

    public function putUser() {
        $requestBody = $this->request->getRawInput();

        // En dessous c'est mes tests, tkt delete pas stp, merci bro
        // var_dump($id);
        //var_dump($this->request);
        // var_dump($this->request->getBody());
        // $test = '{"name": 1,"coucou": 1 }';
        // var_dump($test);
        // var_dump(json_decode($test));
        // $json = '{"a":1,"b":2,"c":3,"d":4,"e":5}';
        // Fin de mes tests

        var_dump($requestBody);
    }
    
}