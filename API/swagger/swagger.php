<?php

use OpenApi\Annotations as OA;

/**
 * @OA\Info(title="ServTop", version="0.1")
 * @OA\Server(
 *   url="https://nicolas-camilloni.students-laplateforme.io/api",
 *   description="Notre API serveur"
 * ),
 * @OA\Schemes(format="http")
 * @OA\SecurityScheme(
 *      securityScheme="bearerAuth",
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
