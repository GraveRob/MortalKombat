function addObjectPlayer(_name, _hp, _img, _weapon){
    const newPlayer = {
        name: _name,
        hp: _hp,
        img: _img,
        weapon: [_weapon],
        attack: () =>{
            console.log(newPlayer.name + ' - Fight...');
        }
    }
    return newPlayer;
}

function createDivPlayer(_class, player){
    const $div_player = document.createElement('div');
    $div_player.classList.add(_class);
    document.querySelector('.arenas').appendChild($div_player);
    
    const $div_progressbar = document.createElement('div');
    $div_progressbar.classList.add('progressbar');
    $div_player.appendChild($div_progressbar);
    
    const $div_life = document.createElement('div');
    $div_life.classList.add('life');
    $div_life.style.width = `${player.hp}%`;   //или же старой доброй конкатенацией player.hp + '%'
    $div_progressbar.appendChild($div_life);
    
    const $div_name = document.createElement('div');
    $div_name.classList.add('name');
    $div_name.innerHTML = player.name;
    $div_progressbar.appendChild($div_name);
    
    const $div_character = document.createElement('div');
    $div_character.classList.add('character');
    $div_player.appendChild($div_character);
    
    const $img_character = document.createElement('img');
    $img_character.src = player.img;
    $div_character.appendChild($img_character);
}

const player1 = addObjectPlayer('Scorpion', 100, 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif', 'Kunai');
console.log(player1);
player1.attack();
const player2 = addObjectPlayer('Sub-Zero', 100, 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif', 'Ice');
console.log(player2);
player2.attack();

createDivPlayer('player1', player1);
createDivPlayer('player2', player2);