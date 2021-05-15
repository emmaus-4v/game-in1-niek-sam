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


const LEFT = 0;
const RIGHT = 1;

var animatieKlok = 0;

var spelerX = 65; // x-positie van speler
var spelerY = 0; // y-positie van speler
var spelerSpeed = 6; // snelheid van speler
var spelerLevens = 10; // hoeveelheid levens van de speler
var spelerInvinsible = false; // checkt of de speler invinsible is
var invinsibleTimer = 0; // timer, duh

var blobvis = 0;
var backGround = 0;
var smallSlimeLeftFrame1 = 0;
var smallSlimeLeftFrame2 = 0;
var smallSlimeRightFrame1 = 0;
var smallSlimeRightFrame2 = 0;

var mediumSlimeLeftFrame1 = 0;
var mediumSlimeLeftFrame2 = 0;
var mediumSlimeLeftFrame3 = 0;
var mediumSlimeRightFrame1 = 0;
var mediumSlimeRightFrame2 = 0;
var mediumSlimeRightFrame3 = 0;

var largeSlimeLeftFrame1 = 0;
var largeSlimeLeftFrame2 = 0;
var largeSlimeLeftFrame3 = 0;
var largeSlimeRightFrame1 = 0;
var largeSlimeRightFrame2 = 0;
var largeSlimeRightFrame3 = 0;

var kogelX = spelerX + 55;    // x-positie van kogel
var kogelY = spelerY;    // y-positie van kogel
var kogelXOriginal = spelerX + 55;    // x-positie van kogel
var kogelYOriginal = spelerY;    // y-positie van kogel
var kogelXDestination = 0; // x destination van kogel
var kogelYDestination = 0; // y destination van kogel
var originalKogelSpeed = 11 ; // snelheid van de kogel
var kogelXSpeed = 8; // x snelheid van kogel
var kogelYSpeed = 8; // y snelheid van kogel
var kogelDestinationReached = false; // checkt of de destination van de kogel is bereikt



var aantalVijanden = 4; // aantal vijanden
var vijanden = []; // 
var vijandX = [];   // array met x-posities van vijanden
var vijandY = [];   // array met y-posities van vijanden
var vijandSpeed = []; // array met snelheden van vijanden
var vijandScale = []; // array met sizes van vijanden
var temporaryVijandscale = 0; // tijdelijke opslag voor de grootte van de vijand
var vijandLevens = []; // array met het aantal levens van vijanden
var vijandInvinsible = []; // array met of de vijand net is geraakt of niet
var vijandDirection = [];
var vijandSize = [];


var kamer = 1;
var vijandPunten = 0; // aantal behaalde punten voor het aantal verslagen vijandjes (+x per small enemy, +x per medium enemy, +x per large enemy)
var kamerPunten = 0; // aantal behaalde punten voor het aantal verslagen levels (+x per roomY)
var tijdPunten = 3000; // aantal behaalde punten voor de snelheid hav het clearen van rooms (-50 per seconde, na 1 minuut 0 punten erbij)

var score = 0; // alle scores opgeteld

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
  image(backGround, 0, 0, 1280, 720);
};

var scores = function () {

    textSize(30);
    textFont("fantasy");
    fill("white");
    text("room: " + kamer, (width/8)*2, 20, 500, 500);
    text("time: " + tijdPunten,  (width/8)*2.7, 20, 500, 500);
    text("room bonus: " + kamerPunten,  (width/8)*3.65, 20, 500, 500);
    text("enemies: " + vijandPunten,  (width/8)*5.4, 20, 500, 500);
    text("score: " + score,  (width/8)*6.65, 20, 500, 500);
    
    

};

//
var animatieTimer = function () {

animatieKlok = animatieKlok+1;

if(animatieKlok === 21){
animatieKlok = 0;
}


};


/**
 * Tekent de vijand
 */
