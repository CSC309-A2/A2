function select_one(radio_button){
    if (this.__chk) 
        this.checked = false
}

var game_page = document.getElementById('game_page');    
var start_page = document.getElementById('start_page');

function start_game(start_button){
    var start_button = document.getElementById('start_button');
    game_page.style.display = 'block';
    start_page.style.display = 'none';
}

function confirmBox(){
    var r = confirm("Game Over!\nRestart Game?");
    if (r == true){
        game_page.style.display = 'block';
        start_page.style.display = 'none';
        timerreset();
        timercountdown();
        init();
        
    } else{
        var highScore = 0;
        game_page.style.display = 'none';
        start_page. style.display = 'block';
        highScore = getHighScore();
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

        // if (alert("PAUSE, RESUME??")){
        //   clearTimeout(t);
            
        // } else {
        //   timercountdown();
        // }


        if(flagTimer=='resume'){

            clearTimeout(t);
            document.getElementById('Pause').value="RESUME";
            flagTimer='pause';
            alert("PAUSE MODE, RESUME?")
            flagTimer='resume';
            document.getElementById('Pause').value="PAUSE";
            timercountdown();

        
        
    }}

/* FUNCTIONS FOR GAME/CANVAS */

//---NOTES-----

// NEED TO FIGURE OUT WHY ITS GETTING FASTER!!!



    var canvas2 = document.getElementById('canvas2');
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
        'y' : Math.floor((Math.random() * 260) + 300)
    };
    var food2Pos = {
        'x' : Math.floor((Math.random() * 70) + 75),
        'y' : Math.floor((Math.random() * 260) + 300)
    };
    var food3Pos = {
        'x' : Math.floor((Math.random() * 75) + 160),
        'y' : Math.floor((Math.random() * 260) + 300)
    };
    var food4Pos = {
        'x' : Math.floor((Math.random() * 75) + 250),
        'y' : Math.floor((Math.random() * 260) + 300)
    };
    var food5Pos = {
        'x' : Math.floor((Math.random() * 30) + 339),
        'y' : Math.floor((Math.random() * 260) + 300)
    };

