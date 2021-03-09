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
        if(isset($_GET['game']) && is_numeric($_GET['game']))
        {
            if ($page == 1) {
                $offset = 0;
            } else {
                $offset = ($limit*$page) - $limit;
            }

            $builder = $this->db->table('games');
            $builder->select('servers.id, servers.name, website, discord, port, ip,
            servers.description as descriptionServer, games.description as descriptiponGame,
            miniature, vote, click, games.image, games.logo, games.color, servers.miniature, games.name as nameGame, AVG(avis.score) as score, COUNT(avis.id) as avis_count');
            $builder->join('servers', 'servers.games_fk = games.id');
            $builder->join('avis', 'avis.servers_fk = servers.id', 'left');
            $builder->where('games.id', $_GET['game']);
            $builder->orderBy("servers.vote", "DESC");
            $builder->groupBy("servers.id");
            $builder->limit($limit, $offset);
            $query = $builder->get();
            $servers = $query->getResult();

        // recup serveur et ses info (avis, description...) via son id
        } else if(isset($_GET['id']) && is_numeric($_GET['id'])) {
            
            $builder = $this->db->table('servers');
            $builder->select('servers.id, servers.name, website, discord, port, ip,
            servers.description as descriptionServer, miniature, vote, avis.comment, COUNT(avis.comment) as numberComment, avis.score,
            avis.date, users.login, users.picture_profil, games.color, servers.games_fk');
            $builder->join('games', 'games.id = servers.games_fk');
            $builder->join('avis', 'avis.servers_fk = servers.id', 'LEFT');
            $builder->join('users', 'avis.users_fk = users.id', 'LEFT');
            $builder->where('servers.id', $_GET['id']);
            $builder->orderBy("avis.date", "DESC");
            $builder->groupBy("avis.id");
            $query = $builder->get();
            $servers = $query->getResult();

        // recup serveur et ses info selon l'utilisateur
        } else if(isset($_GET['user']) && is_numeric($_GET['user'])) {

            $builder = $this->db->table('servers');
            $builder->select('servers.id, servers.name, website, discord, port, ip,
            servers.description as descriptionServer, miniature, vote,
            games.color, games.name as nameGame, COUNT(avis.comment) as avis');
            $builder->join('games', 'games.id = servers.games_fk');
            $builder->join('avis', 'avis.servers_fk = servers.id', 'LEFT');
            $builder->where('servers.users_fk', $_GET['user']);
            $builder->orderBy("servers.id", "DESC");
            $builder->groupBy("servers.id");
            $query = $builder->get();
            $servers = $query->getResult();
        }
        return $servers;
    }

    public function postServers($user_fk, $imageServer)
    {
        $builder = $this->db->table('servers');
        $builder->select('servers.name');
        $builder->where("servers.name", $_POST['name']);
        $query = $builder->get()->getResult();

        if (sizeof($query) == 0){

            $builder = $this->db->table('servers');
            $builder->insert([
                'name' => $_POST['name'],
                'website'   => $_POST['website'],
                'discord' => $_POST['discord'],
                'ip' => $_POST['ip'],
                'port' => $_POST['port'],
                'description' => $_POST['description'],
                'miniature' => $imageServer,
                'games_fk' => $_POST['gameId'],
                'users_fk' => $user_fk
            ]);

            // Récup l'id du serveur créé précédemment et insert image_servers (si image(s) upload)
            if (!empty($_POST['image_servers'])) {
                $builder = $this->db->table('servers');
                $builder->select('servers.id');
                $builder->orderBy("id", "desc");
                $query = $builder->get()->getResult();
                
                if (sizeof($query) != 0){
                    $id_server = $query[0]->id;
                }

                $builder = $this->db->table('image_servers');
                $builder->insert([
                    'name' => $_POST['image_servers'],
                    'servers_fk' => $id_server,
                ]);
            }
        } else {
            throw new Exception('Serveur déjà existant');
        }
    }

    public function updateServer($imageServer)
    {
        $builder = $this->db->table('servers');
        $builder->select('servers.miniature');
        $builder->where('servers.id', $_GET['id']);
        $query = $builder->get()->getResult();

        if($imageServer != null) {
            unlink('../public_html/assets/miniature_server/'.$query[0]->miniature);
        } else {
            $imageServer = $query[0]->miniature;
        }
    
        $builder = $this->db->table('servers');
        $builder->set('name', $_POST['name']);
        $builder->set('website', $_POST['website']);
        $builder->set('discord', $_POST['discord']);
        $builder->set('ip', $_POST['ip']);
        $builder->set('port', $_POST['port']);
        $builder->set('description', $_POST['description']);
        $builder->set('games_fk', $_POST['gameId']);   
        $builder->set('miniature', $imageServer);
        $builder->where('servers.id', $_GET['id']);
        $builder->update();
    }

    public function deleteServer() {

        $builder = $this->db->table('servers');
        $queryDelete = $builder->where('id', $_GET["id"]);
        $queryDelete->delete();
    }

    /**
     * Vérifie si le serveur m'appartient (avant de delete par exemple)
     */
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
}