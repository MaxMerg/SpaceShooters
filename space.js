//canvas variables
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

//ship variables
var ship = document.getElementById("ship");
var title = document.getElementById("title");
var start = document.getElementById("start");
var credits = document.getElementById("credits");
var background = document.getElementById("background");
var deathScreen = document.getElementById("deathScreen");
var directions = document.getElementById("directions");
var menus = document.getElementById("menus");

//rocks
var rock1 = document.getElementById("rock");
var rock2 = document.getElementById("rock");
var rock3 = document.getElementById("rock");
var rock4 = document.getElementById("rock");
var rock5 = document.getElementById("rock");

//ship placement
var x = 0;
var y = 5;
var w = 90;
var h = 54;

//player score
var count = 0;

//keeps track of spacebar presses
var space = 0;

//rock placements
var rx1 = Math.ceil(Math.random()*675);
var rx2 = Math.ceil(Math.random()*675);
var rx3 = Math.ceil(Math.random()*675);
var rx4 = Math.ceil(Math.random()*(675/2)+(675/2));
var rx5 = Math.ceil(Math.random()*(675/2)+(675/2));
var ry1 = 795;
var ry2 = 795;
var ry3 = 795;
var ry4 = 795;
var ry5 = 795;
var rw = 75;
var rh = 75;

//turns off the blinking effect
var on;
var off;

//stops the rocks movement after being hit
var interval1;
var interval11;
var interval2;
var interval22;
var interval3;
var interval33;
var interval4;
var interval44;
var interval5;
var interval55;

//used for a more random spacing
var min1 = 50;
var max1 = 1500;
var min2 = 1000;
var max2 = 2500;
var min3 = 2000;
var max3 = 3500;

//the random speed at which a rock can travel from 5-13
var rateChange1 = (Math.ceil(Math.random()*10)+5);
var constant = 8;

//toggles the menus
var main = true;
var sub = false;

//tells whether or not the game is currently running or if it is only in the menus
var running = false;

//starts the program
drawTitle();


//opens the directions menu and closes the title screen
function subMenu() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(title, 225, 0, 300, 150);
    ctx.drawImage(start, 0, 0, 365, 25, 192.5, 145, 365, 25);
    ctx.drawImage(directions, 177, 200, 395, 250);
    clearInterval(off);
    clearInterval(on);
    ctx.drawImage(start, 0, 0, 365, 25, 192.5, 145, 365, 25)
}

function mainMenu() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTitle();
}

//draws the death screen upon death
function drawDeathScreen() {
    clear();
    setInterval(function() {
        ctx.drawImage(deathScreen, 0, 0, 500, 250);
        ctx.clearRect(0, 0, 750, 875);
        ctx.drawImage(rock1, rx1, ry1, rw, rh);
        ctx.drawImage(rock2, rx2, ry2, rw, rh);
        ctx.drawImage(rock3, rx3, ry3, rw, rh);
        ctx.drawImage(rock4, rx4, ry4, rw, rh);
        ctx.drawImage(rock5, rx5, ry5, rw, rh);
        drawDeathScreen();
        drawShip();
    }, 50)    
    ctx.drawImage(deathScreen, 0, 0, 500, 250);
}

//clears the intervals(rock movement) once hit
function clear() {
    clearInterval(interval1); 
    clearInterval(interval11);
    clearInterval(interval2); 
    clearInterval(interval22);
    clearInterval(interval3); 
    clearInterval(interval33);
    clearInterval(interval4); 
    clearInterval(interval44);
    clearInterval(interval5); 
    clearInterval(interval55);
}

//places the rocks onto an axis ending with 0
function cleanUp() {
    var string1 = rx1.toString();
    console.log(string1);
    var last1 = string1.charAt((string1.length)-1);
    var int1 = parseInt(last1);
        if (last1 == 0) {
            console.log("even");
        }else{
            var diff = 10 - int1; 
            rx1 = rx1 + diff;
            console.log(rx1);
        }
}

//loads the game screen after space is presssed
function spacePressed() {
        space = space + 1;
        clearInterval(on);
        clearInterval(off);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawShip();
        drawRock();
}

