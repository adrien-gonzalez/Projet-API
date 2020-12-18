<?php

namespace App\Models;

use CodeIgniter\Model;
use Exception;

class GameServerModel extends Model
{
    protected $db;

    public function __construct() {
        $this->db = \Config\Database::connect();
    }
                                  
    public function getServerByGame($game, $server)
    {
        $builder = $this->db->table('games');
        $builder->select('servers.id');
        $builder->join('servers', 'games.id = servers.games_fk');
        $builder->where("games.name_game", $game);
        $builder->where("servers.name_server", $server);
        $query = $builder->get()->getResult();
        
        if (sizeof($query) != 0){
            $id_server = $query[0]->id;
        }
    
        if (!isset($id_server)){
            return false;
        } else {
            $builder = $this->db->table('games');
            $builder->select('servers.website, servers.name_server, servers.discord, 
            servers.ip, servers.port, servers.description as servers_description, 
            servers.vote, games.name_game, games.logo, games.description as game_description, 
            avis.comment, avis.score, avis.date, users.login');
            $builder->join('servers', 'games.id = servers.games_fk');
            $builder->join('avis', 'avis.servers_fk = servers.id', 'LEFT');
            $builder->join('users', 'avis.users_fk = users.id', 'LEFT');
            $builder->where("servers.id", $id_server);
            $server = $builder->get()->getResult();

            return $server;
        }
    }
}