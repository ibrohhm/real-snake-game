function Snake(){
  this.length = 0
  this.grids = []
  this.direction = 0 // right 0, down 1, left 2, up 3
  this.nextDirection = 0
  this.belly = 18
  this.gap = 1
  this.total = 20
  this.axis = 3*this.total
  this.ordinat = 3*this.total
  this.color = "#008000"
  this.headColor = "#009900"
  this.vx = [this.total, 0, -this.total, 0]
  this.vy = [0, this.total, 0, -this.total]
  this.prevTail = new Grid()
  this.isAlife = true
}

Snake.prototype.build = function(){
  this.grids = []
  this.length = 3
  for(var i=0; i<this.length; i++){
    this.grids.push(new Grid(this.axis+i*this.total, this.ordinat))
  }
  this.grids.reverse()
  this.setHead(this.grids[0])
  this.isAlife = true
}

Snake.prototype.draw = function(ctx){
  for(var i=0; i<this.length; i++){
    this.grids[i].draw(ctx, i==0 ? this.headColor : this.color)
  }
}

Snake.prototype.eat = function(){
  this.grids.push(this.getPrevTail())
  this.length++
}

Snake.prototype.move = function(canvas){
  this.setDirection()
  if(!this.checkAlife()){
    this.color = "#808080"
    this.headColor = "#a5a5a5"
    return
  }

  this.setPrevTail(this.grids[this.length-1])
  for(var i=this.length-1; i>0; i--){
    this.grids[i] = this.grids[i-1]
  }
  curHead = this.getHead()
  newHead = this.setHead(new Grid(curHead.x+this.vx[this.direction], curHead.y+this.vy[this.direction]))

  if(newHead.y > canvas.height){
    this.setHead(new Grid(newHead.x+this.vx[this.direction], 0))
  } else if(newHead.y < 0){
    _res = canvas.height%this.total
    this.setHead(new Grid(newHead.x+this.vx[this.direction], canvas.height - _res))
  } else if(newHead.x > canvas.width){
    this.setHead(new Grid(0, newHead.y+this.vy[this.direction]))
  } else if (newHead.x < 0) {
    _res = canvas.width%this.total
    this.setHead(new Grid(canvas.width - _res, newHead.y+this.vy[this.direction]))
  }
}

// right 0, down 1, left 2, up 3
Snake.prototype.changeDirection = function(dir){
  switch(dir){
    case "down":
      _isSameDirection = this.direction == 1
      this.nextDirection = this.direction != 3 ? 1 : this.direction
      return _isSameDirection
    case "left":
      _isSameDirection = this.direction == 2
      this.nextDirection = this.direction != 0 ? 2 : this.direction
      return _isSameDirection
    case "up":
      _isSameDirection = this.direction == 3
      this.nextDirection = this.direction != 1 ? 3 : this.direction
      return _isSameDirection
    default:
      _isSameDirection = this.direction == 0
      this.nextDirection = this.direction != 2 ? 0 : this.direction
      return _isSameDirection
  }
}

Snake.prototype.getHead = function(){
  return this.grids[0]
}

Snake.prototype.setHead = function(grid){
  this.grids[0] = grid
  return grid
}

Snake.prototype.getPrevTail = function(){
  return this.prevTail
}

Snake.prototype.setPrevTail = function(grid){
  this.prevTail = grid
}

Snake.prototype.setDirection = function(){
  this.direction = this.nextDirection
}

Snake.prototype.checkAlife = function(){
  if(!this.isAlife) return this.isAlife

  curHead = this.getHead()
  nextX = curHead.x+this.vx[this.direction]
  nextY = curHead.y+this.vy[this.direction]

  for(var i=0; i<snake.grids.length-1;i++){//without tail
    if(snake.grids[i].x == nextX && snake.grids[i].y == nextY){
      this.isAlife = false
      break;
    }
  }

  return this.isAlife
}