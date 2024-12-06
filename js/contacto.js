// Definir las coordenadas de tu negocio (reemplaza con las reales)
const empresaLocation = { lat: 36.851734, lng: -2.452782 }; // Ejemplo: Coordenadas de mi empresa

document.addEventListener("DOMContentLoaded", function() {
    if (typeof L === "undefined") {
        console.error("Leaflet no está definido. Verifica el orden de los scripts.");
        return;
    }

    // Inicializar el mapa y centrarlo en la ubicación de tu negocio
    const map = L.map('map').setView(empresaLocation, 13);

    // Cargar la capa base del mapa (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Agregar marcador para tu negocio
    L.marker(empresaLocation).addTo(map)
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
                        L.latLng(empresaLocation), // Ubicación del negocio
                        L.latLng(userLocation) // Ubicación del usuario
                    ],
                    routeWhileDragging: true
                }).addTo(map);

                // Centrar el mapa para mostrar ambas ubicaciones
                map.fitBounds([empresaLocation, userLocation]);
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