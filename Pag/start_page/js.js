// Verificar si el navegador soporta reconocimiento de voz
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    // Crear instancia de reconocimiento de voz
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    // Definir idioma del reconocimiento
    recognition.lang = 'es';

    // Cuando se detecta un comando de voz
    recognition.onresult = function(event) {
        var command = event.results[0][0].transcript;
        document.getElementById('command-text').textContent = command;

        // Aquí puedes agregar lógica para interpretar y procesar el comando recibido
        // Por ejemplo, puedes utilizar condicionales o enviar el comando a un servidor para su procesamiento

        // Ejemplo de condicional para un comando específico
        if (command.toLowerCase() === 'abrir mapa') {
            // Acción a realizar cuando se recibe el comando "Abrir configuración"
            //alert('Comando recibido: Abrir configuración');
            window.location.href = "../page_map/index_map.html";
        }
    };

    // Iniciar escucha al hacer clic en el botón
    document.getElementById('start-listening-btn').addEventListener('click', function() {
        recognition.start();
        console.log('Escuchando...');
    });
    } else {
        alert('El reconocimiento de voz no es compatible con este navegador.');
}  