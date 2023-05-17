<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use src\controller\UserController;

require __DIR__ . '/../vendor/autoload.php';
$container = require __DIR__ . '/../bootstrap.php';

const PRODUCTS = [
    [
        "id"=> 1,
        "title"=> "The Last of Us",
        "price"=> 10
    ],
    [
        "id"=> 2,
        "title"=> "Blood Origin",
        "price"=> 120
    ],
    [
        "id"=> 3,
        "title"=> "Wednesday",
        "price"=> 100
    ],
    [
        "id"=> 4,
        "title"=> "The rings of power",
        "price"=> 110
    ],
    [
        "id"=> 5,
        "title"=> "The House of the Dragon",
        "price"=> 20
    ],
    [
        "id"=> 6,
        "title"=> "Vikings Valhalla",
        "price"=> 10
    ]
];

const JWT_SECRET = "tempkey_test";

const USERS = [
    "ilyau" => [
        "login" => "ilyau",
        "firstname" => "Ilya",
        "lastname" => "Ukhanov",
        "password" => "1234",
    ],
    "thomasp" => [
        "login" => "thomasp",
        "firstname" => "Thomas",
        "lastname" => "Personnenni",
        "password" => "1234",
    ]
];

$app = AppFactory::create(null, $container);
$app->addBodyParsingMiddleware();

$app->post('/login', [UserController::class, 'login']);
$app->get('/products', [UserController::class, 'getAllProducts']);
$app->get('/products/[{id}]', [UserController::class, 'getProduct']);

function setupCORS($request) {
    return $request
        ->withHeader("Content-Type", "application/json")
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type,  Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        ->withHeader('Access-Control-Expose-Headers', 'Authorization');
}

$app->options('/login', function (Request $request, Response $response, $args) {
    $response = $response->withHeader("Access-Control-Max-Age", 600);
    return setupCORS($response);
});

$app->options('/products', function (Request $request, Response $response, $args) {
    $response = $response->withHeader("Access-Control-Max-Age", 600);
    return setupCORS($response);
});

$app->run();
