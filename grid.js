function Grid(x, y, size, padding, color){
  this.x = x
  this.y = y
  this.size = size
  this.padding = padding
  this.color = color
}

Grid.prototype.draw =function(ctx){
  ctx.beginPath();
  ctx.rect(this.x+this.padding, this.y+this.padding, this.size, this.size);
  ctx.fillStyle = this.color;
  ctx.fill();
}