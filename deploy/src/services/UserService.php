<?php

namespace src\services;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use src\entities\User;

final class UserService
{
    private EntityManager $em;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    /**
     * @throws OptimisticLockException
     * @throws ORMException
     */
    public function register(string $login): User
    {
        $user = new User($login);

        $this->em->persist($user);
        $this->em->flush();

        return $user;
    }
}
