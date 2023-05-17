<?php

namespace src\services;

use Doctrine\ORM\EntityManager;
use src\entities\User;

final class UserService
{
    private EntityManager $em;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    public function register(string $login): User
    {
        $user = new User($login);

        $this->em->persist($user);
        $this->em->flush();

        return $user;
    }
}
