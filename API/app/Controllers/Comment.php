<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use Config\Services;
use Firebase\JWT\JWT;
use App\Models\UserModel;
use Exception;

class Comment extends ResourceController
{

	public function create()
	{
        $comment = $this->request->getRawInput()["comment"];
        $user_fk = 1;
        $server_fk = 4;

    }
}