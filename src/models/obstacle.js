define([], function(){
  Obstacle = function(obs, base_speed){
    //init
    this.position = obs.position;
    this.width = obs.width;
    this.height = obs.height;
    
    this.active = true;
    
    this.speed = base_speed;
    
    this.color = '#000';

    
  }
  Obstacle.prototype = {
    update: function(dt) {
      //Base speed move (level shifting towards player)
      this.position.x -= (this.speed * dt);
      
      //Set as inactive if the obstacle has moved past the left-hand side of the screen
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

