<?php
define('APP_ROOT', __DIR__);

use Doctrine\DBAL\DriverManager;
use Doctrine\DBAL\Tools\DsnParser;

$dsnParser = new DsnParser();
$connectionParams = $dsnParser
    ->parse('pdo-pgsql://root:FD69TAD1OrTY9ys7TePmQq6da38xk8gq@dpg-chq90iu7avjb90m6m960-a.frankfurt-postgres.render.com/nfe114_db');
$conn = DriverManager::getConnection($connectionParams);

return [
    'settings' => [
        'displayErrorDetails' => true,
        'determineRouteBeforeAppMiddleware' => false,

        'doctrine' => [
            // Enables or disables Doctrine metadata caching
            // for either performance or convenience during development.
            'dev_mode' => true,

            // Path where Doctrine will cache the processed metadata
            // when 'dev_mode' is false.
            'cache_dir' => APP_ROOT . '/var/doctrine',

            // List of paths where Doctrine will search for metadata.
            // Metadata can be either YML/XML files or PHP classes annotated
            // with comments or PHP8 attributes.
            'metadata_dirs' => [APP_ROOT . '/src/entities'],

            // The parameters Doctrine needs to connect to your database.
            // These parameters depend on the driver (for instance the 'pdo_sqlite' driver
            // needs a 'path' parameter and doesn't use most of the ones shown in this example).
            // Refer to the Doctrine documentation to see the full list
            // of valid parameters: https://www.doctrine-project.org/projects/doctrine-dbal/en/current/reference/configuration.html
            // 'connection' => [
            //     'driver' => 'pdo_pgsql',
            //     'host' => 'dpg-chq90iu7avjb90m6m960-a.frankfurt-postgres.render.com',
            //     'port' => 5432,
            //     'dbname' => 'nfe114_db',
            //     'user' => 'root',
            //     'password' => 'FD69TAD1OrTY9ys7TePmQq6da38xk8gq',
            //     'charset' => 'UTF8'
            // ]
            'connection' => $conn
        ]
    ]
];
