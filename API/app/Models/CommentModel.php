<?php

namespace App\Models;

use DateTime;
use Exception;
use CodeIgniter\Model;

class CommentModel extends Model
{
    public function postComment($users_fk, $param)
    {
        $d = new DateTime();
        $date = $d->format('Y-m-d H:i:s');

        $builder = $this->db->table('avis');
        $builder->select('*');
        $builder->where('users_fk', $users_fk);
        $builder->where('servers_fk', $param['servers_fk']);
        $query = $builder->get();
        $alreadyExist = $query->getResult();

       

        if(count($alreadyExist) == 0) {
            $builder = $this->db->table('avis');
            $builder->insert([
                'users_fk' => $users_fk,
                'servers_fk'   => $param['servers_fk'],
                'comment' => $param['comment'],
                'score' => $param['score'],
                'date' => $date
            ]);
        } else {
            throw new Exception('Vous avez déjà posté un commentaire pour ce serveur');
        }     
    }
}