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


myMap.on('dblClick', e => {
    alert("Hola");
    let latLng = myMap.mouseEventToLatLng(e.originalEvent);/*Se obtiene las coordenadas del punto donde se haya dado doble clic en el mapa */
    L.marker([latLng.lat, latLng.lng], {icon: iconMarker}).addTo(myMap);
});


/*Código para saber la ubicación de la persona que use la app usando un método del navegador */
// getCurrentPosition e sun método que necesita 3 argumentos: 2 funciones y un objeto que tenga las opciones para el método
navigator.geolocation.getCurrentPosition(
    (pos) => {//Definimos lo que sucede cuando se obtiene la posición fetch axios postman
        const { coords } = pos
        console.log(coords)
    },
    (err) => {},
    {}
)

/*Guarda información en strapi*/
const startButton = document.getElementById('start-button');
        const obstaclesContainer = document.getElementById('obstacles-container');
        const obstacleInput = document.getElementById('obstacle-input');
        const saveButton = document.getElementById('save-button');

        startButton.addEventListener('click', () => {
            obstaclesContainer.style.display = 'block';
        });

        saveButton.addEventListener('click', () => {
            const obstacle = obstacleInput.value;
            // espacio donde se pueden realizar acciones con el obstáculo ingresado, como guardar en una base de datos, etc.
            obstacleInput.value = '';
            obstaclesContainer.style.display = 'none';
        });
        saveButton.addEventListener('click', () => {
            const obstacle = obstacleInput.value;
            obstacleInput.value = '';
            obstaclesContainer.style.display = 'none';
          
            // Realizar solicitud HTTP a la API de Strapi
            fetch('http://localhost:1337/admin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                obstacle: obstacle,
              }),
            })
              .then(response => response.json())
              .then(data => {
                // Aquí puedes realizar acciones adicionales después de enviar el obstáculo a Strapi
                alert('Obstáculo guardado:', data);
              })
              .catch(error => {
                console.error('Error al guardar el obstáculo:', error);
              });
          });
