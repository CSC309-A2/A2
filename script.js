function select_one(radio_button){
    if (this.__chk) 
        this.checked = false
}

var game_page = document.getElementById('game_page');    
var start_page = document.getElementById('start_page');
var start_button = document.getElementById('start_button');
var level_1 = document.getElementById('level1');
var level_2 = document.getElementById('level2');

function start_game(start_button){
    if (level_1.checked == true || level_2.checked == true){
        start_page.style.display = 'none';
        game_page.style.display = 'block';
        timerreset(); 
        timercountdown(); 
        init();
    }
    else{
        window.alert('Please select a level to continue.');
    }
}
        
var highScore = 0;

function confirmBox(){
    var currentScore = getHighScore();
    var r = confirm("Game Over!\nScore: " + currentScore +"\nRestart Game?");
    if (r == true){
        game_page.style.display = 'block';
        start_page.style.display = 'none';
        timerreset();
        timercountdown();
        init();
    } else{
        game_page.style.display = 'none';
        start_page.style.display = 'block';
        if (highScore < getHighScore()){
            highScore = getHighScore();
        }
        document.getElementById('high_score').value = highScore;
    }
}

/* FUNCTIONS FOR TIMER */

var CCOUNT = 60;
var t, count;
var flagTimer="resume";

function timerdisplay() {
    // displays time in span
    document.getElementById('timespan').innerHTML = count;
};

function timercountdown() {
    // starts countdown
    timerdisplay();
    if (count == 0) {
        // time is up
        setTimeout(function () {
            confirmBox();
        }, 2000);
    } else {
        count--;
        t = setTimeout("timercountdown()", 1000);
    }
};  

function timerreset() {
    // resets countdown
    count = CCOUNT;
};

function timerpause() { 
    if(flagTimer=='resume'){
        clearTimeout(t);
        document.getElementById('Pause').value="RESUME";
        flagTimer='pause';
        alert("This game has been paused. Click OK to resume.")
        flagTimer='resume';
        document.getElementById('Pause').value="PAUSE";
        timercountdown();
    }
}

/* FUNCTIONS FOR GAME/CANVAS */

var canvas2 = document.getElementById('canvas2');
canvas2.setAttribute('width', '400');
canvas2.setAttribute('height', '600');
var context2 = canvas2.getContext('2d');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var foodCoord = new Array();
var foodArray = new Array();
var score = 0;
var resetScore = 0;
var sInterval, timer;
var bugArr = new Array();
var request = null;

var food1Pos = {
    'x' : Math.floor((Math.random() * 70) + 0),
    'y' : Math.floor((Math.random() * 260) + 300)};
var food2Pos = {
    'x' : Math.floor((Math.random() * 70) + 75),
    'y' : Math.floor((Math.random() * 260) + 300)};
var food3Pos = {
    'x' : Math.floor((Math.random() * 75) + 160),
    'y' : Math.floor((Math.random() * 260) + 300)};
var food4Pos = {
    'x' : Math.floor((Math.random() * 75) + 250),
    'y' : Math.floor((Math.random() * 260) + 300)};
var food5Pos = {
    'x' : Math.floor((Math.random() * 30) + 339),
    'y' : Math.floor((Math.random() * 260) + 300)};

/* initializing program */
function init(){
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x){
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id){
            clearTimeout(id);
        };

    canvas.addEventListener("touchstart", tap);
    canvas.addEventListener("mousedown", tap);

    bugArr.splice(0,bugArr.length);
    if(request != null);
    clearTimeout(sInterval);
    clearTimeout(timer);
    document.getElementById("score").innerHTML = resetScore;
    document.getElementById('high_score').value = highScore;
    score = 0;
    drawFood();
    setupBugs();
    sInterval = setInterval(setupBugs, 3000);
    timer = window.setInterval(callAnimation, 30);
    //SET SCORE BACK TO 0
}

function foodCoordinates(x, y){
    this.x = x;
    this.y = y;
}

