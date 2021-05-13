screenStart.addEventListener('click', start); 

 let player = {
    speed : 5 , score: 0 
 };

let keys = {ArrowUp : false , ArrowDown : false
, ArrowLeft: false, ArrowRight : false};

 document.addEventListener('keydown',keyDown); 
 document.addEventListener('keyup',keyUp); 

function keyDown(e){
    e.preventDefault();
    keys[e.key] = true; 
    //console.log(keys); 
}

function keyUp(e){
    e.preventDefault();
    keys[e.key] = false; 
    //console.log(keys); 
} 

function isCollide(a,b){
    aRect = a.getBoundingClientRect(); 
    bRect = b.getBoundingClientRect(); 

    return !((aRect.bottom < bRect.top) ||
        (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right))
}

function endGame(){
    player.start = false; 
    screenStart.classList.remove('hidden'); 
}

function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy'); 

    enemy.forEach(function(item){

        if(isCollide(car,item)){ 
            endGame(); 
        }

        if(item.y >= 750){
            item.y = -300; 
            item.style.left = Math.floor(Math.random()*350) + "px"; 
        }

        item.y += player.speed; 
        item.style.top = item.y + "px"; 
    })
}

function gamePlay(){
    let car = document.querySelector('.car'); 
    let road = gameArea.getBoundingClientRect();  

    if(player.start){

        moveEnemy(car); 

        if(keys.ArrowUp && player.y > (road.top + 70)){ 
            player.y -= player.speed;
        }
        if(keys.ArrowDown && player.y < (road.bottom - 70)){ 
            player.y += player.speed;
        }
        if(keys.ArrowLeft && player.x > 0){ 
            player.x -= player.speed;
        }
        if(keys.ArrowRight && player.x < (road.width - 50)){ 
            player.x += player.speed;
        }

        car.style.top = player.y + "px"; 
        car.style.left = player.x + "px"; 

        window.requestAnimationFrame(gamePlay); 
        console.log(player.score++);

        player.score++; 
        score.innerText = "Score: " + player.score; 
    }
}

function start(){
    //gameArea.classList.remove('hidden');
    screenStart.classList.add('hidden'); 
    gameArea.innerHTML = "" ; 

    player.start = true; 
    player.score = 0; 
    window.requestAnimationFrame(gamePlay);
    
    let car = document.createElement('div');
    car.setAttribute('class', 'car'); 
    gameArea.appendChild(car); 

    player.x = car.offsetLeft; 
    player.y = car.offsetTop; 

    for(x=0; x<3; x++){
        let enemyCar = document.createElement('div'); 
        enemyCar.setAttribute('class','enemy'); 
        enemyCar.y = ((x+1)*350)*-1; 
        enemyCar.style.top = enemyCar.y + "px"; 
        enemyCar.style.background = 'blue'; 
        enemyCar.style.left = Math.floor(Math.random()*350) + "px"; 
        gameArea.appendChild(enemyCar); 

        
    } 
    
}

