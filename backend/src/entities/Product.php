<?php
namespace src\entities;

use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Table;

#[Entity, Table(name: 'products')]
final class Product
{
    #[Id, Column(type: 'integer'), GeneratedValue(strategy: 'AUTO')]
    public int $id;

    #[Id, Column(type: 'integer', nullable: false)]
    public int $price;

    #[Column(type: 'string', nullable: false)]
    public string $title;

    public function __construct()
    {
    }
}
