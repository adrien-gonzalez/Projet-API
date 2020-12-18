<?php

namespace App\Models;

use CodeIgniter\Model;
use Exception;

class ServerEditModel extends Model
{
    protected $db;

    public function __construct() {
        $this->db = \Config\Database::connect();
    }
                                  
    public function getServerEdit($server)
    {
        // récup id user connecté
        // vérif si le serveur appartient bien à l'user connecté
        $builder = $this->db->table('servers');
        $builder->select('servers.id');
        $builder->where("servers.name_server", $server);
        $query = $builder->get()->getResult();
        
        if (sizeof($query) != 0){
            $id_server = $query[0]->id;
        }
    
        if (!isset($id_server)){
            return false;
        } else {
            $builder = $this->db->table('servers');
            $builder->select('*');
            $builder->where("servers.id", $id_server);
            $server = $builder->get()->getResult();

            return $server;
        }
    }

    public function putServerEdit($server, $param)
    {
        // récup id user connecté
        $builder = $this->db->table('servers');
        $builder->select('servers.id');
        $builder->where("servers.name_server", $server);
        $query = $builder->get()->getResult();
        
        if (sizeof($query) != 0){
            $id_server = $query[0]->id;
        }
    
        if (!isset($id_server)){
            return false;
        } else {
            $builder = $this->db->table('servers');
            $builder->set('name_server', $param['name_server']);
            $builder->set('website', $param['website']);
            $builder->set('discord', $param['discord']);
            $builder->set('ip', $param['ip']);
            $builder->set('port', $param['port']);
            $builder->set('description', $param['description']);        
            $builder->where('servers.id', $id_server);
            $builder->update();
        }
    }
}