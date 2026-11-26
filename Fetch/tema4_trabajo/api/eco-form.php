<?php
$nombre = $_POST['nombre'];
$email = $_POST['email'];

if (!is_string($nombre) || !is_string($email)) {
    http_response_code(400);
    echo json_encode(
        ['ok' => false, 'datos' => "Datos inválidos"],
        JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR
    );
    exit();
}

$nombre = trim($nombre);
$email = trim($email);

if (mb_strlen($nombre) < 2 || mb_strlen($nombre) > 80) {
    http_response_code(400);
    echo json_encode(
        ['ok' => false, 'datos' => "Datos inválidos"],
        JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR
    );
    exit();
}

if (mb_strlen($email) > 120 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(
        ['ok' => false, 'datos' => "Email inválido"],
        JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR
    );
    exit();
}

http_response_code(200);
echo json_encode(
    ['ok' => true, 'datos' => "Todo ha salido a pedir de milhouse"],
    JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR
);
