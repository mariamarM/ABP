  
 
 function toggleInfo(){
    const contenedor = document.getElementById("informaciones");
    const info1 = contenedor.querySelector('.infointerna1');
    const info2 = contenedor.querySelector('.infointerna2');
    
    if (info2.style.display === "none" || info2.style.display === "") {
        info2.style.display = "block";
        info1.style.display = "none"; 
      } else {
        info2.style.display = "none";
        info1.style.display = "flex";
      }
    }

const globals = []; 
var num = 1;
var tamañoMax = 4;
async function obtenerGlobales(globals, num) { 
    
    while(num <= tamañoMax){
        const url = `http://172.17.40.20:8000/users/${num}`;
        const response =  await fetch(`${url}`);
        const data = await response.json();
        globals.push({
            username: data[0].username,
            victories: data[0].victories
        });
        num = num +1;  
    }

    globals.forEach(user => {

        const productosContainer = document.getElementById('gameglobals');
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="globalscard">
            <h3>${user.username} | ${user.victories} victorias</h3>
        </div>
        
        `;
        productosContainer.appendChild(card);
    }
);
}
obtenerGlobales(globals,num);

var historial=[]
var  tamañoMaxH = 3
var histnum = 1
async function obtenerHistorial(historial, histnum) { 

    while(histnum < tamañoMaxH){
        const url = `http://172.17.40.20:8000/history/${num}`;
        const response =  await fetch(`${url}`);
        const data = await response.json();
        console.log(data)
        historial.push({
            player1: data[0].player1id,
            player2: data[0].player2id
        });
        histnum = histnum + 1
    }
    historial.forEach(hist => {

        const productosContainer = document.getElementById('gamehistory');
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="historycard">
            <div class="historyinfos"><img src="/img/logos/placeholders/user.webp" class="imgusers"><h3>${hist.player1}</h3></div>  <h1 style="padding-left: 1vw; padding-right: 1vw;">VS</h1> <div class="historyinfos"><img src="/img/logos/placeholders/user.webp" class="imgusers"><h3>${hist.player2}</h3></div>
         </div>
        
        `;
        productosContainer.appendChild(card);
    }
);
}
obtenerHistorial(historial,histnum);


const change = document.getElementById("toggleImg")
change.addEventListener("click", toggleInfo);

function startGame(){
    const contenedor = document.getElementById("disclaimer");
    if(contenedor.style.display === "none" || contenedor.style.display === ""){
        contenedor.style.display = "flex";
    }
    else{
        contenedor.style.display = "none"
    }

}
const change2 = document.getElementById("play")
change2.addEventListener("click", startGame);