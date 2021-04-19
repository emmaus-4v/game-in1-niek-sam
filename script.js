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

var spelerX = 50; // x-positie van speler
var spelerY = 0; // y-positie van speler
var spelerSpeed = 6; // snelheid van speler

var blobvis = 0;

var kogelX = spelerX + 55;    // x-positie van kogel
var kogelY = spelerY;    // y-positie van kogel
var kogelXOriginal = spelerX + 55;    // x-positie van kogel
var kogelYOriginal = spelerY;    // y-positie van kogel
var kogelXDestination = 0; // x destination van kogel
var kogelYDestination = 0; // y destination van kogel
var originalKogelSpeed = 8 ; // snelheid van de kogel
var kogelXSpeed = 6; // x snelheid van kogel
var kogelYSpeed = 6; // y snelheid van kogel
var kogelDestinationReached = false; // checkt of de destination van de kogel is bereikt



var aantalVijanden = 20; // aantal vijanden
var vijanden = []; // 
var vijandX = [];   // array met x-posities van vijanden
var vijandY = [];   // array met y-posities van vijanden
var vijandSpeed = []; // array met snelheden van vijanden
var vijandScale = []; // array met sizes van vijanden
var vijandLevens = []; // array met het aantal levens van vijanden
var vijandInvinsible = []; // array met of de vijand net is geraakt of niet

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
        
        
        fill("yellow");
        ellipse(vijandX[i], vijandY[i], vijandScale[i], vijandScale[i]);
        rect(vijandX[i], vijandY[i] - vijandScale[i]*0.2, vijandScale[i], vijandScale[i]*0.4);

        //veranderd de kleur van de vijand als hij zijn tweede leven kwijt is
        if(vijandLevens[i] === 1){
        fill("red");
        ellipse(vijandX[i], vijandY[i], vijandScale[i], vijandScale[i]);
        rect(vijandX[i], vijandY[i] - vijandScale[i]*0.2, vijandScale[i], vijandScale[i]*0.4);
        }

     
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
  

  noStroke();
  fill("white");
  rect(x, y - 10 , 50, 20);
  image(blobvis, x - 25, y - 25, 50, 50);
 
  
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

console.log(kogelYSpeed);
console.log(kogelXSpeed);




}



//beweegt de kogel naar zijn destination
if(mouseIsClicked === true && kogelDestinationReached === false){
  
    if(kogelX < kogelXDestination){kogelX = kogelX + kogelXSpeed}
    if(kogelX > kogelXDestination){kogelX = kogelX + kogelXSpeed}
    if(kogelY < kogelYDestination){kogelY = kogelY + kogelYSpeed}
    if(kogelY > kogelYDestination){kogelY = kogelY + kogelYSpeed}

}

//checkt if de kogel bij zijn destination is aangekomen
if(kogelX < kogelXDestination +originalKogelSpeed && kogelX > kogelXDestination -originalKogelSpeed && kogelY < kogelYDestination +originalKogelSpeed && kogelY > kogelYDestination -originalKogelSpeed && mouseIsClicked === true ){ 
    kogelDestinationReached = true;
    kogelXSpeed = originalKogelSpeed;
    kogelYSpeed = originalKogelSpeed;

}

if(kogelX > width*1.2 || kogelX < width*-1.2 ||kogelY > height*1.2 || kogelY < height*-1.2){
    kogelXSpeed = originalKogelSpeed;
    kogelYSpeed = originalKogelSpeed;
    kogelDestinationReached = true;
}

//zorgt dat de orginele positie van de kogel altijd bij de speler is
kogelXOriginal = spelerX + 55;
kogelYOriginal = spelerY;  

//beweegt de kogel terug naar de speler als een boomerang
if (kogelDestinationReached === true && mouseIsClicked === true){

    if(kogelX < kogelXOriginal){kogelX = kogelX + originalKogelSpeed}
    if(kogelX > kogelXOriginal){kogelX = kogelX - originalKogelSpeed}
    if(kogelY < kogelYOriginal){kogelY = kogelY + originalKogelSpeed}
    if(kogelY > kogelYOriginal){kogelY = kogelY - originalKogelSpeed}

}

//kijkt of de kogel weer terug is bij de speler
if(kogelX < kogelXOriginal +originalKogelSpeed && kogelX > kogelXOriginal -originalKogelSpeed && kogelY < kogelYOriginal +originalKogelSpeed && kogelY > kogelYOriginal -originalKogelSpeed && mouseIsClicked === true ){ 
    mouseIsClicked = false;
    kogelDestinationReached = false;
    kogelX = kogelXOriginal;
    kogelY = kogelYOriginal;

}


//zorgt dat de kogel met de speler meebeweegt als hij niet aan het schieten is
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

    //de array die per vijand checkt of ie geraakt is
    for(var i = 0; i < vijanden.length; i++){
        
        //kijkt of de kogel in de vijand is
        if(kogelX < vijandX[i] +vijandScale[i]/2 && kogelX > vijandX[i] -vijandScale[i]/2 && kogelY < vijandY[i] +vijandScale[i]/2 && kogelY > vijandY[i] -vijandScale[i]/2 && mouseIsClicked === true && vijandInvinsible[i] === false){

                vijandLevens[i] = vijandLevens[i] - 1;
                vijandInvinsible[i] = true;

        }

        //kijkt of de kogel weer buiten de vijand is, zodat je de vijand niet meerdere keren kan raken terwijl de kogel in de vijand is
        if(kogelX > vijandX[i] +vijandScale[i]/2 || kogelX < vijandX[i] -vijandScale[i]/2 && kogelY > vijandY[i] +vijandScale[i]/2 || kogelY < vijandY[i] -vijandScale[i]/2 && vijandInvinsible[i] === true){
            vijandInvinsible[i] = false;
        }

        //delete de gegevens van de vijand als hij dood is
        if(vijandLevens[i] < 1){
                vijanden.splice(i, 1);
                vijandX.splice(i, 1);
                vijandY.splice(i, 1);
                vijandScale.splice(i, 1);
                vijandSpeed.splice(i, 1);
                vijandLevens.splice(i, 1);
                vijandInvinsible.splice(i, 1);
                i--;
        }


    };

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

  spelerY = height/2;

  for(var i = 0; i < aantalVijanden; i++){
        vijanden.push("vijand"+ i);
        vijandX.push(random((width/100)*20, (width/100)*90));
        vijandY.push(random((height/100)*10, (height/100)*90));
        vijandScale.push (random(15, 75));
        vijandSpeed.push(-0.025 * vijandScale[i] + 2.875);
        vijandLevens.push(2);
        vijandInvinsible.push(false);
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
    
    case UITLEG:
        // Uilegscherm/startscherm
        // Als je op "play" klikt begint de game bij het begin
        break;
    
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
      
      case GAMEOVER:
        // spelen is gestopt
        // zet groot op het scherm "game-over"
        // kijk of er een toets is ingedrukt, zoja, maak dan de status UITLEG
        // vergeet niet om alle variabelen weer te resetten
      break;
   
  }
}
