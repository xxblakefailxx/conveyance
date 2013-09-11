define([], function(){
  Obstacle = function(obs){
    //init
    this.position = obs.position;
    this.width = obs.width;
    this.height = obs.height;
    
    this.active = true;
    
    this.speed = 200;
    
    this.color = '#000';

    
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

