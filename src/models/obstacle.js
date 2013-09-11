define([], function(){
  Obstacle = function(position){
    //init
    this.position = {x: position.x, y: position.y}
    console.log(this.position.x);
    
    this.active = true;
    
    this.speed = 150;
    
    this.color = '#000';
    this.width = 25;
    this.height = 35;
    
  }
  Obstacle.prototype = {
    update: function(dt) {
      this.position.x -= (this.speed * dt);
      
      //FIXME (put in collision detection?)
      this.active = this.position.x > (0 - this.width);
    },
    draw: function(context) {
      
      context.fillStyle = this.color;
      context.fillRect(this.position.x, this.position.y - this.height, this.width, this.height);
    },
    explode: function() {
      this.active = false;
    }
  };

  return Obstacle
})

