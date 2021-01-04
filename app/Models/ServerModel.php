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
                                  
    public function getServers()
    {
        $limit = 10;

        if (isset($_GET['page'])) {
            $page = $_GET['page'];
        } else {
          $page = 1;
        }

        // recup tous le serveurs en fonction d'un jeu
        if(isset($_GET['game']))
        {
            if ($page == 1) {
                $offset = 0;
            } else {
                $offset = ($limit*$page) - $limit;
            }

            $builder = $this->db->table('servers');
            $builder->select('*');
            $builder->join('games', 'games.id = servers.games_fk');
            $builder->where('servers.games_fk', $_GET['game']);
            $builder->orderBy("servers.vote", "DESC");
            $builder->limit($limit, $offset);
            $query = $builder->get();
            $servers = $query->getResult(); 

        // recup serveur et ses info (avis, description...) via son id
        } else if(isset($_GET['id'])) {

            $builder = $this->db->table('servers');
            $builder->select('*');
            $builder->where('servers.id', $_GET['id']);
            $query = $builder->get();
            $servers = $query->getResult(); 
        } 
        return $servers;
    }

    public function postServers($users_fk, $param)
    {
          // Select games_fk
          $builder = $this->db->table('games');
          $builder->select('games.id');
          $builder->where("games.name_game", $param['name_game']);
          $query = $builder->get()->getResult();
          
          if (sizeof($query) != 0){
              $id_game = $query[0]->id;
          }

          $builder = $this->db->table('servers');
          $builder->insert([
              'name_server' => $param['name_server'],
              'website'   => $param['website'],
              'discord' => $param['discord'],
              'ip' => $param['ip'],
              'port' => $param['port'],
              'description' => $param['description'],
              'games_fk' => $id_game,
              'users_fk' => $users_fk
         ]);
    }

    public function putServers($server_id, $param)
    {
        $builder = $this->db->table('servers');
        $builder->set('name_server', $param['name_server']);
        $builder->set('website', $param['website']);
        $builder->set('discord', $param['discord']);
        $builder->set('ip', $param['ip']);
        $builder->set('port', $param['port']);
        $builder->set('description', $param['description']);        
        $builder->where('servers.id', $server_id);
        $builder->update();
    }
}