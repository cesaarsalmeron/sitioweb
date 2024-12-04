fetch('https://newsapi.org/v2/everything?q=Apple&language=es&sortBy=publishedAt&apiKey=a8cf3ccfcef8400b9195c53ed469fbe5')
    .then(response => response.json())
    .then(data => {
        // Verifica si la respuesta tiene artículos
        if (data.status === "ok" && data.articles) {
            const noticiasContainer = document.getElementById('noticias-Apple');

            // Limitar los artículos a las 5 primeras noticias
            const ultimasNoticias = data.articles.slice(0, 10);

            // Verifica si hay noticias
            if (ultimasNoticias.length > 0) {
                ultimasNoticias.forEach(article => {
                    const noticiaDiv = document.createElement('div');
                    noticiaDiv.classList.add('noticia');

                    // Crear el título de la noticia
                    const titulo = document.createElement('h3');
                    titulo.textContent = article.title;
                    noticiaDiv.appendChild(titulo);

                    // Crear la descripción de la noticia
                    const descripcion = document.createElement('p');
                    descripcion.textContent = article.description || 'No hay descripción disponible.';
                    noticiaDiv.appendChild(descripcion);

                    // Crear el enlace a la noticia completa
                    const enlace = document.createElement('a');
                    enlace.href = article.url;
                    enlace.target = '_blank';  // Abre el enlace en una nueva pestaña
                    enlace.textContent = 'Pincha aquí para leer la noticia completa';  // Texto del enlace
                    noticiaDiv.appendChild(enlace);

                    // Agregar la noticia al contenedor
                    noticiasContainer.appendChild(noticiaDiv);
                });
            } else {
                noticiasContainer.innerHTML = "<p>No se encontraron noticias.</p>";
            }
        } else {
            console.error('Error al cargar las noticias:', data.message);
            document.getElementById('noticias').innerHTML = "<p>No se pudieron cargar las noticias.</p>";
        }
    })
    .catch(error => {
        console.error('Error al cargar las noticias:', error);
        document.getElementById('noticias').innerHTML = "<p>Error al cargar las noticias.</p>";
    });