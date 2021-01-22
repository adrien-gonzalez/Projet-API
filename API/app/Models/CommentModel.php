<?php

namespace App\Models;

use CodeIgniter\Model;
use Exception;

class CommentModel extends Model
{
    public function postComment($users_fk, $param)
    {
        $builder = $this->db->table('avis');
        $builder->insert([
            'users_fk' => $users_fk,
            'servers_fk'   => $param['servers_fk'],
            'comment' => $param['comment'],
            'score' => $param['score'],
            'date' => $param['date'],
        ]);
    }
}