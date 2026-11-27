<?php
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    http_response_code(405);
    exit();
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';

if (stripos($contentType, 'application/json') === false) {
    http_response_code(415);
    exit();
}

$json = file_get_contents('php://input');

$datos = json_decode($json, true);

try {
    json_decode(
        $json,
        true,
        512,
        JSON_THROW_ON_ERROR
    );
} catch (JsonException $e) {

    http_response_code(400);

    echo json_encode([
        'ok' => false,
        'mensaje' => 'JSON inválido'
    ]);

    exit();
}

if (!is_array($datos)) {
    http_response_code(422);
    exit();
}

$nombre = $datos['nombre'] ?? null;
$email = $datos['email'] ?? null;

if(!is_string($nombre) || !is_string($email)) {
    http_response_code(422);

    echo json_encode([
        'ok' => false,
        'datos' => 'Datos inválidos'
    ]);
    exit();
}

$nombre = trim($nombre);
$email = trim($email);

if (mb_strlen($nombre) < 2 || mb_strlen($nombre) > 80) {
    http_response_code(422);

    echo json_encode([
        'ok' => false,
        'datos' => 'Nombre inválido'
    ]);
}

if (mb_strlen($email) > 120) {
    http_response_code(422);

    echo json_encode([
        'ok' => false,
        'datos' => 'E-mail inválido'
    ]);
}

http_response_code(200);
echo json_encode(
    ['ok' => true, 'datos' => "Todo ha salido a pedir de milhouse"],
    JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR
);
