function Grid(x, y, size, padding){
  this.x = x
  this.y = y
  this.size = size
  this.padding = padding
}

Grid.prototype.draw =function(ctx, color){
  ctx.beginPath();
  ctx.rect(this.x+this.padding, this.y+this.padding, this.size, this.size);
  ctx.fillStyle = color
  ctx.fill();
}