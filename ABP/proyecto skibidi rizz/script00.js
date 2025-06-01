    const cartas = document.querySelectorAll(".cartaUsuario");
    const contadorTurno = document.getElementById("turnos");
    var turno = 1;

    //meta random
    const contadorRandom = document.getElementById("maximo");
    var numRandom = 40;
    contadorRandom.innerHTML = numRandom;

    cartas.forEach(carta => {
        console.log(carta); 
    });




cartas.forEach(carta => {
    carta.addEventListener("dragstart", function(e) {
        e.dataTransfer.setData("text", e.target.id);
    });
});


document.querySelectorAll(".zonaDrop").forEach(zona => {
    zona.addEventListener("dragover", function(e) {
        e.preventDefault();
    });
});

//Contador del usuario
var playerCount = 0;

document.querySelectorAll(".zonaDrop").forEach(zona => {
    zona.addEventListener("drop", function(e) {
        e.preventDefault();
        
        const cartaId = e.dataTransfer.getData("text");
        const carta = document.getElementById(cartaId);
        
        carta.setAttribute('draggable', 'false')
        if(zona.id === "zonaCentro2"){
            var numero = carta.querySelector("span").textContent;
            console.log(numero);
            contadorPlayer(numero, "pointsUser");
            
        }
        if (carta) {

            const strongAnterior = zona.querySelector("strong");
            if (strongAnterior) {
                strongAnterior.remove();

            }
            
            
        }
        e.target.appendChild(carta);       
        enemyMovment();
        turno = turno + 1;
        contadorTurno.innerHTML= turno;
        comrpobarEnemigo()
        });
    });
//funciones de juego
var enemyCount = 0;
function contadorEnemigo(numero, pointsChard){
    if (numero == "J"){
        enemyCount += parseFloat(11);
    }
    else if (numero == "Q"){
        enemyCount += parseFloat(12);
    }
    else if (numero == "K"){
        enemyCount += parseFloat(13);
    }
    else if (numero == "A"){
        enemyCount += parseFloat(14);
    }
    else{
        enemyCount +=  parseFloat(numero);
    }
    console.log(enemyCount)
    const contadorPlayer = document.getElementById(pointsChard);
    contadorPlayer.innerHTML = enemyCount;}
 function contadorPlayer(numero, pointsChard){
            
    if (numero === "J"){
        playerCount += parseFloat(11);
    }
    else if (numero === "Q"){
        playerCount += parseFloat(12);
    }
    else if (numero === "K"){
        playerCount += parseFloat(13);
    }
    else if (numero === "A"){
        playerCount += parseFloat(14);
    }
    else{
        playerCount +=  parseFloat(numero);
    }
    console.log(playerCount)
    const contadorPlayer = document.getElementById(pointsChard);
    contadorPlayer.innerHTML = playerCount;
    comprobaruser(contadorPlayer);
}
var jugador = []
function cartaAleatoria(contenedor){
    const contenedor_cartas = document.getElementById(contenedor);
    const palos = ['♥','♦','♣','♠'];/*poner wtvr de cada palo que no tengo ni idea */
    const numeros = [1,2,3,4,5,6,7,8,9,10,'J', 'Q', 'K','A'];/*poner los numeros de A 1-12 pero a saber */   
    const palo = palos[Math.floor(Math.random() * palos.length)];
    const numero = numeros[Math.floor(Math.random()* numeros.length)];
    if(contenedor == "contrincante-user"){
        const card = document.createElement('div');
        var id= "cartaUsuario" + (jugador.length + 1);
        card.setAttribute('class', 'cartaUsuario');
        card.setAttribute('id', id);
        card.setAttribute('draggable', 'true')
        card.innerHTML =`
        <div style="width:20px; height:20px;display:flex; align-items:center; justify-content:center;"><span>${numero}</span></div><strong class="palo">${palo}</strong>
        `
        console.log(card)  
        contenedor_cartas.appendChild(card); 
        card.addEventListener("dragstart", function(e) {
            e.dataTransfer.setData("text", e.target.id);
        });
        jugador.push(numero);
    }  else if(contenedor == "zonaCentro1"){
        contadorEnemigo(numero, "pointsEnemy")
        console.log("estoygfs")
        const carta = document.createElement('div');
        carta.setAttribute('class', 'cartaUsuario');
        carta.innerHTML = `
        <div style="width:20px; height:20px; display: flex; align-items: center; justify-content: center;">
            <span>${numero}</span>
        </div>
        <strong>${palo}</strong>
    `;
    
    // Obtiene el contenedor de cartas
    const cartasEnemigo = document.getElementById("zonaCentro1");
    
    // Establece que la carta se apile
    const cartas = cartasEnemigo.getElementsByClassName('cartaUsuario');
    
    // Establece un margen para apilar las cartas
    const margen = 10;  // Ajusta este valor según sea necesario

    // Calcula el índice para apilar la carta sobre la anterior
    const index = cartas.length;  // El número de cartas existentes es el índice de la nueva carta

    // Aplica el estilo para apilar cartas
    carta.style.position = 'absolute';  // Hace que las cartas se apilen
    carta.style.top = `${index * margen}px`;  // Apila las cartas agregando un margen de espacio

    // Añade la carta al contenedor
    cartasEnemigo.appendChild(carta);
    }    
}
function enemyMovment(){
    cartaAleatoria("zonaCentro1");
}

//Una array para guardar las puntuaciones de los dos jugadores ohayo rizzless, la puntuacion del jugador se guarda en la posicion 0 de la array y el juego accede continuamente a esa posicion del array para .
//var puntuaciones = [jugador, enemigo]
function CalcularPuntuacion(){
    
  const cartaContrincante = cartaContrincante.textContent;
  let puntuacionFinal = 0;
  var recuentoUsuario = document.querySelectorAll(".cartaUsuario")
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


function RobarCartas(){
    
}

function comprobaruser(contador){
    const numero = contador.textContent;
    if(numero > numRandom){
        const derrota = document.getElementById('mensajePerdedor');
        derrota.style.display = "flex";
    }


    if(numero == numRandom){
        const victoria = document.getElementById('mensajeGanador');
        victoria.style.display = "flex";
    }
}


//function RobarCartas(){
 //   const carta = cartaAleatoria();
  //  const cartaID = `carta_${jugador}_${Date.now()}`;
  //  carta.className = "cartaUsuario";
  //  carta.setAttribute("id", cartaID);
   // carta.setAttribute("draggable", "true");
   
//  En vez de crear un resultado q se añada a un contenedor se puede crear un if y q si la ha robado el enemigo se ponga en su manzo en display none, para q el jugador no pueda verlo.
   // if(jugador = 'usuario'){
     //   document.getElementById(contenedor).appendChild(carta); 
   // }
   // else{
     //   document.getElementById(contenedor).appendChild(carta);
       // carta.style.display = "none";
   // }
//     const contenedor = jugador === "usuario" ? "zonaUsuario" : "zonaCPU";
//        
//}
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

function comrpobarEnemigo(){
    const puntuacion = document.getElementById('pointsEnemy').textContent;
    if(puntuacion > numRandom){
        const victoria = document.getElementById('mensajeGanador');
        victoria.style.display = "flex";
    }
    if(puntuacion = numRandom){
        const derrota = document.getElementById('mensajePerdedor');
        derrota.style.display = "flex";
    }
}

function gameStart(){
    cartaAleatoria("contrincante-user");
    cartaAleatoria("contrincante-user");
    cartaAleatoria("contrincante-user");
}


window.onload = function() {
    gameStart();
}