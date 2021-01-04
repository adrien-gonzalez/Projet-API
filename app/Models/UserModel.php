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
                                  
    public function getUsers($id)
    {
        $builder = $this->db->table('users');
        $query = $builder->where('id',$id)->get()->getResult();

        return $query;
    }

    public function getUsers_mail($mail)
    {
        $builder = $this->db->table('users');
        $query = $builder->where('email',$mail)->get()->getResult();

        return $query;
    }

    public function getUsers_token($token)
    {
        $builder = $this->db->table('users');
        $query = $builder->where('reset_token',$token)->get()->getResult();

        return $query;
    }

    public function putUser($id,$champ,$params)
    {
        $builder = $this->db->table('users');
        $builder->set($champ,$params);
        $builder->where('id',$id);
        $query = $builder->update();

        return $query;
    }

    public function resetPassword($token,$password)
    {
        $builder = $this->db->table('users');
        $builder->set('password',$password);
        $builder->where('reset_token',$token);
        $query = $builder->update();

        return $query;
    }
    
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