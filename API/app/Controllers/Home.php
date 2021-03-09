<?php

namespace App\Controllers;

use App\Models\UserModel;

class Home extends BaseController
{
	public function index()
	{
		// return redirect()->to('http://nicolas-camilloni.students-laplateforme.io/swagger/index.html');
		return redirect()->to('./swagger/index.html');
	}
}
