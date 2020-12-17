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
        $query = $builder->get();
        $user = $query->getResult();

        return $user;
    }
}