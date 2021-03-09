<?php declare(strict_types=1);

use App\Controllers\UserController;
use PHPUnit\Framework\TestCase;

final class UserControllerTest extends TestCase
{
    public function testCanBeCreatedFromValidEmailAddress(): void
    {
        $this->assertEquals(json_encode(''),
            UserController::getUser(),'okokoko'
        );
    }
}