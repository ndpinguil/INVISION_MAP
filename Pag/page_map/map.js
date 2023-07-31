const tilesProvider = 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'/**Código para agregar el mapa a la página */

let myMap = L.map("myMap").setView([-2.9127363164258426, -78.99484776326919], 13);

L.tileLayer(tilesProvider, {
    maxZoom: 21,
}).addTo(myMap);

/*Código para agregar un marcador para el mpa */

let marker = L.marker([-2.912807943941458, -78.9948844979908]).addTo(myMap);

/*Marcador que nosotros añadimos */
let iconMarker = L.icon({
    iconUrl: '../img/marker.png', 
    iconSize: [60,60],
    iconAnchor: [30, 60]/*Especifica dónde se va a pintar el marcador dentro del mapa*/
});
//Se añade el nuevo marcador para ver el icono que creamos

let marker2 = L.marker([-2.912807943941457, -78.9948844979908], {icon: iconMarker}).addTo(myMap);

/**Código para que cuando hagamos doble clic este marcador se añada */
//Función para que cuando se haga doble clic no se haga zoom en el mapa
myMap.doubleClickZoom.disable();


// Manejador de eventos para añadir marcador al hacer doble clic
myMap.on('dblclick', e => {
    let latLng = myMap.mouseEventToLatLng(e.originalEvent);
    L.marker([latLng.lat, latLng.lng], { icon: iconMarker }).addTo(myMap);
});


/*Código para saber la ubicación de la persona que use la app usando un método del navegador */
// getCurrentPosition e sun método que necesita 3 argumentos: 2 funciones y un objeto que tenga las opciones para el método
navigator.geolocation.getCurrentPosition(
    (pos) => {//Definimos lo que sucede cuando se obtiene la posición fetch axios postman
        const { coords } = pos
        console.log(coords)
        let marker3 = L.marker([-2.912807943941457, -78.9948844979908], {icon: iconMarker}).addTo(myMap);
    },
    (err) => {},
    {}
)

// Función para crear un nuevo marcador cuando se recibe el comando de voz "nuevo obstáculo"
function createMarker() {
  let currentLocation = marker2.getLatLng(); // Obtener la posición actual del marcador en el mapa
  let newMarker = L.marker([currentLocation.lat, currentLocation.lng], {icon: iconMarker}).addTo(myMap); // Crear un nuevo marcador en la misma posición
  new Audio('notification.mp3').play(); // Reproducir el audio de notificación
}

// Reconocimiento de voz
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {

    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.lang = 'es';

    recognition.onresult = function(event) {
        var command = event.results[0][0].transcript;
        if (command.toLowerCase() === 'nuevo obstáculo') {
            createMarker();
            alert('Se ha creado un nuevo obstáculo en base a tu posición.');
        }
    };

    recognition.start();
} else {
    alert('El reconocimiento de voz no es compatible con este navegador.');
}