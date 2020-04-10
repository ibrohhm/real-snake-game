function Food(){
  this.x = 0
  this.y = 0
  this.color = "#cc3300"
}

Food.prototype.draw = function(context, isAlife){
  grid = new Grid(this.x, this.y)
  grid.draw(context, isAlife ? this.color : "#a5a5a5")
}

Food.prototype.build = function(canvas, snake, context){
  var _maxX = Math.ceil(canvas.width/snake.total)
  var _maxY = Math.ceil(canvas.height/snake.total)
  var _maxIndex = _maxX*_maxY
  var arrIndex = [...Array(_maxIndex).keys()]
  var arrSnake = []

  for(var i=0; i<snake.grids.length;i++){
    var _axis = snake.grids[i].x/snake.total
    var _ordinat = snake.grids[i].y/snake.total
    arrSnake.push(_axis + _ordinat*_maxX)
  }

  var arrEmpty = arrIndex.filter(x => !arrSnake.includes(x));
  var randIndex = arrEmpty[Math.floor(Math.random() * arrEmpty.length)]

  this.x = (randIndex%_maxX)*snake.total
  this.y = Math.floor(randIndex/_maxX)*snake.total
}