//draws the background
function drawBackground() {
    ctx.drawImage(background, 0, 0, 1000, 900);
}

//draws the title sprite
function drawTitle() {
    ctx.drawImage(title, 225, 0, 300, 150);
    drawStart();
}

//draws the "press space to start" sprite and the cover art with my name at the bottom and draws the menu line
function drawStart() {
        ctx.drawImage(start, 0, 0, 365, 25, 192.5, 145, 365, 25);
        on = setInterval(function(){ctx.clearRect(192.5, 145, 365, 25)}, 750);
        off = setInterval(function(){ctx.drawImage(start, 0, 0, 365, 25, 192.5, 145, 365, 25)}, 1500);

        ctx.drawImage(credits, 572, 835, 158, 20);

        ctx.drawImage(ship, 285, 230, 180, 108);
        ctx.drawImage(rock1, 337.5, 425, 75, 75);
        ctx.drawImage(rock2, 675/4, 291.67, 75, 75);
        ctx.drawImage(rock3, 506.25, 291.67, 75, 75);

        ctx.drawImage(menus, 25, 835, 236, 20);
}

//draws the ship
function drawShip() {
    ctx.drawImage(ship, x, y, w, h);
}

//draws the rocks at random intervals and moves them up by 5 every half milisecond
//also has built in hit detection within the if statement
function drawRock() {
    cleanUp();
    time1();
    time2();
    time3();
    time4();
    time5();

//rock number one (1)
function time1() {
    ry1=795;
    rateChange1 = (Math.random()*13)+5;
    rx1=Math.ceil(Math.random()*675);
    setTimeout(function(){
        ctx.drawImage(rock1, rx1, ry1, rw, rh);
        interval1 = setInterval(function(){
            ctx.clearRect(rx1, ry1, rw+5, rh+10);
            ry1 = ry1 - constant;
                if(ry1 <= 0) {
                    time1()
                    clearInterval(interval1);
                    clearInterval(interval11);
                    count = count + 1;
                    console.log("end of the line");
                }
        }, 50);
        interval11 = setInterval(function(){
            ry1 = ry1-rateChange1;
            ctx.drawImage(rock1, rx1, ry1, rw, rh);
                if (x + w >= rx1 && x <= rx1 + rw && ry1 <= y+h-20 && ry1 > 0-rh) {
                    console.log("hit");
                    drawDeathScreen()
                }
                running = true;
        }, 50);},
    Math.random()*(max1-min1)+min1)
    }

//rock number two (2)
function time2() {
    ry2=795;
    rx2=Math.ceil(Math.random()*675);
    setTimeout(function(){
        ctx.drawImage(rock2, rx2, ry2, rw, rh);
        interval2 = setInterval(function(){
            ctx.clearRect(rx2, ry2, rw+5, rh+10);
            ry2 = ry2 -constant;
                if(ry2 <= 0) {
                    time2()
                    clearInterval(interval2);
                    clearInterval(interval22);
                    count = count + 1;
                    console.log("end of the line2");
                }
        }, 50);
        interval22 = setInterval(function(){
             ry2 = ry2-5;
             ctx.drawImage(rock2, rx2, ry2, rw, rh);
                if (x + w >= rx2 && x <= rx2 + rw && ry2 <= y+h-20 && ry2 > 0-rh) {
                    console.log("hit2");
                    drawDeathScreen()
                }
                running = true;
        }, 50);},
    Math.random()*(max1-min1)+min1)
    }

//rock number three (3) 
function time3() {
    ry3=795;
    rx3=Math.ceil(Math.random()*675);
    setTimeout(function(){
        ctx.drawImage(rock3, rx3, ry3, rw, rh);
        interval3 = setInterval(function(){
            ctx.clearRect(rx3, ry3, rw+5, rh+10);
            ry3 = ry3 -constant;
                if(ry3 <= 0) {
                    time3()
                    clearInterval(interval3);
                    clearInterval(interval33);
                    count = count + 1;
                    console.log("end of the line3");
                }
        }, 50);
        interval33 = setInterval(function(){
             ry3 = ry3-5;
             ctx.drawImage(rock3, rx3, ry3, rw, rh);
                if (x + w >= rx3 && x <= rx3 + rw && ry3 <= y+h-20 && ry3 > 0-rh) {
                    console.log("hit3");
                    drawDeathScreen()
                }
                running = true;
        }, 50);},
    Math.random()*(max2-min2)+min2)
    }

//rock number four (4)
function time4() {
    ry4=795;
    rateChange1 = (Math.random()*13)+5;
    rx4=Math.ceil(Math.random()*675);
    setTimeout(function(){
        ctx.drawImage(rock4, rx4, ry4, rw, rh);
        interval4 = setInterval(function(){
            ctx.clearRect(rx4, ry4, rw+5, rh+10);
            ry4 = ry4 -constant;
                if(ry4 <= 0) {
                    time4()
                    clearInterval(interval4);
                    clearInterval(interval44);                    
                    count = count + 1;
                    console.log("end of the line4");
                }
        }, 50);
        interval44 = setInterval(function(){
            ry4 = ry4-rateChange1;
            ctx.drawImage(rock4, rx4, ry4, rw, rh);
                if (x + w >= rx4 && x <= rx4 + rw && ry4 <= y+h-20 && ry4 > 0-rh) {
                    console.log("hit4");
                    drawDeathScreen()
                }
                running = true;
        }, 50);},
    Math.random()*(max3-min3)+min3)
    }

//rock number (5)
function time5() {
    ry5=795;
    rateChange1 = (Math.random()*13)+5;
    rx5=Math.ceil(Math.random()*675);
    setTimeout(function(){
        ctx.drawImage(rock5, rx5, ry5, rw, rh);
        interval5 = setInterval(function(){
            ctx.clearRect(rx5, ry5, rw+5, rh+10);
            ry5 = ry5 -constant;
                if(ry5 <= 0) {
                    time5()
                    clearInterval(interval5);
                    clearInterval(interval55);
                    count = count + 1;
                    console.log("end of the line5");
                }
        }, 50);
        interval55 = setInterval(function(){
             ry5 = ry5-rateChange1;
             ctx.drawImage(rock5, rx5, ry5, rw, rh);
                if (x + w >= rx5 && x <= rx5 + rw && ry5 <= y+h-20 && ry5 > 0-rh) {
                    console.log("hit5");
                    drawDeathScreen()
                }
                running = true;
        }, 50);},

    Math.random()*(max3-min3)+min3)
    }

    setTimeout(function() {
        constant = constant + 2;
    }, 15000);

    setTimeout(function() {
        constant = constant + 4;
    }, 30000)

    setTimeout(function() {
        constant = constant + 4;
    }, 45000);

    
}

