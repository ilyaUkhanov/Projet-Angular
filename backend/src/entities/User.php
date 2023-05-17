<?php
namespace src\entities;

use DateTimeImmutable;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Table;

#[Entity, Table(name: 'users')]
final class User
{
    #[Id, Column(type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    public int $id;

    #[Column(type: 'string', unique: true, nullable: false)]
    public string $login;

    #[Column(type: 'string', unique: true, nullable: false)]
    public string $password;

    #[Column(name: 'registered_at', type: 'datetimetz_immutable', nullable: false)]
    public DateTimeImmutable $registeredAt;

    public function __construct()
    {
        $this->registeredAt = new DateTimeImmutable('now');
    }
}
