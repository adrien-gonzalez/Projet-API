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

        $builder = $this->db;
        if( isset($_GET["popular"]) ) {

            $builder->select('game.name, COUNT(`games_fk`) AS `value_occurrence`');
            $builder->from('servers');
            $builder->join('games', 'games.id = games_fk');
            $builder->groupBy('games_fk');
            $builder->oderBy('value_occurence', 'DESC');
            $query = $builder->get($_GET["popular"]);
            // A continuer
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