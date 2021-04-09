const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

function addObjectPlayer(_name, _hp, _img, _weapon, _player){
    const newPlayer = {
        player: _player,
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

function createElement(tag, className){
    const $tag = document.createElement(tag);
    if(className){
        $tag.classList.add(className);
    } 
    return $tag;
}

function createDivPlayer(player){
    const $div_player = createElement('div', 'player' + player.player);
    
    const $div_progressbar = createElement('div', 'progressbar');
    $div_player.appendChild($div_progressbar);
    
    const $div_life = createElement('div', 'life');
    $div_life.style.width = `${player.hp}%`;
    $div_progressbar.appendChild($div_life);
    
    const $div_name = createElement('div', 'name');
    $div_name.innerHTML = player.name;
    $div_progressbar.appendChild($div_name);
    
    const $div_character = createElement('div', 'character');
    $div_player.appendChild($div_character);
    
    const $img_character = createElement('img');
    $img_character.src = player.img;
    $div_character.appendChild($img_character);
    return $div_player;
}

function changeHP(player, winPlayer){
    const $playerLife = document.querySelector(`.player${player.player} .life`);
    let damage = Math.floor(Math.random() * (21 - 1) + 1);
    if(player.hp > 0){
        player.hp -= damage;
    }
    if(player.hp <= 0){ //чтобы избежать ошибки, когда при достижении нуля окошко с надписью не высвечивается, я решил создать второй if, а не else. Избежать этого возможно(к примеру, добавлением ифа в самый первый иф), но не слишком целесообразно, как мне кажется
        if (player.hp != 0) player.hp = 0;  //подобная проверка ведь является более оптимизированным решением, чем бессмысленное переприсвоение ?
        if(winPlayer) $arenas.appendChild(playerWin(winPlayer.name));
        else $arenas.appendChild(playerLose(player.name));
        //существует невероятное количество возможностей осуществления данной задачи. Один из самых простых, но адаптивных, наверное, с подачей победителя в виде аргумента. Так мы можем сохранить ресурсы комьютера, избежав использования селектора и работы с DOM деревом, и в то же время сделать функцию легкой к изменениям. Если учесть, что игрока у нас всегда два игрока, то можно было бы обойтись и без аргумента. Если же аргумент не был подан, используется вариант с объявленеим проигравшего.
        //$randomButton.disabled = true;
        $randomButton.style.display = 'none';//этот вариант мне нравится больше
    }
    $playerLife.style.width = player.hp + '%';
}

function playerLose(name){
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerHTML = name + ' lose';
    return $loseTitle;
}

function playerWin(name){
    const $winTitle = createElement('div', 'winTitle'); //я продублировал стили loseTitle, чтобы класс этого объекта воспринимался правильнее
    $winTitle.innerHTML = name + ' win';
    return $winTitle;
}

const player1 = addObjectPlayer('Scorpion', 100, 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif', 'Kunai', 1);
const player2 = addObjectPlayer('Sub-Zero', 100, 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif', 'Ice', 2);

$randomButton.addEventListener('click', () => {
    changeHP(player1, player2);
    changeHP(player2, player1);
})

$arenas.appendChild(createDivPlayer(player1));
$arenas.appendChild(createDivPlayer(player2));