//initiating program
    function init(){
       var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x){
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                       || window[vendors[x]+'CancelRequestAnimationFrame'];
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

        // canvas.addEventListener("mousedown", function(event){
        // var pos = getElementPosition(canvas);
        // alert('x'+pos.x);
        // });

        canvas.addEventListener("touchstart", tap);
        canvas.addEventListener("mousedown", tap);

      bugArr.splice(0,bugArr.length);
      if(request != null);
      clearTimeout(sInterval);
      clearTimeout(timer);
      document.getElementById("score").innerHTML = resetScore;
      document.getElementById('high_score').value = null;
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



        var donut1 =new Image() ;
        donut1.src= "donut1.png";
        context2.drawImage(donut1,food1Pos.x, food1Pos.y, 40, 40); 
        var donut2 =new Image() ;
        donut2.src= "donut2.png";
        context2.drawImage(donut2,food2Pos.x, food2Pos.y, 40, 40); 
        var donut3 =new Image() ;
        donut3.src= "donut3.png";
        context2.drawImage(donut3,food3Pos.x, food3Pos.y, 40, 40); 
        var donut4 =new Image() ;
        donut4.src= "donut4.png";
        context2.drawImage(donut4,food4Pos.x, food4Pos.y, 40, 40); 
        var donut5 =new Image() ;
        donut5.src= "donut5.png";
        context2.drawImage(donut5,food5Pos.x, food5Pos.y, 40, 40); 

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

    
    //drawFood();

    /* FUNCTIONS TO SETUP/ANIMATE THE BUG */

   
    //var maxBug = 10;
    var angle = 0;
    var request;
    var colors = ["#000000", "#F30B0B", "#FF6600"];
    var randInterval;

    function Bug(xPos, yPos, radius, speed, colour){
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        //this.width = width;
        this.speed = speed;
        this.colour = colors[Math.floor(Math.random() * colors.length)];
        this.counter = 0;
    }

    Bug.prototype.update = function() {

        var minDistance = findNearestFood(this.xPos);
            
        var theSpeed = null;
        var orangeSpeed = 1.5 ;
        var redSpeed = 1.25 * orangeSpeed;
        var blackSpeed = 2 * orangeSpeed;
        context.fillStyle = this.colour;

        if (this.colour == "#000000"){
          theSpeed = blackSpeed;
        } 
        else if (this.colour == "#F30B0B"){
          theSpeed = redSpeed;
        } else {
          theSpeed = orangeSpeed;
        }



            if (this.xPos < (minDistance.x +20)){
                this.xPos+=theSpeed ;
            } 

            //go left
            else{
                this.xPos-=theSpeed ;
            }

            if (this.yPos < (minDistance.y +20)){
                 this.yPos+=theSpeed ;
            }
            else{
                this.yPos-=theSpeed ;
            }
        // }
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

        
        //later -- set up speed based on color!!!!
        context.stroke();
        context.fill();
        context.closePath();

        //requestAnimFrame(update);

        var foodToDestroy = null;
        foodToDestroy = getFoodByPos(this.xPos, this.yPos);
        if (foodToDestroy != null){
        destroyFood(foodToDestroy);
        }
        //randInterval = Math.floor((Math.random()*2 )+1);
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
            //requestAnimFrame(drawAndUpdate);
            //setTimeout(mybugs.update, 100);
    }

    //if it reach destination coordinates, stop the animation frame??//
    }

    //----NOTES------//
    //still havent figure out how to set random time for entering the screen yet!!!!
    // setupBugs();
    // setInterval(setupBugs, 3000);

    function callAnimation(){
        request = requestAnimationFrame(drawAndUpdate);
    }

    //stop interval after 60 sec?or after the foods gone!
    //to retrieve for loops and foodCoord[].x or y


    //find the nearest food, only by its x coordinates from the bug
    //we can modify for y later (??)

    function findNearestFood(bugX){
        var dist = 600;
        //the coordinates of the food with min distance
        var minCoord = null;
        //var o = foodCoord[0].x;

        for (var i = 0; i < foodCoord.length; i++) {
            if ((Math.abs(bugX - foodCoord[i].x)) < dist) {
                dist = Math.abs(bugX - foodCoord[i].x);
                minCoord = foodCoord[i];
            }
        };
        return minCoord;
    }

    //------DESTROY FOOD------------//

    //implement the destroy food function//
    //-- let bug run until it reaches the food, if they eat it let it walk to the end of the screen than put it back to random position in the upper part of the canvas
    // if it reaches the food, destroy it, use another function and let it stop(delay) then let it move towards end of the screen

    function destroyFood(food){
        for (var i = 0; i < foodArray.length; i++) {
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
          setTimeout(function () {
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

    ///-----------------TAP--------------///

    //modify this
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
                    cancelAnimationFrame(request);                
                }, 1*1000);

                if (bugArr[i] === bug) {
                

                //bugArr[i];
               // addScore(bug);
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
        //some of these var are not used
        var i;
        var loc = {};
        var dist;
        var bugToDestroy = [];
        pos = getElementPosition(canvas);
        var tapX = e.clientX;
        var tapY = e.clientY -50;
        var canvasScaleRatio = canvas.width / canvas.offsetWidth;
        

        //loc.x = (tapX - pos.x) * canvasScaleRatio;
        //loc.y = (tapY - pos.y) * canvasScaleRatio;

        //----==------//

        for (i = 0; i < bugArr.length; i += 1) {
            if (between(tapX, bugArr[i].xPos-10, bugArr[i].xPos+20) && between(tapY, bugArr[i].yPos-10, bugArr[i].yPos+20)){
                bugToDestroy.push(bugArr[i]);

            }

            
        }
        //alert(tapX + '+' + tapY + '+' + bugToDestroy[0]);

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
      //MODIFY THIS TO GET SCORE FROM STAGE
      return document.getElementById("score").innerHTML;
    }
