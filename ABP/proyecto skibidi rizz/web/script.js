const imagenActivarDisplay = document.getElementById('displayOpen');

function toggleDiv(Abajo) { //tienes que poner DesplegableContenedor porque si pones el in-text-comp pues se rompe osea es la forma de llamar a la clase
    let desplegable = document.querySelector('.' + Abajo);
    if (desplegable.style.display == 'flex') {
        desplegable.style.display = 'none'; //que si esta fuera a la inversa
    } else {
        desplegable.style.display = 'flex'; //que me lo enseñe si esta fuera
    }
}
const API_KEY = '2adee592e855f44a7430d04df9f8cb6e'; // Reemplaza con tu clave real de TMDb
//ip CARLES 172.17.40.20
let num = 0;


let currentTipoMedia = 'peliculas'; // valor por defecto
let currentSearchType = 'movie';
let currentEndpoint = 'movies';


function cambiarTipoMedia() {
    const tipoSeleccionado = document.querySelector('.tipomedia').value;
    currentTipoMedia = tipoSeleccionado;
    currentEndpoint = (tipoSeleccionado === 'series') ? 'series' : 'movies';
    currentSearchType = (tipoSeleccionado === 'series') ? 'tv' : 'movie';
    cargarDatos(tipoSeleccionado);
}



