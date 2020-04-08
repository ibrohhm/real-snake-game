var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var snake = new Snake()
var food = new Food()

function init(){
    snake.build(60,60)
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

document.addEventListener('keydown', function (e) {
    switch(e.keyCode){
        case 32:
            snakeMove(true)
            break;
        case 39:
        case 68:
            snakeMove(snake.changeDirection("right"))
            break;
        case 40:
        case 83:
            snakeMove(snake.changeDirection("down"))
            break;
        case 37:
        case 65:
            snakeMove(snake.changeDirection("left"))
            break;
        case 38:
        case 87:
            snakeMove(snake.changeDirection("up"))
            break;
    }
})

