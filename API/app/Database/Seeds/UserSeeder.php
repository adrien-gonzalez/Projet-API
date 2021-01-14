<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use Faker\Factory;

class UserSeeder extends Seeder
{
    public function run()
    {
        for ($i = 0; $i < 10; $i++) {
            $this->db->table('users')->insert($this->generateUser());
        }
    }

    private function generateUser(): array
    {
        $faker = Factory::create();
        return [
            'login' => $faker->username(),
			'email' => $faker->email,
			'password' => password_hash("password", PASSWORD_BCRYPT),
			'picture_profil' => "test.png"
        ];
    }
}