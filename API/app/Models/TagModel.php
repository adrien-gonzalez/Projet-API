<?php

namespace App\Models;

use CodeIgniter\Model;
use Exception;

class TagModel extends Model
{
    protected $db;

    public function __construct() {
        $this->db = \Config\Database::connect();
    }
                                  
    public function getTags()
    {
        if(isset($_GET['game']) && is_numeric($_GET['game'])) {
            $builder = $this->db->table('tags');
            $builder->select('tags.name');
            $builder->where('tags.games_fk', $_GET['game']);
            $query = $builder->get();
            $tags = $query->getResult();
        }

        else if(isset($_GET['serveur_id']) && is_numeric($_GET['serveur_id'])) {
            
            $builder = $this->db->table('servers_tags');
            $builder->select('tags.name');
            $builder->join('tags', 'tags.id = servers_tags.tags_fk');
            // $builder->join('users', 'avis.users_fk = users.id', 'LEFT');
            $builder->where('servers_tags.servers_fk', $_GET['serveur_id']);
            $query = $builder->get();
            $tags = $query->getResult();
        }
        return $tags;
    }
}