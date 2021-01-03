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
			throw new Exception('Missing JWT in request');
		}
		else {
			$arr        = explode(' ', $authHeader);
			$token      = $arr[1];
		}

		try
		{
			$decodedToken = JWT::decode($token, $key, ['HS256']);
		}
		catch (\Exception $e)
		{
			throw new Exception("Invalid JWT");
		}
	}

	//--------------------------------------------------------------------

	public function after(RequestInterface $request, ResponseInterface $response, $arguments = NULL)
	{
		// Do something here
	}
}