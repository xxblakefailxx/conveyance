define(['lib/helpers'], function(helpers){
  Obstacle = function(obs, base_speed){
    //init
    this.position = obs.position;
    this.width = obs.width;
    this.height = obs.height;
    this.draw_position = helpers.draw_position(this.position, this.width, this.height)
    this.active = true;
    
    this.speed = base_speed;
    
    this.color = '#000';

    
  }
  Obstacle.prototype = {
    update: function(dt) {
      //Base speed move (level shifting towards player)
      this.position.x -= (this.speed * dt);
      
      //Set as inactive if the obstacle has moved past the left-hand side of the screen
     if (this.position.x + this.width < 0) this.explode();
      
      this.draw_position = helpers.draw_position(this.position, this.width, this.height)
    },
    draw: function(context) {
      context.fillStyle = this.color;
      context.fillRect(this.draw_position.x, this.draw_position.y, this.width, this.height);
    },
    explode: function() {
      this.active = false;
    }
  };

  return Obstacle
})

