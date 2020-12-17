<?php

namespace App\Models;

use CodeIgniter\Model;
use Exception;

class UserModel extends Model
{
                                      
    public function getUsers()
    {
        $db = \Config\Database::connect();
        $builder = $db->table('users');
        $query = $builder->get();
        $user = $query->getResult();

        return $user;
    }
}