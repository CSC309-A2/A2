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
    var start_button = document.getElementById('start_button');
    var game_page = document.getElementById('game_page');
    var start_page = document.getElementById('start_page');
    game_page.style.display = 'none';
    start_page.style.display = 'block';
}