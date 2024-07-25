<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mapa Interactivo - GCBA</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
</head>
<body>
<div class="search-container">
    <div>
        <input type="text" id="direccion" placeholder="Ingresa una dirección">
        <button onclick="agregarDireccion()">Agregar</button>
    </div>
    <div id="mapa-id"></div>
    <div id="direcciones"></div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>
    <script src="dist/bundle.js"></script> <!-- Usa el archivo empaquetado -->
</body>
</html>