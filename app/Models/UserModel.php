<?php

namespace App\Models;

use CodeIgniter\Model;
use Exception;

class UserModel extends Model
{
    protected $db;

    public function __construct() {
        $this->db = \Config\Database::connect();
    }
         
    /**
     * Récupération utilisateur avec GET PARAMS POSSIBLE
     * 
     * No get params -> Récupération de tous les users
     * get id -> Récupération d'un utilisateur via son id
     * 
     */
    public function getUsers()
    {
        $builder = $this->db->table('users');
        if( isset($_GET["id"]) ) {
            $query = $builder->getWhere(['id' => $_GET["id"]]);
        }
        else {
            $query = $builder->get();
        }
        $user = $query->getResult();

        return $user;
    }
                                  
    public function deleteUser($id)
    {
        $builder = $this->db->table('users');
        $builder->where('id', $id);
        $builder->delete();
    }

    /**
     * Récupération d'un utilisateur via son id
     */
    public function getUserById($id)
    {
        $builder = $this->db->table('users');
        $query = $builder->getWhere(['id' => $id]);
        $user = $query->getResult();

        return $user;
    }

    /**
     * Récupération d'un utilisateur via son login
     */
    public function getUserByLogin($login)
    {
        $builder = $this->db->table('users');
        $query = $builder->getWhere(['login' => $login]);
        $user = $query->getResult();

        return $user;
    }

    /**
     * Récupération d'un utilisateur via son email
     */
    public function getUserByEmail($email)
    {
        $builder = $this->db->table('users');
        $query = $builder->getWhere(['email' => $email]);
        $user = $query->getResult();

        return $user;
    }

    /**
     * Création d'un utilisateur
     */
    public function postUser($login, $email, $password)
    {

        $builder = $this->db->table('users');
        
        $data = [
            'login' => $login,
            'email'  => $email,
            'password' => $password,
            'picture_profil'  => "default.png",
            'reset_token' => null,
            'enabled' => 0
        ];
        
        $builder->insert($data);
    
    }
}