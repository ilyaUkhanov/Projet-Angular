<?php

use Firebase\JWT\Key;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Routing\RouteCollector;
use Slim\Middleware\OutputBufferingMiddleware;
use Tuupola\Middleware\JwtAuthentication;
use \Firebase\JWT\JWT;

require __DIR__ . '/../vendor/autoload.php';

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

$app = AppFactory::create();
$app->addBodyParsingMiddleware();

$app->post('/login', "login");
$app->get('/products', "getAllProducts");
$app->get('/products/[{id}]', "getProduct");

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

function login($request,$response,$args) {
    $issuedAt = time();
    $expirationTime = $issuedAt + 600;

    $body = json_decode($request->getBody());

    if($body) {
        $login = $body->login;
        $password = $body->password;
        $user = USERS[$login];
    }

    if (!$user ||$password !== $user["password"]) {
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

$app->options('/products', function (Request $request, Response $response, $args) {
    $response = $response->withHeader("Access-Control-Max-Age", 600);
    return setupCORS($response);
});

function getAllProducts($request,$response,$args) {
    $jwt = null;

    if ($request->getHeaders()["Authorization"]) {
        $jwtHeader = $request->getHeaders()["Authorization"][0];
        $jwtHeader = explode("Bearer ", $jwtHeader)[1];

        $jwt = JWT::decode($jwtHeader, new Key(JWT_SECRET, 'HS256'));
    }

    if ($jwt) {
        $products = json_encode(PRODUCTS);
        $response->getBody()->write($products);
        return setupCORS($response);
    }

    $response->getBody()->write("Utilisateur pas trouvé");
    return setupCORS($response);
}

function getProduct($request,$response,$args) {
    // $id = $args['id'];
    $product = [ 'name' => "TEST" ];
    return $response->getBody()->write(json_encode($product));
}

$app->run();
