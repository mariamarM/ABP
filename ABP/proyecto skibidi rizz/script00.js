const cartas = document.querySelectorAll(".cartaUsuario, .cartaContrincante");

cartas.forEach(carta => {
    carta.addEventListener("dragstart", function(e) {
        // Guardamos el id de la carta arrastrada
        e.dataTransfer.setData("text", e.target.id);
    });
});

// Permitimos el 'dragover' en las zonas de drop
document.querySelectorAll(".zonaDrop").forEach(zona => {
    zona.addEventListener("dragover", function(e) {
        e.preventDefault(); // Necesario para permitir el drop
    });
});

// Manejamos el evento 'drop' cuando el usuario suelta la carta en 'zonaDrop'
document.querySelectorAll(".zonaDrop").forEach(zona => {
    zona.addEventListener("drop", function(e) {
        e.preventDefault();
        
        // Obtenemos el id de la carta que se está arrastrando
        const cartaId = e.dataTransfer.getData("text");
        const carta = document.getElementById(cartaId);

        // Verificamos si la carta es válida
        if (carta) {
            // Añadimos la carta al contenedor donde se soltó
            e.target.appendChild(carta);}

        });
    });
//funciones de juego


function cartaAleatoria(){
    const palos = ['♥','♦','♣','♠'];/*poner wtvr de cada palo que no tengo ni idea */
    const numeros = [1,2,3,4,5,6,7,8,9,10,'J', 'Q', 'K','As'];/*poner los numeros de A 1-12 pero a saber */
   
    const palo = palos[Math.floor(Mathrandom() * palos.length)];
    const numero = numeros[Math.floor(Math.random()* numeros.length)];

    const carta = document.createElement("div");
    carta.classList.add("cartaUsuario"); 
    let spanNumero = document.createElement("span");
    spanNumero.textContent = numero; 
    carta.textContent = spanNumero + palo;
    return carta
}

//Una array para guardar las puntuaciones de los dos jugadores ohayo rizzless, la puntuacion del jugador se guarda en la posicion 0 de la array y el juego accede continuamente a esa posicion del array para .
var puntuaciones = [jugador, enemigo]
function CalcularPuntuacion(cartaUsuario, cartaContrincante){
  const cartaUsuario = cartaUsuario.textContent;
  const cartaContrincante = cartaContrincante.textContent;
  let puntuacionFinal = 0;
  var recuentoUsuario = document.querySelectorAll("cartaUsuario")
  recuentoUsuario.forEach(element => {
    let valor = parseInt(element.querySelector("span").textContent);
    //Quiero llorar
    if(valor = 'J'){
        puntuacionFinal += 11;
    }
    else if(valor = 'Q'){
        puntuacionFinal += 12;
    }
    else if(valor = 'K'){
        puntuacionFinal += 13;
    }
    else{
        puntuacionFinal += valor;
    }
  });
  
//la puntuacion se calcula a partir de la suma cartas que reocjas se aproxime a la cartaaleatoria
//si es la misma suma de cartas que los demas que el contrincante es 0 puntos en plan empate. 
//si no se aproxima 

}

function DeclararGanador(cartaUsuario, cartaContrincant){
    mensajeGanador = document.getElementById('mensajeGanador');
    mensajeLoser = document.getElementById('mensajePerdedor');

    if(cartaUsuario > cartaContrincante){
        mensajeGanador.style.display.block;
        mensajeGanador.style.font.color.red;
    }else{
        mensajePerdedor.style.display.block;
    }

}
function RobarCartas(){
    
}

cartaAleatoria();

function RobarCartas(jugador){
    const carta = cartaAleatoria();
    const cartaID = `carta_${jugador}_${Date.now()}`;
    carta.className = "cartaUsuario";
    carta.setAttribute("id", cartaID);
    carta.setAttribute("draggable", "true");
   
//  En vez de crear un resultado q se añada a un contenedor se puede crear un if y q si la ha robado el enemigo se ponga en su manzo en display none, para q el jugador no pueda verlo.
    if(jugador = 'usuario'){
        document.getElementById(contenedor).appendChild(carta); 
    }
    else{
        document.getElementById(contenedor).appendChild(carta);
        carta.style.display = "none";
    }
//     const contenedor = jugador === "usuario" ? "zonaUsuario" : "zonaCPU";
//        
}
    function pasarTurno(){
//     document.getElementById("btnRobar").classList.add("desactivado");
//     document.getElementById("btnPasar").classList.add("desactivado");

//     // Calcular puntuación
//     const cartas = document.querySelectorAll("#zonaCartasUsuario .carta");
//     let total = 0;
//     cartas.forEach(carta => {
//       total += parseInt(carta.dataset.valor);
//     });

//     const objetivo = cartaObjetivo.valor;
//     let resultado = "";

//     if (total === objetivo) {
//       resultado = "pensar un mensaje de ganador";
//     } else if (total < objetivo) {
//       resultado = `te has quedado corto con ${total}.`;
//     } else {
//       resultado = `te has pasado con esto ${total}.`;
//     }

//     document.getElementById("resultado").textContent = resultado;
    }
// function iniciarJuego() {
//     cartaObjetivo = cartaAleatoria(); // solo la guarda internamente
//     console.log("Carta objetivo secreta:", cartaObjetivo); // solo para debugging si quieres ver
//   }
// window.onload = iniciarJuego;  
// //cartaAleatoria();