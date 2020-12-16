<?php

namespace App\Models;

use CodeIgniter\Model;
use Exception;

class UserModel extends Model
{
    protected $table = 'users';
    protected $allowedFields = [
        'login',
        'email',
        'password',
    ];
    // protected $updatedField = 'updated_at';
                                      
    public function getUsers()
    {
        $user = $this
            ->asArray()
            ->first();

        if (!$user) 
            throw new Exception('User does not exist for specified email address');

        return $user;
    }
}