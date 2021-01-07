<?php

use OpenApi\Annotations as OA;

/**
 * @OA\Info(title="API Server", version="0.1")
 * @OA\Server(
 *   url="http://localhost:8080/api",
 *   description="Mon API"
 * ),
 * @OA\Schemes(format="http")
 * @OA\SecurityScheme(
 *      securityScheme="bearerAuth",
 *      in="header",
 *      name="bearerAuth",
 *      type="http",
 *      scheme="bearer",
 *      bearerFormat="JWT",
 * ),
 */