var tekenVijand = function() {

    for(var i = 0; i < vijanden.length; i++){

        //rect(vijandX[i], vijandY[i], vijandScale[i], vijandScale[i]/2);
        //rect(vijandX[i] - 25, vijandY[i] -25, vijandScale[i] + 50, vijandScale[i]/2 +50);
        
        if(vijandDirection[i] === LEFT){
            if(vijandSize[i] === 1){
                if(animatieKlok < 12.6 ){
                    image(smallSlimeLeftFrame1, vijandX[i], vijandY[i], vijandScale[i]);
        
                };
                if(animatieKlok > 12.6 ){
                    image(smallSlimeLeftFrame2, vijandX[i], vijandY[i], vijandScale[i]);
                };
            };
            if(vijandSize[i] === 2){
                if(animatieKlok < 8.2 ){
                    image(mediumSlimeLeftFrame1, vijandX[i], vijandY[i], vijandScale[i]);
        
                };
                if(animatieKlok > 8.2 && animatieKlok < 12.6 ){
                    image(mediumSlimeLeftFrame2, vijandX[i], vijandY[i], vijandScale[i]);
                };
                if(animatieKlok > 12.6 ){
                    image(mediumSlimeLeftFrame3, vijandX[i], vijandY[i], vijandScale[i]);
                };
            };
            if(vijandSize[i] === 3){
                if(animatieKlok < 8.2 ){
                    image(largeSlimeLeftFrame1, vijandX[i], vijandY[i], vijandScale[i]);
        
                };
                if(animatieKlok > 8.2 && animatieKlok < 12.6 ){
                    image(largeSlimeLeftFrame2, vijandX[i], vijandY[i], vijandScale[i]);
                };
                if(animatieKlok > 12.6 ){
                    image(largeSlimeLeftFrame3, vijandX[i], vijandY[i], vijandScale[i]);
                };
            };
        };
        
        if(vijandDirection[i] === RIGHT){
            if(vijandSize[i] === 1){
                if(animatieKlok < 12.6 ){
                    image(smallSlimeRightFrame1, vijandX[i], vijandY[i], vijandScale[i]);
        
                };
                if(animatieKlok > 12.6 ){
                    image(smallSlimeRightFrame2, vijandX[i], vijandY[i], vijandScale[i]);
                };
            };
            if(vijandSize[i] === 2){
                if(animatieKlok < 8.2 ){
                    image(mediumSlimeRightFrame1, vijandX[i], vijandY[i], vijandScale[i]);
        
                };
                if(animatieKlok > 8.2 && animatieKlok < 12.6 ){
                    image(mediumSlimeRightFrame2, vijandX[i], vijandY[i], vijandScale[i]);
                };
                if(animatieKlok > 12.6 ){
                    image(mediumSlimeRightFrame3, vijandX[i], vijandY[i], vijandScale[i]);
                };
            };
            if(vijandSize[i] === 3){
                if(animatieKlok < 8.2 ){
                    image(largeSlimeRightFrame1, vijandX[i], vijandY[i], vijandScale[i]);
        
                };
                if(animatieKlok > 8.2 && animatieKlok < 12.6 ){
                    image(largeSlimeRightFrame2, vijandX[i], vijandY[i], vijandScale[i]);
                };
                if(animatieKlok > 12.6 ){
                    image(largeSlimeRightFrame3, vijandX[i], vijandY[i], vijandScale[i]);
                };
            };
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
    ellipse(x, y, 20, 20)

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
        vijandDirection[i] = RIGHT;
    }

    if(spelerX < vijandX[i]){
        vijandX[i] = vijandX[i] - vijandSpeed[i];
        vijandDirection[i] = LEFT;
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

if(kogelX > width -10 || kogelX < 10 ||kogelY > height -10 || kogelY < 10){
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
        if(kogelX < vijandX[i] +vijandScale[i] && kogelX > vijandX[i] && kogelY < vijandY[i] +vijandScale[i]/2 && kogelY > vijandY[i] && mouseIsClicked === true && vijandInvinsible[i] === false){

                vijandLevens[i] = vijandLevens[i] - 1;
                vijandInvinsible[i] = true;

        }

        //kijkt of de kogel weer buiten de vijand is, zodat je de vijand niet meerdere keren kan raken terwijl de kogel in de vijand is
        if(kogelX > vijandX[i] +vijandScale[i] || kogelX < vijandX[i] && kogelY > vijandY[i] +vijandScale[i]/2 || kogelY < vijandY[i] && vijandInvinsible[i] === true){
            vijandInvinsible[i] = false;
        }

        //delete de gegevens van de vijand als hij dood is
        if(vijandLevens[i] < 1){

                if(vijandSize[i] === 1){
                    vijandPunten = vijandPunten + 50;
                }
                if(vijandSize[i] === 2){
                    vijandPunten = vijandPunten + 150;
                }
                if(vijandSize[i] === 3){
                    vijandPunten = vijandPunten + 300;
                }

                vijanden.splice(i, 1);
                vijandX.splice(i, 1);
                vijandY.splice(i, 1);
                vijandScale.splice(i, 1);
                vijandSpeed.splice(i, 1);
                vijandLevens.splice(i, 1);
                vijandInvinsible.splice(i, 1);
                vijandDirection.splice(i, 1);
                vijandSize.splice(i, 1);
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
    
    
    
for(var i = 0; i < vijanden.length; i++){
    
    
    if(spelerX < vijandX[i] +vijandScale[i] + 25 && spelerX > vijandX[i] -25 && spelerY < vijandY[i] +vijandScale[i]/2 +25 && spelerY > vijandY[i] -25 && spelerInvinsible === false){
                spelerLevens = spelerLevens - 1;
                spelerInvinsible = true;
    }
   

}

while(spelerInvinsible === true && invinsibleTimer < 150){
    invinsibleTimer = invinsibleTimer + 1;

}

    if(spelerInvinsible === true && invinsibleTimer >= 150 ){
        spelerInvinsible = false;
        invinsibleTimer = 0;
    } 

    
   




  return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    if(spelerLevens === 0){
    return true;
    }
  return false;
};


function preload(){
    blobvis = loadImage('images/test.jpg');
    backGround = loadImage('images/canvas1.png');

    smallSlimeLeftFrame1 = loadImage('images/small slime left frame 1.png');
    smallSlimeLeftFrame2 = loadImage('images/small slime left frame2.png');
    smallSlimeRightFrame1 = loadImage('images/small slime right frame1.png');
    smallSlimeRightFrame2 = loadImage('images/small slime right frame2.png');

    mediumSlimeLeftFrame1 = loadImage('images/medium slime left frame1.png');
    mediumSlimeLeftFrame2 = loadImage('images/medium slime left frame2.png');
    mediumSlimeLeftFrame3 = loadImage('images/medium slime left frame3.png');
    mediumSlimeRightFrame1 = loadImage('images/medium slime right frame1.png');
    mediumSlimeRightFrame2 = loadImage('images/medium slime right frame2.png');
    mediumSlimeRightFrame3 = loadImage('images/medium slime right frame3.png');

    largeSlimeLeftFrame1 = loadImage('images/large slime left frame1.png');
    largeSlimeLeftFrame2 = loadImage('images/large slime left frame2.png');
    largeSlimeLeftFrame3 = loadImage('images/large slime left frame3.png');
    largeSlimeRightFrame1 = loadImage('images/large slime right frame1.png');
    largeSlimeRightFrame2 = loadImage('images/large slime right frame2.png');
    largeSlimeRightFrame3 = loadImage('images/large slime right frame3.png');
}
/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  
  //frameRate(fr);
  
  createCanvas(1280, 720);
  
  // Kleur de achtergrond blauw, zodat je het kunt zien
  background(73, 57, 38, 1);

  aantalVijanden = kamer + 4;

  spelerY = height/2;

  for(var i = 0; i < aantalVijanden; i++){
        vijanden.push("vijand"+ i);
        vijandX.push(random((width/100)*40, (width/100)*90));
        vijandY.push(random((height/100)*10, (height/100)*90));
        vijandDirection.push(LEFT);

        temporaryVijandscale = random(0.5, 3.5);
        temporaryVijandscale = Math.round(temporaryVijandscale);

    if(temporaryVijandscale === 1){
        vijandSpeed.push(1);
        vijandLevens.push(1);
        vijandScale.push(50);

    }
    if(temporaryVijandscale === 2){
        vijandSpeed.push(2);
        vijandLevens.push(3);
        vijandScale.push(90);
        
    }
    if(temporaryVijandscale === 3){
        vijandSpeed.push(2.5);
        vijandLevens.push(4);
        vijandScale.push(130);

    }
    vijandSize.push(temporaryVijandscale);
    
    vijandInvinsible.push(false);

    };

    

  
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
      animatieTimer();
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
      scores();  

      if (vijanden.length > 0){
          tijdPunten = tijdPunten -1;
      }
      kamerPunten = kamer * 400;
      
      if (vijanden.length === 0 && keyIsDown(69)){
        
        score = score + tijdPunten + kamerPunten + vijandPunten;

        kamer = kamer + 1;
        setup();
        
        vijandPunten = 0;
        kamerPunten = 0;
        tijdPunten = 3000;
        
        spelerX = 65;
        spelerInvinsible = false; // checkt of de speler invinsible is
        invinsibleTimer = 0; // timer, duh
        spelerLevens = 10; // hoeveelheid levens van de speler

      } 

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
      
      case GAMEOVER:
        // spelen is gestopt
        // zet groot op het scherm "game-over"
        // kijk of er een toets is ingedrukt, zoja, maak dan de status UITLEG
        // vergeet niet om alle variabelen weer te resetten

    if(keyIsDown(69)){

        for(var i = 0; i < vijanden.length; i++){
                vijanden.splice(i, 1);
                vijandX.splice(i, 1);
                vijandY.splice(i, 1);
                vijandScale.splice(i, 1);
                vijandSpeed.splice(i, 1);
                vijandLevens.splice(i, 1);
                vijandInvinsible.splice(i, 1);
                vijandDirection.splice(i, 1);
                vijandSize.splice(i, 1);
                i--;
        }

        kamer = 1;
        setup();
        
        vijandPunten = 0;
        kamerPunten = 0;
        tijdPunten = 3000;
        score = 0;
        spelerX = 65;
        spelerInvinsible = false; // checkt of de speler invinsible is
        invinsibleTimer = 0; // timer, duh
        spelerLevens = 10; // hoeveelheid levens van de speler
        spelStatus = SPELEN;
    }   
      break;
   
  }
}
