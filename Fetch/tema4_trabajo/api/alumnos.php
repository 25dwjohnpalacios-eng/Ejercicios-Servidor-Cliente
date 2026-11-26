<?php
header('Content-Type: application/json; charset=utf-8');
$alumnos = [
    ['id' => 1, 'nombre' => 'Ana López'],
    ['id' => 2, 'nombre' => 'Luis Pérez'],
    ['id' => 3, 'nombre' => 'Marta Gil']
];

$q = $_GET['q'] ?? '';

if ($q !== '') {
    $alumnos = array_values(array_filter(
        $alumnos,
        fn($a) => stripos($a['nombre'], $q) !== false
    ));
}

echo json_encode(
    ['ok' => true, 'datos' => $alumnos],
    JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR
);
