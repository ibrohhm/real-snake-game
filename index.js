var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var snake = new Snake()
var food = new Food()
var isPlay = false

function init(){
    snake.build()
    snake.draw(context)
    food.build(canvas, snake, context)
}

function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
}

function checkEating(){
    head = snake.getHead()
    return head.x == food.x && head.y == food.y ? true : false
}

function snakeMove(isMove){
    if(!isMove) return

    snake.move(canvas)
    isEating = checkEating()
    if(isEating){
        snake.eat()
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.draw(context)
    isEating ? food.build(canvas, snake, context):food.draw(snake, context)
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
            isPlay = !isPlay
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

