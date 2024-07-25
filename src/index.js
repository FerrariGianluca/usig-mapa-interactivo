import MapaInteractivo from '@usig-gcba/mapa-interactivo';

// Inicializar el mapa interactivo
const map = new MapaInteractivo("mapa-id", {
    center: [-34.62, -58.44],
    zoom: 13,
});

// Objeto para almacenar marcadores
const marcadores = {};

// Función para agregar una dirección a la lista y al mapa
window.agregarDireccion = function() {
    const direccion = document.getElementById('direccion').value;
    if (direccion) {
        geocode(direccion);
        document.getElementById('direccion').value = '';
    }
};

// Función de geocodificación usando Nominatim
function geocode(direccion) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const { lat, lon } = data[0];
                const latlng = { lat: parseFloat(lat), lng: parseFloat(lon) };
                agregarDireccionEnLista(direccion, latlng);
            } else {
                alert('No se encontraron resultados para la dirección ingresada.');
            }
        })
        .catch(error => {
            console.error('Error en la geocodificación:', error);
        });
}

// Función para agregar una dirección a la lista
function agregarDireccionEnLista(direccion, latlng) {
    const id = `direccion-${Date.now()}`;
    const div = document.createElement('div');
    div.className = 'direccion-item';
    div.id = id;
    div.innerHTML = `
        <span>${direccion}</span>
        <button onclick="editarDireccion('${id}', '${direccion}')">Editar</button>
        <button onclick="eliminarDireccion('${id}', ${latlng.lat}, ${latlng.lng})">Eliminar</button>
    `;
    document.getElementById('direcciones').appendChild(div);

    // Agregar el marcador al mapa
    const markerId = map.addMarker(latlng, true, true, true, true, true, {});
    marcadores[id] = { latlng, markerId };
}

// Función para editar una dirección en la lista
window.editarDireccion = function(id, direccion) {
    const nuevaDireccion = prompt('Editar dirección:', direccion);
    if (nuevaDireccion) {
        geocode(nuevaDireccion).then(latlng => {
            // Eliminar marcador antiguo
            map.removeMarker(marcadores[id].markerId);
            // Actualizar marcador
            marcadores[id].latlng = latlng;
            const newMarkerId = map.addMarker(latlng, true, true, true, true, true, {});
            marcadores[id].markerId = newMarkerId;
        });
        document.getElementById(id).querySelector('span').innerText = nuevaDireccion;
    }
};

// Función para eliminar una dirección de la lista y del mapa
window.eliminarDireccion = function(id, lat, lng) {
    // Eliminar marcador del mapa
    map.removeMarker(marcadores[id].markerId);
    // Eliminar elemento de la lista
    document.getElementById(id).remove();
    // Eliminar del objeto de marcadores
    delete marcadores[id];
};