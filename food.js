function Food(x, y, color){
  this.x = x || 0
  this.y = y || 0
  this.color = color
}

Food.prototype.build = function(){
  this.x = 10
  this.y = 10
}