function drawFood(){
    var donut1 = new Image();
    donut1.onload = function(){
        context2.drawImage(donut1, food1Pos.x, food1Pos.y, 40, 40);  
    };
    donut1.src = "donut1.png";

    var donut2 = new Image();
    donut2.onload = function(){
        context2.drawImage(donut2, food2Pos.x, food2Pos.y, 40, 40);
    };
    donut2.src = "donut2.png";

    var donut3 = new Image(); 
    donut3.onload = function(){
        context2.drawImage(donut3, food3Pos.x, food3Pos.y, 40, 40);
    };
    donut3.src = "donut3.png";

    var donut4 = new Image(); 
    donut4.onload = function(){
        context2.drawImage(donut4, food4Pos.x, food4Pos.y, 40, 40);
    }; 
    donut4.src = "donut4.png";

    var donut5 = new Image(); 
    donut5.onload = function(){
        context2.drawImage(donut5, food5Pos.x, food5Pos.y, 40, 40);
    }; 
    donut5.src = "donut5.png";

    foodArray.push(donut1);
    foodArray.push(donut2);
    foodArray.push(donut3);
    foodArray.push(donut4);
    foodArray.push(donut5);

    foodCoord.push(new foodCoordinates(food1Pos.x, food1Pos.y));
    foodCoord.push(new foodCoordinates(food2Pos.x, food2Pos.y));
    foodCoord.push(new foodCoordinates(food3Pos.x, food3Pos.y));
    foodCoord.push(new foodCoordinates(food4Pos.x, food4Pos.y));
    foodCoord.push(new foodCoordinates(food5Pos.x, food5Pos.y));
}

/* FUNCTIONS TO SETUP/ANIMATE THE BUG */

var angle = 0;
var request;
var colors = ["#000000", "#F30B0B", "#FF6600"];
var randInterval;

function Bug(xPos, yPos, radius, speed, colour){
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.speed = speed;
    this.colour = colors[Math.floor(Math.random() * colors.length)];
    this.counter = 0;
}

Bug.prototype.update = function() {
    var minDistance = findNearestFood(this.xPos);
    var theSpeed = null;
    var orangeSpeed = null;

    if (level_1.checked == true){
        //level 1 is selected
        orangeSpeed = 1.5;
    } else{ 
        //level 2 is selected
        orangeSpeed = 2;
    }

    var redSpeed = 1.25 * orangeSpeed;
    var blackSpeed = 2 * orangeSpeed;
    context.fillStyle = this.colour;

    if (this.colour == "#000000"){
        theSpeed = blackSpeed;
    } else if (this.colour == "#F30B0B"){
        theSpeed = redSpeed;
    } else{
        theSpeed = orangeSpeed;
    }
    if (this.xPos < (minDistance.x +20)){
        this.xPos+=theSpeed ;
    } else{
        this.xPos-=theSpeed ;
    }

    if (this.yPos < (minDistance.y +20)){
        this.yPos+=theSpeed ;
    } else{
        this.yPos-=theSpeed ;
    }

    context.beginPath();

    context.moveTo(this.xPos, this.yPos);
    context.lineTo(this.xPos+6, this.yPos+6);

    context.moveTo(this.xPos, this.yPos);
    context.lineTo(this.xPos-6, this.yPos-6);

    context.moveTo(this.xPos, this.yPos);
    context.lineTo(this.xPos+6, this.yPos-6);

    context.moveTo(this.xPos, this.yPos);
    context.lineTo(this.xPos-6, this.yPos+6);

    context.moveTo(this.xPos, this.yPos);
    context.lineTo(this.xPos+8, this.yPos);

    context.moveTo(this.xPos, this.yPos);
    context.lineTo(this.xPos, this.yPos+8);

    context.moveTo(this.xPos, this.yPos);
    context.lineTo(this.xPos-8, this.yPos);

    context.moveTo(this.xPos, this.yPos);
    context.lineTo(this.xPos, this.yPos-8);

    context.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI, false);
    context.stroke();
    context.fill();
    context.closePath();
    
    var foodToDestroy = null;
    foodToDestroy = getFoodByPos(this.xPos, this.yPos);
    if (foodToDestroy != null){
    destroyFood(foodToDestroy);
    }
};