//listens for key presses and moves the ship accordingly
window.addEventListener("keydown", move, false);
function move(e) {
    switch(e.keyCode) {
        case 37:
            if (x >= 1) {
                ctx.clearRect(x, y, w, h);
                x = x - 12;
                drawShip();      
            }
            break;

        case 39:
            if (x <= 654) {
                ctx.clearRect(x, y, w, h);
                x = x + 12;
                drawShip();
            }
            break;
        case 65:
            if (x >= 1) {
                ctx.clearRect(x, y, w, h);
                x = x - 12;
                drawShip();
            }
            break;

        case 68:
            if (x <= 654) {
                ctx.clearRect(x, y, w, h);
                x = x + 12;
                drawShip();
            }
            break;

        case 32: 
            if(space == 0) {
                spacePressed();
                console.log(space);
            }
            else {
                console.log(space);
            }
            break;

        case 82:
            alert("YOUR SCORE: " + count)
            location.reload();
            break;

        case 73:
            if(running == false) {
            if(main == true && sub == false) {
                subMenu();
                main = false;
                sub = true;
            }else {
                if (main == false && sub == true) {
                    mainMenu();
                    main = true;
                    sub = false;
                }
            }
        }
            break;

        default:
            "Error";
            break;
    }   
}  

//38 = upArrow
//39 = rightArrow
//40 = downArrow
//37 = leftArrow

//W = 87
//A = 65
//S = 83
//D = 68

//32 = spacebar
//82 = "r"