async function cargarDatos(tipo = 'peliculas') {
   
    try {
        const response = await fetch(`http://127.0.0.1:8000/${currentEndpoint}`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const peliculasLocales = await response.json();
        const contenedores = document.querySelectorAll('.pelicula');

        for (let i = 0; i < peliculasLocales.length && i < contenedores.length; i++) {
            const peli = peliculasLocales[i];
            const container = contenedores[i];

            const tituloElem = container.querySelector('.titulomovie');
            const yearElem = container.querySelector('.fontmovie');
            const imgContainer = container.querySelector('.imgPelicula');

            tituloElem.textContent = peli.titulo;
            yearElem.textContent = peli.año;

            const searchUrl = `https://api.themoviedb.org/3/search/${currentSearchType}?api_key=${API_KEY}&query=${encodeURIComponent(peli.titulo)}&year=${peli.año}`;
            const searchResp = await fetch(searchUrl);
            const searchData = await searchResp.json();

            imgContainer.innerHTML = "";

            if (searchData.results && searchData.results.length > 0) {
                const movie = searchData.results[0];
                const posterPath = movie.poster_path;

                if (posterPath) {
                    const img = document.createElement('img');
                    img.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
                    img.alt = `Póster de ${peli.titulo}`;
                    img.classList.add('imgPelicula');
                    imgContainer.appendChild(img);
                } else {
                    imgContainer.textContent = "Imagen no disponible";
                }
            } else {
                imgContainer.textContent = "Imagen no disponible";
            }
        }
    } catch (error) {
        console.error("Error al cargar películas completas:", error);
    }
}


async function cargarPorCategoria(categoriaNombre) {

    try {
        const response = await fetch(`http://localhost:8000/${currentEndpoint}`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const peliculas = await response.json();
        const contenedores = document.querySelectorAll('.pelicula');

        // Ocultar y limpiar todos los contenedores
        contenedores.forEach(container => {
            container.style.display = 'none';
            container.querySelector('.titulomovie').textContent = '';
            container.querySelector('.fontmovie').textContent = '';
            container.querySelector('.imgPelicula').innerHTML = '';
        });

        let peliculasFiltradas = [];

        
         if (categoriaNombre.toLowerCase() === 'all') {
            // Mostrar todas con el filter all, borre lo anterior
            peliculasFiltradas = peliculas;
        } else {
            // Mostrar las que coinciden exactamente con la categoría
            peliculasFiltradas = peliculas.filter(p => p.categoria === categoriaNombre);
        }


        // Mostrar películas filtradas
        for (let i = 0; i < peliculasFiltradas.length && i < contenedores.length; i++) {
            const peli = peliculasFiltradas[i];
            const container = contenedores[i];

            container.style.display = 'block';
            container.querySelector('.titulomovie').textContent = peli.titulo;
            container.querySelector('.fontmovie').textContent = peli.año || peli.year || 'N/A';

            const imgContainer = container.querySelector('.imgPelicula');
            imgContainer.innerHTML = '';

            const searchUrl = `https://api.themoviedb.org/3/search/${currentSearchType}?api_key=${API_KEY}&query=${encodeURIComponent(peli.titulo)}&year=${peli.año}`;
            const searchResp = await fetch(searchUrl);
            const searchData = await searchResp.json();

            if (searchData.results && searchData.results.length > 0 && searchData.results[0].poster_path) {
                const img = document.createElement('img');
                img.src = `https://image.tmdb.org/t/p/w500${searchData.results[0].poster_path}`;
                img.alt = `Póster de ${peli.titulo}`;
                img.classList.add('imgPelicula');
                imgContainer.appendChild(img);
            } else {
                imgContainer.textContent = "Imagen no disponible";
            }
        }

    } catch (error) {
        console.error("Error al cargar por categoría:", error);
    }
}

window.addEventListener('DOMContentLoaded', cargarDatos);
async function buscador() {
    const tituloBuscado = document.getElementById('tituloPelicula').value.toLowerCase().trim();

    if (!tituloBuscado) {
        cargarPorCategoria('all');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/${currentEndpoint}`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const peliculas = await response.json();
        const contenedores = document.querySelectorAll('.pelicula');

        contenedores.forEach(c => {
            c.style.display = 'none';
            c.querySelector('.titulomovie').textContent = '';
            c.querySelector('.fontmovie').textContent = '';
            c.querySelector('.imgPelicula').innerHTML = '';
        });

        // Filtrar por título
        const resultados = peliculas.filter(p => p.titulo.toLowerCase().includes(tituloBuscado));

        for (let i = 0; i < resultados.length && i < contenedores.length; i++) {
            const peli = resultados[i];
            const container = contenedores[i];
            container.style.display = 'block';

            const tituloElem = container.querySelector('.titulomovie');
            const yearElem = container.querySelector('.fontmovie');
            const imgContainer = container.querySelector('.imgPelicula');

            tituloElem.textContent = peli.titulo;
            yearElem.textContent = peli.año;
            imgContainer.innerHTML = '';

            const searchUrl = `https://api.themoviedb.org/3/search/${currentSearchType}?api_key=${API_KEY}&query=${encodeURIComponent(peli.titulo)}&year=${peli.año}`;
            const searchResp = await fetch(searchUrl);
            const searchData = await searchResp.json();

            if (searchData.results && searchData.results.length > 0) {
                const movie = searchData.results[0];
                const posterPath = movie.poster_path;

                if (posterPath) {
                    const img = document.createElement('img');
                    img.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
                    img.alt = `Póster de ${peli.titulo}`;
                    img.classList.add('imgPelicula');
                    imgContainer.appendChild(img);
                } else {
                    imgContainer.textContent = "Imagen no disponible";
                }
            } else {
                imgContainer.textContent = "Imagen no disponible";
            }
        }
    } catch (error) {
        console.error("Error al buscar película:", error);
    }
}
//mainmovie para cargar datos de la pelicula escogida
async function CargarMainMovie() {
    const params = new URLSearchParams(window.location.search);
    const peliId = params.get('id');

    if (!peliId) {
        console.warn("❌ No se encontró el parámetro 'id' en la URL.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/movies`);
        const peliculas = await response.json();
        const peli = peliculas.find(p => p.id == peliId);

        if (!peli) {
            console.error("❌ Película no encontrada con ID:", peliId);
            return;
        }

        console.log("🎬 Película cargada: ", peli);

        const tituloElem = document.getElementById('tituloMainP');
        const descrElem = document.getElementById('descrMainP');
        const imgContainer = document.getElementById('imagenMainP');

        if (!tituloElem || !descrElem || !imgContainer) {
            console.error("❌ Faltan elementos HTML con IDs 'tituloMainP', 'descrMainP' o 'imagenMainP'");
            return;
        }

        tituloElem.textContent = peli.titulo;
        descrElem.textContent = peli.descripcion;

        // Cargar imagen desde TMDb
        const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(peli.titulo)}&year=${peli.año}`;
        const searchResp = await fetch(searchUrl);
        const searchData = await searchResp.json();

        imgContainer.innerHTML = '';

        if (searchData.results && searchData.results.length > 0 && searchData.results[0].poster_path) {
            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${searchData.results[0].poster_path}`;
            img.alt = `Póster de ${peli.titulo}`;
            img.classList.add('imagenMainP');
            imgContainer.appendChild(img);
        } else {
            imgContainer.textContent = "Imagen no disponible";
        }

    } catch (error) {
        console.error("❌ Error al cargar la película:", error);
    }
}


 console.log(window.location.pathname)

// lo d focking siempre de q si estas te carga si no eeeeaaaa
if (window.location.pathname.endsWith('mainmovie.html')) {
    CargarMainMovie();  
}
