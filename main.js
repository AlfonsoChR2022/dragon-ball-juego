//****** GAME LOOP ***************************************************//
var time = new Date();
var deltaTime = 0;

if(document.readyState === "complete" || document.readyState === "interactive"){
    setTimeout(Init, 1);
}else{
    document.addEventListener("DOMContentLoaded", Init);
}

function Init() {
    time = new Date();
    Start();
    Loop();
}

function Loop() {
    deltaTime = (new Date() - time) / 1000;
    time = new Date();
    Update();
    requestAnimationFrame(Loop);
}

/***************************************************************** */
function Update() {
    if(parado) return;

    MoverSuelo();
    MoverDinosaurio();

    DecidirCrearNubes();
    MoverNubes();

    DecidirCrearCactus();
    MoverCactus();


    velY -= gravedad * deltaTime;
}

function Start(){
    /*alert(gameVel);*/
    suelo = document.querySelector(".suelo");
    contenedor =  document.querySelector(".contenedor");
    dino = document.querySelector(".dino");
    document.addEventListener("keydown", HandleKeyDown);
}

function MoverDinosaurio() {
    dinoPosY += velY * deltaTime;
    if(dinoPosY < sueloY){
        TocarSuelo();
    }
    /*alert(dinoPosY)*/
    dino.style.bottom = dinoPosY+"px";
}

function HandleKeyDown(ev){
    if(ev.keyCode == 32){
        Saltar();
    }
}

function Saltar(){
    if(dinoPosY === sueloY){
        saltando = true;
        velY = impulso;
        dino.classList.remove("dino-corriendo");
    }
}

function TocarSuelo() {
    dinoPosY = sueloY;
    velY = 0;
    if(saltando){
        dino.classList.add("dino-corriendo");
    }
    saltando = false;
}


function MoverSuelo() {
    sueloX += CalculaDesplazamiento();
    suelo.style.left = -(sueloX % (contenedor.clientWidth)) + "px";
}

function CalculaDesplazamiento(){
    return VelEscenario * deltaTime * gameVel;
}
/*----------------------------------------------------------------*/


function DecidirCrearCactus() {
    tiempoHastaCactus -= deltaTime;
    if(tiempoHastaCactus <= 0) {
        CrearCactus();
    }
}

function CrearCactus(){
    var cactu = document.createElement("div");
    contenedor.appendChild(cactu);
    cactu.classList.add("cactus");

    if(Math.random() > 0.5) cactu.classList.add("cactus2");

    cactu.posX = contenedor.clientWidth;
    cactu.style.left = contenedor.clientWidth+"px";

    Cactus.push(cactu);
    tiempoHastaCactus = tiempoCactusMin + Math.random() * (tiempoCactusMax-tiempoCactusMin) / gameVel;
}

function MoverCactus(){
    for (var i = Cactus.length - 1; i >= 0; i--) {
        if(Cactus[i].posX < -Cactus[i].clientWidth) {
            Cactus[i].parentNode.removeChild(Cactus[i]);
            Cactus.splice(i, 1);
        }else{
            Cactus[i].posX -= CalculaDesplazamiento();
            Cactus[i].style.left = Cactus[i].posX+"px";
        }
    }
}
/*----------------------------------------------------------------*/
function DecidirCrearNubes() {
    tiempoHastaNube -= deltaTime;
    if(tiempoHastaNube <= 0) {
        CrearNube();
    }
}
function CrearNube() {
    var nube = document.createElement("div");
    contenedor.appendChild(nube);
    nube.classList.add("nube");
    nube.posX = contenedor.clientWidth;
    nube.style.left = contenedor.clientWidth+"px";
    nube.style.bottom = minNubeY + Math.random() * (maxNubeY-minNubeY)+"px";

    nubes.push(nube);
    tiempoHastaNube = tiempoNubeMin + Math.random() * (tiempoNubeMax-tiempoNubeMin) / gameVel;
}

function MoverNubes() {
    for (var i = nubes.length - 1; i >= 0; i--) {
        if(nubes[i].posX < -nubes[i].clientWidth) {
            nubes[i].parentNode.removeChild(nubes[i]);
            nubes.splice(i, 1);
        }else{
            nubes[i].posX -= CalculaDesplazamiento() * velNube;
            nubes[i].style.left = nubes[i].posX+"px";
        }
    }
}

//****** GAME LOGIC **********************************************//
/*-----------*/
var velY = 0;
var gravedad = 800;
var sueloX = 0;
var VelEscenario = 1280/3;
var gameVel= 1;
/*-----------*/
var sueloY = 22;
var impulso = 900;

var gravedad = 2500;
var dinoPosX = 42;
var dinoPosY = sueloY;
/*-----------*/
var tiempoHastaNube = 0.5;
var tiempoNubeMin = 0.7;
var tiempoNubeMax = 2.7;
var maxNubeY = 350;
var minNubeY = 200;
var nubes = [];
var velNube = 0.2;
/*-----------*/
var tiempoHastaCactus = 2;
var tiempoCactusMin = 0.7;
var tiempoCactusMax = 1.8;
var Cactus = [];
/*-----------*/
var parado = false;
var saltando = false;

//====== GENERAL =====//
var contenedor;
var suelo;