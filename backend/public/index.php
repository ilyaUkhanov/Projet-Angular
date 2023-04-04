<?php
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

const CORS_ORIGIN = "http://localhost:4200";
const JWT_SECRET = "tempkey_test";

$app = AppFactory::create();
//$app->setBasePath(SERVER_URI);

$app->get('/', "test");
$app->get('/login', "login");
$app->get('/products/[{id}]', "getProduct");
$app->get('/products', "getAllProducts");
$app->post('/products', "addProduct");
$app->patch('/products/[{id}]', "updateProduct");
$app->delete('/products/[{id}]', "deleteProduct");

function setupCORS($request) {
    return $request->withHeader('Access-Control-Allow-Origin', CORS_ORIGIN)
                    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
}

function test($request,$response,$args) {
    $response->getBody()->write("Hello world!");
    return setupCORS($response);
}

function login($request,$response,$args) {
    $issuedAt = time();
    $expirationTime = $issuedAt + 600;
    $payload = array(
        'userid' => "1",
        'email' => "ukhanov.ilya.67@gmail.com",
        'pseudo' => "ukhanov",
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");

    $response->getBody()->write("");
    return setupCORS($response)
            ->withHeader("Authorization", "Bearer {$token_jwt}");
}

function getProduct($request,$response,$args) {
    // $id = $args['id'];

    $product = [ 'name' => "TEST" ];
    return $response->getBody()->write(json_encode($product));
}

function getAllProducts($request,$response,$args) {
    $response->getBody()->write(json_encode(PRODUCTS));
    return setupCORS($response);
}

function addProduct($request,$response,$args) {
    // $body = $request->getParsedBody();
    // $nom = $body['nom'];

    $response->getBody()->write("");
    return setupCORS($response);
}

function updateProduct($request,$response,$args) {
//    $id = $args['id'];
//    $body = $request->getParsedBody();
//    $nom = $body['nom'];

    $response->getBody()->write("");
    return setupCORS($response);
}
function deleteProduct($request,$response,$args) {
//    $id = $args['id'];

    $response->getBody()->write("");
    return setupCORS($response);
}

$app->run();
