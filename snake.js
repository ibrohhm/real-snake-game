function Snake(){
  this.length = 0
  this.grids = []
  this.direction = 0 // right 0, down 1, left 2, up 3
  this.belly = 18
  this.gap = 1
  this.total = 20
  this.color = "green"
  this.vx = [this.total, 0, -this.total, 0]
  this.vy = [0, this.total, 0, -this.total]
}

Snake.prototype.build = function(x, y){
  this.length = 3
  for(var i=0; i<this.length; i++){
    this.grids.push(new Grid(x+i*this.total, y, this.belly, this.gap, this.color))
  }
  this.grids.reverse()
  this.setHead(this.grids[0])
}

Snake.prototype.draw = function(ctx){
  for(var i=0; i<this.length; i++){
    this.grids[i].draw(ctx)
  }
}

Snake.prototype.eat = function(x, y){
  this.grids.shift(new Grid(x, y, this.belly, this.gap, this.color))
}

Snake.prototype.move = function(canvas){
  for(var i=this.length-1; i>0; i--){
    this.grids[i] = this.grids[i-1]
  }
  curHead = this.getHead()
  newHead = this.setHead(new Grid(curHead.x+this.vx[this.direction], curHead.y+this.vy[this.direction], this.belly, this.gap, this.color))

  if(newHead.y > canvas.height){
    this.setHead(new Grid(newHead.x+this.vx[this.direction], 0, this.belly, this.gap, this.color))
  } else if(newHead.y < 0){
    var _res = canvas.height%this.total
    this.setHead(new Grid(newHead.x+this.vx[this.direction], canvas.height - _res, this.belly, this.gap, this.color))
  } else if(newHead.x > canvas.width){
    this.setHead(new Grid(0, newHead.y+this.vy[this.direction], this.belly, this.gap, this.color))
  } else if (newHead.x < 0) {
    var _res = canvas.width%this.total
    this.setHead(new Grid(canvas.width - _res, newHead.y+this.vy[this.direction], this.belly, this.gap, this.color))
  }
}

Snake.prototype.changeDirection = function(dir){
  this.direction = dir == "down" ? 1 : dir == "left" ? 2 : dir == "up" ? 3 : 0
}

Snake.prototype.getHead = function(){
  return this.grids[0]
}

Snake.prototype.setHead = function(grid){
  this.grids[0] = grid
  return grid
}

Snake.prototype.isAlife = function(){

}