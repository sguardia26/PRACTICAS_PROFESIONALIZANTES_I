<?php

    //CONEXION PDO
    $servidor="localhost";
    $usuario="root";
    $password="";

    try {
        $conexion= new PDO("mysql:host=$servidor",$usuario,$password);
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "CONEXION EXITOSA";
    }catch(PDOException $error){
        echo "ERROR".$error->getMessage();
    }
?>
