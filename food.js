function Food(){
  this.x = 0
  this.y = 0
  this.color = "red"
}

Food.prototype.draw = function(snake, context){
  grid = new Grid(this.x, this.y, snake.belly, snake.gap, this.color)
  grid.draw(context)
}

Food.prototype.build = function(canvas, snake, context){
  _axis = Math.floor(canvas.width/snake.total)
  _ordinat = Math.floor(canvas.height/snake.total)
  this.x = Math.floor(Math.random() * _axis)*snake.total
  this.y = Math.floor(Math.random() * _ordinat)*snake.total;
  
  _insideSnake = false
  for(var i=0; i<snake.grids.length;i++){
    if(snake.grids[i].x == this.x && snake.grids[i].y == this.y){
      _insideSnake = true
      break;
    }
  }
  if(!_insideSnake){
    return this.draw(snake, context)
  }
  return this.build(canvas, snake, context)
}

