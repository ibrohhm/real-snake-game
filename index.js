var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var snake = new Snake()
var food = new Food()
var isPlay = false
var $play = document.querySelector(".button.play")
var $pause = document.querySelector(".button.pause")
var $restart = document.querySelector(".button.restart")
var maxScore = 0
var score = 0

function init(){
    snake = new Snake()
    food = new Food()
    score = 0
    gamePause()
    
    snake.build()
    food.build(canvas, snake, context)
    canvasDraw()
}

function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
}

function snakeMove(isMove){
    if(!isMove) return

    snake.move(canvas)
    isEating = checkEating()
    if(isEating){
        snake.eat()
        food.build(canvas, snake, context)
    }
    canvasDraw()
    updateScore()
}

window.onresize = resize
resize()

setInterval(function(){
    if(isPlay && snake.isAlife){
        snakeMove(true)
    }
}, 200);

document.addEventListener('keydown', function (e) {
    switch(e.keyCode){
        case 32:
            isPlay == true ? gamePause() : gamePlay()
            break;
        case 39:
        case 68:
            if(isPlay) snakeMove(snake.changeDirection("right"))
            break;
        case 40:
        case 83:
            if(isPlay) snakeMove(snake.changeDirection("down"))
            break;
        case 37:
        case 65:
            if(isPlay) snakeMove(snake.changeDirection("left"))
            break;
        case 38:
        case 87:
            if(isPlay) snakeMove(snake.changeDirection("up"))
            break;
    }
})

$play.addEventListener("click", function(e){
    gamePlay()
})

$pause.addEventListener("click", function(e){
    gamePause()
})

$restart.addEventListener("click", function(e){
    init()
})

function gamePlay(){
    isPlay = true
    $play.classList.add("hide")
    $pause.classList.remove("hide")
}

function gamePause(){
    isPlay = false
    $play.classList.remove("hide")
    $pause.classList.add("hide")
}

function canvasDraw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.draw(context)
    food.draw(context, snake.isAlife)
}

function checkEating(){
    head = snake.getHead()
    return head.x == food.x && head.y == food.y ? true : false
}

function updateScore(){
    score = snake.length
    maxScore = score > maxScore ? score : maxScore
    document.querySelector("#score .col.current-score .value").textContent = score
    document.querySelector("#score .col.max-score .value").textContent = maxScore
}


