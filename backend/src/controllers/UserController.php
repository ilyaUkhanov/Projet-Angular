<?php

namespace src\controller;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\NotSupported;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\TransactionRequiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use src\entities\Product;
use src\entities\User;
use src\services\UserService;

class UserController
{
    private UserService $userService;
    private EntityManager $entityManager;

    /**
     * @param UserService $userService
     */
    public function __construct(UserService $userService, EntityManager $entityManager)
    {
        $this->userService = $userService;
        $this->entityManager = $entityManager;
    }

    /**
     * @throws NotSupported
     */
    public function login($request, $response, $args) {
        $issuedAt = time();
        $expirationTime = $issuedAt + 604800; // 1 semaine

        $body = json_decode($request->getBody());

        if($body) {
            $login = $body->login;
            $password = $body->password;
            /** @var User $user */
            $user =  $this->entityManager
                          ->getRepository(User::class)
                          ->findOneBy(['login' => $login]);
        }

        if (!$user ||$password !== $user->password) {
            $response->getBody()->write("Utilisateur pas trouvé");
            return setupCORS($response);
        }

        $payload = array(
            'userid' => 1,
            'login' => $login,
            'password' => $password,
            'iat' => $issuedAt,
            'exp' => $expirationTime
        );

        $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");

        $response->getBody()->write(json_encode($user));
        return setupCORS($response)
            ->withHeader("Authorization", "Bearer {$token_jwt}");
    }

    /**
     * @throws NotSupported
     */
    public function getAllProducts($request, $response, $args) {
        $jwt = null;

        if ($request->getHeaders()["Authorization"]) {
            $jwtHeader = $request->getHeaders()["Authorization"][0];
            $jwtHeader = explode("Bearer ", $jwtHeader)[1];

            $jwt = JWT::decode($jwtHeader, new Key(JWT_SECRET, 'HS256'));
        }

        if ($jwt) {
            $products = json_encode(
                $this->entityManager
                     ->getRepository(Product::class)
                     ->findAll()
            );
            $response->getBody()->write($products);
            return setupCORS($response);
        }

        $response->getBody()->write("Utilisateur pas trouvé");
        return setupCORS($response);
    }

    /**
     * @throws OptimisticLockException
     * @throws TransactionRequiredException
     * @throws ORMException
     */
    public function getProduct($request, $response, $args) {
        if ($request->getHeaders()["Authorization"]) {
            $jwtHeader = $request->getHeaders()["Authorization"][0];
            $jwtHeader = explode("Bearer ", $jwtHeader)[1];

            $jwt = JWT::decode($jwtHeader, new Key(JWT_SECRET, 'HS256'));
        }

        if (!$jwt) {
            $response->getBody()->write("Utilisateur pas trouvé");
            return setupCORS($response);
        }

        $id = $args['id'];
        $product = $this->entityManager
            ->getRepository(Product::class)
            ->find([$id]);

        $response->getBody()->write(json_encode($product, true));
//        $response->getBody()->write("TEST");
        return $response;
    }
}
