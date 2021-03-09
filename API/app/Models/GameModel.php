<?php

namespace App\Models;

use CodeIgniter\Model;
use Exception;

class GameModel extends Model
{
    protected $db;

    public function __construct() {
        $this->db = \Config\Database::connect();
    }
                                  
    public function getGames()
    {

        // REQUETE JEUX POPULAIRE : SELECT games.name, COUNT(`games_fk`) AS `value_occurrence` FROM `servers` INNER JOIN games ON games.id = games_fk GROUP BY `games_fk` ORDER BY `value_occurrence` DESC LIMIT 3 

        if( isset($_GET["popular"]) && is_numeric($_GET["popular"]) ) {
            $builder = $this->db->table('servers');
            $builder->select('games.*, COUNT(`games_fk`) AS `serv_count`');
            // $builder->from('servers');
            $builder->join('games', 'games.id = games_fk');
            $builder->groupBy('games_fk');
            $builder->orderBy('serv_count', 'DESC');
            $query = $builder->get($_GET["popular"]);
            
        } else if(isset($_GET['carousel'])) {
            $builder = $this->db->table('games');
            $builder->select('*');
            // $builder->from('servers');
            // $builder->join('games', 'games.id = games_fk');
            // $builder->groupBy('games_fk');
            $builder->orderBy('games.id', 'ASC');
            $query = $builder->get();
        } else {
            $builder = $this->db->table('games');
            $builder->select('games.*, COUNT(`games_fk`) AS `serv_count`');
            // $builder->from('servers');
            $builder->join('servers', 'games.id = games_fk', 'LEFT');
            $builder->groupBy('games_fk');
            $builder->orderBy('serv_count', 'DESC');
            $query = $builder->get();
        }
        

        $games = $query->getResult();

        return $games;
    }

    public function postUser()
    {

        $builder = $this->db->table('users');
        
        $data = [
            'title' => 'My title',
            'name'  => 'My Name',
            'date'  => 'My date'
        ];
        
        $builder->insert($data);
    
    }
}