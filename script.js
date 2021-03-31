/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var spelerX = 200; // x-positie van speler
var spelerY = 100; // y-positie van speler
var spelerSpeed = 6; // snelheid van speler

var blobvis = 0;

var kogelX = spelerX + 55;    // x-positie van kogel
var kogelY = spelerY;    // y-positie van kogel
var kogelXOriginal = spelerX + 55;    // x-positie van kogel
var kogelYOriginal = spelerY;    // y-positie van kogel
var kogelXDestination = 0; // x destination van kogel
var kogelYDestination = 0; // y destination van kogel
var originalKogelSpeed = 7 ; // snelheid van de kogel
var kogelXSpeed = 5; // x snelheid van kogel
var kogelYSpeed = 5; // y snelheid van kogel



var aantalVijanden = 5; // aantal vijanden
var vijanden = []; // 
var vijandX = [];   // array met x-posities van vijanden
var vijandY = [];   // array met y-posities van vijanden
var vijandSpeed = []; // array met snelheden van vijanden
var vijandScale = []; // array met sizes van vijanden

var score = 0; // aantal behaalde punten

var mouseIsClicked = false; // checkt of de muis is ingedrukt



/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  fill("green");
  translate(0,0);
  rect(0, 0, width , height );
};


/**
 * Tekent de vijand
 */
var tekenVijand = function() {

    for(var i = 0; i < vijanden.length; i++){
        
        
        fill("red");
        ellipse(vijandX[i], vijandY[i], vijandScale[i], vijandScale[i]);
        rect(vijandX[i], vijandY[i] - vijandScale[i]*0.2, vijandScale[i], vijandScale[i]*0.4);
    };

};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {

    fill("blue");
    ellipse(x, y, 10, 10)

};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
  fill("white");
  ellipse(x, y, 50, 50);
  rect(x, y - 10 , 50, 20);
  image(blobvis, x, y, 50, 50);
 
  
};


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {

for(var i = 0; i < vijandX.length; i++){
    if(spelerX > vijandX[i] ){
        vijandX[i] = vijandX[i] + vijandSpeed[i];
    }

    if(spelerX < vijandX[i]){
        vijandX[i] = vijandX[i] - vijandSpeed[i];
    }
}
for(var i = 0; i < vijandY.length; i++){
    if(spelerY > vijandY[i]){
        vijandY[i] = vijandY[i] + vijandSpeed[i];
    }

    if(spelerY < vijandY[i]){
        vijandY[i] = vijandY[i] - vijandSpeed[i];
    }
}



/*if(spelerX < 25){
    spelerX = spelerX + spelerSpeed;
}

if(spelerX > width - 25){
    spelerX = spelerX - spelerSpeed;
}

if(spelerY < 25){
    spelerY = spelerY + spelerSpeed;
}

if(spelerY > height - 25){
    spelerY = spelerY - spelerSpeed;
}*/
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {

//de setup van het schieten, zorgt dat je maar 1 keer hoeft te klikken en bepaald een aantal variabelen. (we hebben niet gewoon "mouseClicked" gebruikt omdat het een error (blauw scherm) gaf)
if(mouseIsPressed && mouseIsClicked === false){
    kogelXDestination = mouseX;
    kogelYDestination = mouseY;

    mouseIsClicked = true;

    // berekent de relatieve snelheid in het geval dat de afstand die het balletje aflegt over de x-as groter is dan de afstand die het balletje aflegt over de y-as of als de afstand over de x-as negatief is kleiner is dan de afstand over de y-as (anders schiet je de bal naar een ander universum)
    if(((kogelXDestination - kogelX) > (kogelYDestination - kogelY) && (kogelXDestination - kogelX) > 0) || ((kogelXDestination - kogelX) < (kogelYDestination - kogelY) && (kogelXDestination - kogelX) < 0)){
        if((kogelXDestination - kogelX) < 0){
            kogelXSpeed = -1 * originalKogelSpeed;
         }

  
        kogelYSpeed = (kogelYDestination - kogelY) * (kogelXSpeed/(kogelXDestination-kogelX));

    // berekent de relatieve snelheid in het geval dat de afstand die het balletje aflegt over de y-as groter is dan de afstand die het balletje aflegt over de x-as of als de afstand over de y-as negatief is kleiner is dan de afstand over de x-as (anders schiet je de bal naar een ander universum)
    }else if (((kogelYDestination - kogelY) >= (kogelXDestination - kogelX) && (kogelYDestination - kogelY) > 0) || ((kogelYDestination - kogelY) <= (kogelXDestination - kogelX) && (kogelYDestination - kogelY) < 0)){

        if((kogelYDestination - kogelY) < 0){
            kogelYSpeed = -1 * originalKogelSpeed;
         }

  
        kogelXSpeed = (kogelXDestination - kogelX) * (kogelYSpeed/(kogelYDestination-kogelY)); 
    }

}

//beweegt de kogel naar zijn destination
if(mouseIsClicked === true){
  
    if(kogelX < kogelXDestination){kogelX = kogelX + kogelXSpeed}
    if(kogelX > kogelXDestination){kogelX = kogelX + kogelXSpeed}
    if(kogelY < kogelYDestination){kogelY = kogelY + kogelYSpeed}
    if(kogelY > kogelYDestination){kogelY = kogelY + kogelYSpeed}

}

//checkt if de kogel bij zijn destination is aangekomen
if(kogelX < kogelXDestination +originalKogelSpeed && kogelX > kogelXDestination -originalKogelSpeed && kogelY < kogelYDestination +originalKogelSpeed && kogelY > kogelYDestination -originalKogelSpeed && mouseIsClicked === true ){ 
    mouseIsClicked = false;
    kogelXSpeed = originalKogelSpeed;
    kogelYSpeed = originalKogelSpeed;

}

//zorgt dat de kogel meebeweegt met de speler als hij niet aan het schieten is
kogelXOriginal = spelerX + 55;
kogelYOriginal = spelerY;  

//reset de positie van de kogel naar de speler als hij bij zijn destination is aangekomen
if(mouseIsClicked === false){
    kogelX = kogelXOriginal;
    kogelY = kogelYOriginal;
}

}

/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {



if(keyIsDown(68)){
    spelerX = spelerX + spelerSpeed;
   
}

if(keyIsDown(65)){
    spelerX = spelerX - spelerSpeed;
}

if(keyIsDown(87)){
    spelerY = spelerY - spelerSpeed;
}

if(keyIsDown(83)){
    spelerY = spelerY + spelerSpeed;
}


if(spelerX < 25){
    spelerX = spelerX + spelerSpeed;
}

if(spelerX > width - 25){
    spelerX = spelerX - spelerSpeed;
}

if(spelerY < 25){
    spelerY = spelerY + spelerSpeed;
}

if(spelerY > height - 25){
    spelerY = spelerY - spelerSpeed;
}
};

/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {

  return false;
};

/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    
  return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    
  return false;
};


function preload(){
    blobvis = loadImage('images/test.jpg');

}
/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);
  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');

  for(var i = 0; i < aantalVijanden; i++){
        vijanden.push("vijand"+ i);
        vijandX.push(random(25, width - 25));
        vijandY.push(random(25, height - 25));
        vijandScale.push (random(15, 75));
        vijandSpeed.push(-0.025 * vijandScale[i] + 2.875);
    };

    new Image()

  
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case SPELEN:
      beweegVijand();
      beweegKogel();
      beweegSpeler();
      
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      tekenVeld();
      tekenVijand();
      tekenSpeler(spelerX, spelerY);
      tekenKogel(kogelX, kogelY);

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }
}
