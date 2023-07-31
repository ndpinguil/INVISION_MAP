const tilesProvider = 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';

    let myMap = L.map("myMap").setView([-2.9127363164258426, -78.99484776326919], 13);

    L.tileLayer(tilesProvider, {
        maxZoom: 21,
    }).addTo(myMap);

    // Icono del marcador personalizado
    let iconMarker = L.icon({
        iconUrl: '../img/marker.png', 
        iconSize: [60, 60],
        iconAnchor: [30, 60]
    });

    // Agregar el marcador en la ubicación actual al cargar el mapa
    function addCurrentLocationMarker(lat, lng) {
        L.marker([lat, lng], { icon: iconMarker }).addTo(myMap);
    }

    // Función para que cuando se haga doble clic no se haga zoom en el mapa
    myMap.doubleClickZoom.disable();

    // Manejador de eventos para añadir marcador al hacer doble clic
    myMap.on('dblclick', e => {
        let latLng = myMap.mouseEventToLatLng(e.originalEvent);
        L.marker([latLng.lat, latLng.lng], { icon: iconMarker }).addTo(myMap);
    });

    // Obtener la ubicación actual del usuario y agregar el marcador en esa posición
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { coords } = pos;
            const { latitude, longitude } = coords;
            addCurrentLocationMarker(latitude, longitude);
            myMap.setView([latitude, longitude], 13); // Centrar el mapa en la ubicación actual
        },
        (err) => {
            alert("Error al obtener la ubicación.");
        },
        {}
    );
