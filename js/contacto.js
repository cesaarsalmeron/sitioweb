let map;
let empresaLocation = { lat: 36.851734, lng: -2.452782 }; // Cambia estas coordenadas por la ubicación de tu negocio

// Inicializar el mapa
function initMap() {
    // Crear el mapa centrado en la ubicación de la empresa
    map = L.map('map').setView([empresaLocation.lat, empresaLocation.lng], 14);

    // Usamos OpenStreetMap como capa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Crear un marcador en la ubicación de la empresa
    L.marker([empresaLocation.lat, empresaLocation.lng]).addTo(map)
        .bindPopup('Ubicación de la Empresa')
        .openPopup();

    // Agregar funcionalidad para calcular la ruta
    L.DomEvent.on(document.querySelector('form'), 'submit', function (event) {
        event.preventDefault();
        calculateRoute();
    });
}

// Calcular la ruta desde la ubicación del usuario
function calculateRoute() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const clienteLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Agregar un marcador para la ubicación del cliente
            L.marker([clienteLocation.lat, clienteLocation.lng]).addTo(map)
                .bindPopup('Tu ubicación')
                .openPopup();

            // Usamos Leaflet Routing Machine para calcular la ruta
            L.Routing.control({
                waypoints: [
                    L.latLng(clienteLocation.lat, clienteLocation.lng),
                    L.latLng(empresaLocation.lat, empresaLocation.lng)
                ],
                routeWhileDragging: true
            }).addTo(map);

        }, function () {
            alert("No se pudo obtener tu ubicación.");
        });
    } else {
        alert("La geolocalización no es compatible con este navegador.");
    }
}

// Llamamos a la función para inicializar el mapa
initMap();
