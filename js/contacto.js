// Definir las coordenadas de tu negocio (reemplaza con las reales)
const businessLocation = { lat: 36.851734, lng: -2.452782 }; // Ejemplo: Coordenadas de mi empresa

// Inicializar el mapa y centrarlo en la ubicación de tu negocio
document.addEventListener("DOMContentLoaded", function() {
    if (typeof L === "undefined") {
        console.error("Leaflet no está definido. Verifica el orden de los scripts.");
        return;
    }

    const map = L.map('map').setView(businessLocation, 13);

    // Cargar la capa base del mapa (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Agregar marcador para tu negocio
    L.marker(businessLocation).addTo(map)
        .bindPopup('Ubicación de nuestro negocio')
        .openPopup();

    // Función para obtener la ubicación del usuario
    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;
                const userLocation = [userLat, userLon];

                // Agregar marcador para la ubicación del usuario
                L.marker(userLocation).addTo(map)
                    .bindPopup('Tu ubicación')
                    .openPopup();

                // Usar Leaflet Routing Machine para trazar la ruta
                L.Routing.control({
                    waypoints: [
                        L.latLng(businessLocation), // Ubicación del negocio
                        L.latLng(userLocation) // Ubicación del usuario
                    ],
                    routeWhileDragging: true
                }).addTo(map);

                // Centrar el mapa para mostrar ambas ubicaciones
                map.fitBounds([businessLocation, userLocation]);
            }, function(error) {
                console.error('Error obteniendo la ubicación: ', error);
            });
        } else {
            alert("La geolocalización no está soportada en este navegador.");
        }
    }

    // Llamar a la función para obtener la ubicación del usuario
    getUserLocation();
});
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