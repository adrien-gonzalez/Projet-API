<?php

namespace App\Models;

use CodeIgniter\Model;
use Exception;

class ServerModel extends Model
{
    protected $db;

    public function __construct() {
        $this->db = \Config\Database::connect();
    }
                                  
    public function getServersByGame($game, $page, $limit)
    {

        $builder = $this->db->table('games');
        $builder->select('games.id');
        $builder->where("games.name_game", $game);
        $query = $builder->get()->getResult();

        if (sizeof($query) != 0){
            $id_game = $query[0]->id;
        }
    
        if(!isset($id_game))
        {
            return false;
        } else {
            if ($page == 1) {
                $offset = 0;
            } else {
                $offset = ($limit*$page) - $limit;
            }
                
            $builder = $this->db->table('servers');
            $builder->select('*');
            $builder->join('games', 'games.id = servers.games_fk');
            $builder->where('servers.games_fk', $id_game);
            $builder->orderBy("servers.vote", "DESC");
            $builder->limit($limit, $offset);
            $query = $builder->get();
            $servers = $query->getResult(); 
        }
        return $servers;
    }
}