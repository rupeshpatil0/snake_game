const playGround = document.querySelector('#canvas')
const playGround2 = document.querySelector('#canvas2')
const playG = playGround.getContext('2d')
const playG2 = playGround2.getContext('2d')
const p=document.querySelector("p")

let ch = playGround.height = playGround2.height = 650
let cw = playGround.width = playGround2.width = 650
let box = 5
let snake = []
let prevx
let prevy
let score=0
let d=true
snake[0] = {
    x: 20,
    y: 20
}


const speed = {
    dx: 0,
    dy: 0
}
const randomP = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const rand = {
    hunt_x: 0,
    hunt_y: 0
}

function drawHunt() {
    playG2.clearRect(0, 0, cw, ch)
    let hunt_x = randomP(0, cw-50)
    let hunt_y = randomP(0, ch-50)
    rand.hunt_x = hunt_x
    rand.hunt_y = hunt_y
    playG2.fillStyle = "black"
    playG2.beginPath()
    playG2.fillRect(hunt_x, hunt_y, 10, 10)
    playG2.fill()

}



function drawSnake() {
    playG.clearRect(0, 0, cw, ch)
    
    for (let i = 0; i < snake.length; i++) {
        playG.strokeStyle="red"
        playG.strokeRect(snake[i].x, snake[i].y, 10, 10)
        playG.fillStyle="white"
        playG.beginPath()
        playG.fillRect(snake[i].x, snake[i].y, 10, 10)
        playG.fill()
    }

}

function changeInPos() {
    let k;
    if(d===true){k=0}
    else{k=snake.length-1}
    const head={x:snake[k].x +speed.dx,y:snake[k].y+speed.dy}
    snake.unshift(head)
    snake.pop()

}


// on key press movement off snake
document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)
let m=""
function keyDown(e) {
    if (e.keyCode === 37 ) {
       m="moveLeft"
    }
    if (e.keyCode === 38) {
       m="moveUp"
    }
    if (e.keyCode === 39) {
       m="moveRight"
    }
    if (e.keyCode === 40) {
       m="moveDown"
    }  
    if (e.key === "Enter") {
        console.log("entered")
       m="stop"
    }

}
let n=""
function keyUp(event){
   
    if(event.keyCode==="d"){
        n="stop_head"
    }
}



//---x-----on key press movement off snake------x----//
// ---------wall transparent---------------------//

function wallHit() {
    if ((snake[0].x+10) >= cw) {
        // snake[0].x = cw
        return true
    }
    if (snake[0].x <= 0) {
        // snake[0].x = 0
        return true
    }
    if ((snake[0].y +10) >= ch) {
        // snake[0].y = ch
        return true
    }
    if (snake[0].y <= 0) {
        // snake[0].y = 0
        return true
    }
return false
}
// is game over

function isGameOver(){
    for(let i=4;i<snake.length;i++)
    {if(snake[0].x==snake[i].x && snake[0].y==snake[i].y){
        return true
    }
}
    return false
}

// update function

function update() {
   if( wallHit()||isGameOver()){
      alert("Game over")
      score=0
      location.reload()
      return
   } 
    drawSnake() //function calling
    
    movement()
    changeInPos()
    requestAnimationFrame(update)
    
    if (((snake[0].x + 8 >= rand.hunt_x) && (snake[0].x <= rand.hunt_x + 8)) && ((snake[0].y + 8 >= rand.hunt_y) && (snake[0].y <= rand.hunt_y + 8))) {
        drawHunt()
        score+=10

        for (let i = 1; i < snake.length; i++) {
            prevx = snake[i-1].x
            prevy = snake[i-1].y
            
        }
        const newS = {
            x: prevx,
            y: prevy
        }
        snake.push(newS)
        p.innerHTML=score
        

    }


}
drawHunt()
update()


function movement(){
    if(m==="moveLeft" && speed.dx!==5)  {
        speed.dx = -5
        speed.dy = 0
    }
    if(m==="moveUp" && speed.dy!==5)  {
        speed.dx = 0
        speed.dy = -5
    }
    if(m==="moveRight" && speed.dx!==-5 )  {
        speed.dx = 5
        speed.dy = 0
    }
    if(m==="moveDown" && speed.dy!==-5 ) {
        speed.dx = 0
        speed.dy = 5
    }
    if(m==="stop") {
        speed.dx = 0
        speed.dy = 0
    }
    
  
}