function setupBugs(){
    var randomX = Math.floor((Math.random()*399) +1);
    var Y = -5;
    var radius = 5;
    var speed = 1;
    var theBug = new Bug(randomX, Y, radius, speed);
    bugArr.push(theBug);
    drawAndUpdate();
}

function drawAndUpdate(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < bugArr.length; i++) {
        var mybugs = bugArr[i];
        mybugs.update();
    }
}

function callAnimation(){
    request = requestAnimationFrame(drawAndUpdate);
}

function findNearestFood(bugX){
    var dist = 600;
    //the coordinates of the food with min distance
    var minCoord = null;

    for (var i = 0; i < foodCoord.length; i++) {
        if ((Math.abs(bugX - foodCoord[i].x)) < dist) {
            dist = Math.abs(bugX - foodCoord[i].x);
            minCoord = foodCoord[i];
        }
    };
    return minCoord;
}

/* Let bug run until it reaches the food, if they eat it let it walk to the end of the screen than put it back to random position in the upper part of the canvas. If it reaches the food, destroy it, use another function and let it stop(delay) then let it move towards end of the screen */
function destroyFood(food){
    for (var i = 0; i < foodArray.length; i++){
        if(foodArray[i] === food){
            foodArray[i] = null;
            foodArray.splice(i, 1);
            context2.clearRect(foodCoord[i].x, foodCoord[i].y, 40, 40);
            foodCoord[i] = null;
            foodCoord.splice(i, 1);
            break;
        }
    };

    if (foodArray.length == 0){
      setTimeout(function (){
            confirmBox();
        }, 300);
      clearTimeout(t);
    }
}

function getFoodByPos(x, y){
    for (var i = 0; i < foodCoord.length; i++) {
        if (between(x, foodCoord[i].x +5, foodCoord[i].x +25) && between(y, foodCoord[i].y +5, foodCoord[i].y +25)){
            return foodArray[i];
        }
    };
    return null;
}


function between(x, min, max) {
    return x >= min && x <= max;
}

/* FUNCTIONS FOR TAP*/

function getElementPosition (element) {
   var parentOffset,
       pos = {
           x: element.offsetLeft,
           y: element.offsetTop 
       };
   if (element.offsetParent) {
       parentOffset = getElementPosition(element.offsetParent);
       pos.x += parentOffset.x;
       pos.y += parentOffset.y;
   }
   return pos;
}

function addScore(bug){
    var black = "#000000";
    var orange = "#ff6600";
    var red = "#F30B0B";
    if (bug.colour == black){
        score += 5;
    }
    else if (bug.colour == red){
        score += 3;
    }
    else{
        score += 1;
    }
}

function destroyBug (bug) {
    var i;
    for (i = 0; i < bugArr.length; i += 1) {
        setTimeout(function(){
            cancelRequestAnimFrame(request);                
        }, 1*1000)
        if (bugArr[i] === bug) {
            bugArr[i] = null;
            bugArr.splice(i, 1);
            break;
        }
    }
}

function distance (p1, p2) {
    var dx = p1.x - p2.x,
        dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

var getFrameWidth = function () {
        return that.width;
};

function tap(e){
    var i;
    var bugToDestroy = [];
    pos = getElementPosition(canvas);
    var tapX = e.clientX;
    var tapY = e.clientY -50;

    for (i = 0; i < bugArr.length; i += 1) {
        if (between(tapX, bugArr[i].xPos-10, bugArr[i].xPos+20) && between(tapY, bugArr[i].yPos-10, bugArr[i].yPos+20)){
            bugToDestroy.push(bugArr[i]);
        }
    }
    // Destroy tapped bugArr
    for (i = 0; i < bugToDestroy.length; i += 1) {
        destroyBug(bugToDestroy[i]);
        addScore(bugToDestroy[i]);
    }
    if (bugToDestroy.length) {
        document.getElementById("score").innerHTML = score;
    }
}

canvas.width = 400;
canvas.height = 600;

function getHighScore(){
    return document.getElementById("score").innerHTML;
}