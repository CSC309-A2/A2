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

function pause_game(pause_button){
    var elem = document.getElementById('pause_button');
    if (elem.value=="PAUSE"){
        elem.value = "RESUME"
    } else{
        elem.value = "PAUSE"
    }
}

function countdownTimer(minutes) {
    var game_page = document.getElementById('game_page');
    var start_page = document.getElementById('start_page');
    var seconds = 3;
    var mins = minutes
    function tick() {
        var counter = document.getElementById("timer");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML = 
current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if(seconds > 0) {
            setTimeout(tick, 1000);
        } else {
            if(mins > 1){   
               setTimeout(function () { countdown(mins - 1); }, 1000);     
            } else {
                setTimeout(function () {
                    game_page.style.display = 'none';
                    start_page.style.display = 'block';
                }, 1000);
            }
        }
    }
    tick();
        
}