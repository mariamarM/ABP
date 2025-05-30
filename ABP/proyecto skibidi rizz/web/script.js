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
//var globales para q no declarar dos veces
// let imagen = container.querySelector('.imgPelicula img');
async function cargarPelisDatos(tipo = 'peliculas') {
    const endpoint = tipo === 'series' ? 'series' : 'movies';
    try {
        const response = await fetch(`http://localhost:8000/movies`);
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

            const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(peli.titulo)}&year=${peli.año}`;
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


//filtrar pelis series cateogira
let id = 0;
async function cargarPorCategoria(categoriaNombre) {
    try {
        const response = await fetch(`http://localhost:8000/categorias`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const categorias = await response.json();
        const contenedores = document.querySelectorAll('.pelicula');

        // Ocultar todos inicialmente y limpiar contenido
        contenedores.forEach(container => {
            container.style.display = 'none';
            container.querySelector('.titulomovie').textContent = '';
            container.querySelector('.fontmovie').textContent = '';
            container.querySelector('.imgPelicula').innerHTML = '';
        });

        let peliculasFiltradas = [];

        if (categoriaNombre === 'Default') {
            categorias.forEach(cat => {
                peliculasFiltradas = peliculasFiltradas.concat(cat.peliculas);
            });
        } else {
            const categoria = categorias.find(c => c.nombre.toLowerCase() === categoriaNombre.toLowerCase());
            if (categoria) {
                peliculasFiltradas = categoria.peliculas;
            }
        }

        if (peliculasFiltradas.length === 0) {
            // No hay películas para esa categoría => todos los contenedores quedan ocultos (display none)
            return; // Salimos, no mostramos nada
        }

        // Mostrar películas filtradas
        for (let i = 0; i < peliculasFiltradas.length && i < contenedores.length; i++) {
            const peli = peliculasFiltradas[i];
            const container = contenedores[i];

            container.style.display = 'block';

            const tituloElem = container.querySelector('.titulomovie');
            const yearElem = container.querySelector('.fontmovie');
            const imgContainer = container.querySelector('.imgPelicula');

            tituloElem.textContent = peli.titulo;
            yearElem.textContent = peli.año || peli.year || 'N/A';
            imgContainer.innerHTML = '';

            // Código para imagen...
            // (igual que antes, o puedes omitir si quieres)
        }

    } catch (error) {
        console.error("Error al cargar por categoría:", error);
    }
}


document.getElementById('generoSelect').addEventListener('change', function () {
    const categoria = this.value;
    cargarPorCategoria(categoria);
});



window.addEventListener('DOMContentLoaded', cargarPelisDatos);
//document.getElementById('generoSelect').addEventListener('change', filtrarGenero);




//codigo para llamar las pelis en el mainmovie

// async function CargarMainMovie() {
//     const peliId = obtenerParametroURL("id"); // ← obtenemos el ID desde la URL
//     if (!peliId) return;

//     try {
//         const response = await fetch(`http://localhost:8000/movies`);
//         if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

//         const peliculasLocales = await response.json();
//         const peli = peliculasLocales.find(p => p.id == peliId); // ← buscamos la que tenga ese ID

//         if (!peli) {
//             console.error("Película no encontrada con ese ID.");
//             return;
//         }

//         const container = document.querySelector('.informacionPeli');
//         const tituloElem = container.querySelector('.tituloMainP');
//         const descriptionElem = container.querySelector('.descrMainP');
//         const imgContainer = container.querySelector('.imagenMainP');

//         tituloElem.textContent = peli.titulo;
//         descriptionElem.textContent = peli.descripcion;

//         const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(peli.titulo)}&year=${peli.year}`;
//         const searchResp = await fetch(searchUrl);
//         const searchData = await searchResp.json();

//         if (searchData.results && searchData.results.length > 0) {
//             const posterPath = searchData.results[0].poster_path;
//             if (posterPath) {
//                 const img = document.createElement('img');
//                 img.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
//                 img.alt = `Póster de ${peli.titulo}`;
//                 img.classList.add('imagenMainP');
//                 imgContainer.appendChild(img);
//             } else {
//                 imgContainer.textContent = "Imagen no disponible";
//             }
//         } else {
//             imgContainer.textContent = "Imagen no disponible";
//         }

//     } catch (error) {
//         console.error("Error al cargar película:", error);
//     }
// }



// //esto es q para q este en la pagina esa q se cargue la funcion
// if (window.location.pathname.endsWith('mainmovie.html')) {
//     CargarMainMovie();
// }
async function buscarPelicula() {
    const tituloBuscado = document.getElementById('tituloPelicula').value.toLowerCase().trim();

    if (!tituloBuscado) {
        // Si el input está vacío, mostrar todas las películas
        cargarPelisDatos();
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/movies');
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const peliculas = await response.json();
        const contenedores = document.querySelectorAll('.pelicula');

        // Ocultar y limpiar todos primero
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

            const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(peli.titulo)}&year=${peli.año}`;
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