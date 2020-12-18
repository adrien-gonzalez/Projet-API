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

    public function putUser($id,$champ,$params)
    {
        $builder = $this->db->table('users');
        $builder->set($champ,$params);
        $builder->where('id',$id);
        $query = $builder->update();

        return $query;
    }
}