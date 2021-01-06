<?php namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php'))
{
	require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/**
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
// $routes->add('api/users', 'UserController::user');
// $routes->add('api/servers', 'ServerController::server');
// $routes->add('api/resetpassword', 'PasswordController::resetPassword');

// ROUTES GET
$routes->get('api', 'Home::index');
$routes->get('api/games', 'GameController::getGames');
$routes->get('api/servers', 'ServerController::getServers');
$routes->get('api/resetpassword', 'PasswordController::getToken');
// $routes->get('api/users', 'UserController::getUsers', ['filter' => 'authFilter']);

// ROUTES POST
$routes->post('api/servers', 'ServerController::postServer', ['filter' => 'authFilter']);
$routes->post('api/users', 'UserController::postUser');
$routes->post('api/auth', 'Auth::create');
$routes->post('api/resetpassword', 'PasswordController::sendMail');

// ROUTES PUT
$routes->put('api/servers', 'ServerController::putServer', ['filter' => 'authFilter']);
$routes->put('api/users', 'UserController::putUser', ['filter' => 'authFilter']);
$routes->put('api/resetpassword', 'PasswordController::putPassword');

// ROUTES DELETE
$routes->delete('api/users', 'ServerController::deleteUser', ['filter' => 'authFilter']);
$routes->delete('api/servers', 'ServerController::deleteServer', ['filter' => 'authFilter']);

// Route pour faire mes test (à supprimer)
$routes->get('api/users/profil_picture', 'UserController::profil_picture');


/**
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php'))
{
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
