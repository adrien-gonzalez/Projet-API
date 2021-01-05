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
     * Utilisé pour récupérer les infos de l'utilisateur connecté
     * -- UserController
     */
    public function getUsers($id)
    {
        $builder = $this->db->table('users');
        $query = $builder->where('id',$id)->get()->getResult();

        return $query;
    }

    /**
     * Utilisé pour la demande de réinitialisation du mot de passe
     * -- PasswordController
     */
    public function getUsers_mail($mail)
    {
        $builder = $this->db->table('users');
        $query = $builder->where('email',$mail)->get()->getResult();

        return $query;
    }

    /**
     * Utilisé lors de l'activation du lien du mail
     *  Vérification de la validité du token
     * -- PasswordController
     */
    public function getUsers_token($token)
    {
        $builder = $this->db->table('users');
        $query = $builder->where('reset_token',$token)->get()->getResult();

        return $query;
    }

    /**
     * Utilisé pour modifier les infos de l'utilisateur (profil)
     * -- UserController
     */
    public function putUser($id,$champ,$params)
    {
        $builder = $this->db->table('users');
        $builder->set($champ,$params);
        $builder->where('id',$id);
        $query = $builder->update();

        return $query;
    }

    /**
     * Utilisé lors de la réinitialisation du mdp
     * Réinitialise le token à null ainsi que sa date
     * -- PasswordController
     */
    public function resetToken($id)
    {
        $builder = $this->db->table('users');
        $builder->set('reset_token',null);
        $builder->set('date_token',null);
        $builder->where('id',$id);
        $query = $builder->update();

        return $query;
    }
    
    /**
     * Utilisé lors de la demande de réinitialisation du mot de passe
     *  Création d'un token et de la date d'ajout de celui-ci
     * -- PasswordController
     */
    public function putToken($token,$email)
    {
        $builder = $this->db->table('users');
        $builder->set('reset_token',$token);
        $builder->set('date_token',date('Y-m-d H:i:s'));
        $builder->where('email',$email);
        $query = $builder->update();

        return $query;
    }
}