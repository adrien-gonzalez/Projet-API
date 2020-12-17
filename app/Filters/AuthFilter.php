<?php 

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Services;
use Firebase\JWT\JWT;
use CodeIgniter\API\ResponseTrait;
use Exception;

class AuthFilter implements FilterInterface
{
	use ResponseTrait;

	public function before(RequestInterface $request, $arguments = NULL)
	{
		$key        = Services::getSecretKey();
		$authHeader = $request->getServer('HTTP_AUTHORIZATION');
		if (is_null($authHeader)) { //JWT is absent
			throw new Exception('Missing or invalid JWT in request');
		}
		else {
			// GO DECODER LE TOKEN ET CHECK SI EMAIL EST DANS BDD
			$arr        = explode(' ', $authHeader);
			$token      = $arr[1];
			// var_dump($arr);
		}

		try
		{
			JWT::decode($token, $key, ['HS256']);
		}
		catch (\Exception $e)
		{
			return Services::response()
				->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
		}
	}

	//--------------------------------------------------------------------

	public function after(RequestInterface $request, ResponseInterface $response, $arguments = NULL)
	{
		// Do something here
	}
}