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
 * @OA\Tag(
 *      name="Serveur",
 *      description="Requête concernant les serveurs",
 * ),
 * @OA\Tag(
 *      name="ResetPassword",
 *      description="Requête concernant la réinitialisation du mot de passe",
 * ),
 * @OA\Tag(
 *      name="Game",
 *      description="Requête concernant les jeux",
 * ),
 * @OA\Tag(
 *      name="User",
 *      description="Requête concernant les utilisateurs",
 * )
 */
