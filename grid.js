function Grid(x, y){
  this.x = x
  this.y = y
  this.size = 18
  this.padding = 1
}

Grid.prototype.draw =function(ctx, color){
  ctx.beginPath();
  ctx.rect(this.x+this.padding, this.y+this.padding, this.size, this.size);
  ctx.fillStyle = color
  ctx.fill();
}