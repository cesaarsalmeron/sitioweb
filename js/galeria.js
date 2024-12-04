// Función para cargar imágenes locales desde la carpeta 'imagenes'
function cargarImagenesLocales() {
    const galeriaContainer = document.getElementById('galeria-container'); // Contenedor de la galería

    // Array con los nombres de las imágenes en la carpeta 'imagenes'

    const imagenes = [
        { src: '../Imagenes/imagen1.jpg', title: 'Campo' },
        { src: '../Imagenes/imagen2.jpg', title: 'Campo con nubes' },
        { src: '../Imagenes/imagen3.jpg', title: 'Edificio' },
        { src: '../Imagenes/imagen4.jpg', title: 'Carretera' },
        { src: '../Imagenes/imagen5.jpg', title: 'Anochecer' },
        { src: '../Imagenes/imagen6.jpg', title: 'Lago' },
        // Añade más imágenes y títulos según sea necesario
    ];

    // Recorrer el array de imágenes y mostrarlas en el contenedor
    imagenes.forEach(imagen => {
        const galeriaItem = document.createElement('div');
        galeriaItem.classList.add('galeria-item');
        galeriaItem.setAttribute('data-title', imagen.title); // Asignar el título como atributo 'data-title'

        const imgElement = document.createElement('img');
        imgElement.src = imagen.src; // Asignar la ruta de la imagen
        imgElement.alt = imagen.title; // Descripción alternativa

        // Agregar la imagen al item
        galeriaItem.appendChild(imgElement);

        // Agregar el item al contenedor
        galeriaContainer.appendChild(galeriaItem);
    });
}

// Llamar a la función cuando la página se haya cargado completamente
document.addEventListener('DOMContentLoaded', cargarImagenesLocales);
