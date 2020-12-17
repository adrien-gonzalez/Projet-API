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

    public function getUserById($id)
    {
        $builder = $this->db->table('users');
        $query = $builder->getWhere(['id' => $id]);
        $user = $query->getResult();

        return $user;
    }
}