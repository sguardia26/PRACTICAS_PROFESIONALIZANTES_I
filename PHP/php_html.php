<?php
// CABECERA
header('Content-Type: text/html; charset=utf-8');

$respuesta = ''; // Se inicializa la variable para acumular

// Estructura HTML
$respuesta .= '<!DOCTYPE html>';
$respuesta .= '<html lang="es">';
$respuesta .= '<head>';
$respuesta .= '<meta charset="utf-8">'; 
$respuesta .= '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
$respuesta .= '<title>PHP/HTML</title>';
$respuesta .= '</head>';
$respuesta .= '<body>';
//CUERPO
$respuesta .= '</body>';
$respuesta .= '</html>';

// Imprime la estructura HTML completa
echo $respuesta;
?>
