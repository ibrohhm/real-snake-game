var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var snake = new Snake()

function init(){
    snake.build(60,60)
    snake.draw(context)
}

function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
}

function move(){
    snake.move(canvas)
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.draw(context)
}

window.onresize = resize
resize()

document.addEventListener('keydown', function (e) {
    switch(e.keyCode){
        case 32:
            move()
            console.log(snake.grids[0].x, snake.grids[0].y, canvas.width, canvas.height)
            break;
        case 39:
            snake.changeDirection("right")
            break;
        case 40:
            snake.changeDirection("down")
            break;
        case 37:
            snake.changeDirection("left")
            break;
        case 38:
            snake.changeDirection("up")
            break;
    }
})

