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

    public function isMyServer($id, $idUser) {
        $builder = $this->db->table('servers');
        $queryVerif = $builder->where('id', $id);
        $queryVerif = $queryVerif->where('users_fk', $idUser);
        $result = $queryVerif->get();
        if ($result->resultID->num_rows != 0) {
            return true;
        }
        else {
            return false;
        }
    }
                                  
    public function deleteServer($decodedToken) {
        $builder = $this->db->table('servers');
        $queryDelete = $builder->where('id', $_GET["serverId"]);
        $queryDelete->delete();
    }
}