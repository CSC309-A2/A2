function select_one(radio_button){
    if (this.__chk) 
        this.checked = false
}

function start_game(start_button){
    var start_button = document.getElementById('start_button');
    var game_page = document.getElementById('game_page');
    var start_page = document.getElementById('start_page');
    game_page.style.display = 'block';
    start_page.style.display = 'none';
}

/* FUNCTIONS FOR TIMER */

paused = false;

// set minutes
var mins = 0.1;
// calculate the seconds 
var secs = mins * 60;
var t = 0;
var flagTimer='resume';

function countdown() {
    t = setTimeout('Decrement()',1000);
}
function Decrement() {
    if (document.getElementById) {
        minutes = document.getElementById("minutes");
        seconds = document.getElementById("seconds");
        // if less than a minute remaining
        if (seconds < 59) {
            seconds.value = secs;
        } else {
            minutes.value = getminutes();
            seconds.value = getseconds();
        }
        secs--;
        if (secs <= 0){
            setTimeout(function () {
                    game_page.style.display = 'none';
                    start_page.style.display = 'block';
            }, 2000);
        }
        t = setTimeout('Decrement()',1000);
    }
}

function getminutes() {
    // minutes is seconds divided by 60, rounded down
    mins = Math.floor(secs / 60);
    return mins;
}

function getseconds() {
    // take mins remaining (as seconds) away from total seconds remaining
    return secs-Math.round(mins * 60);
}

function pause() { 
  if(flagTimer=='resume'){
    clearTimeout(t);
    t = 0;
    document.getElementById('Pause').value="RESUME";
    flagTimer='pause';
  }
  else {
    flagTimer='resume';
    document.getElementById('Pause').value="PAUSE";
    resume();
  }

}

function resume() {
    t = setTimeout('Decrement()',1000);
}


