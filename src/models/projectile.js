define(['lib/helpers'], function(helpers){
  Projectile = function(position, direction, color){
    //init
    this.position = {x: position.x, y: position.y}
    this.active = true;
    this.direction = direction;
    this.speed = 500;
    this.color = color;
    this.width = 6;
    this.height = 6;
    this.draw_position = helpers.draw_position(this.position, this.width, this.height)
    
  }
  Projectile.prototype = {
    update: function(dt) {
      switch(this.direction) {
        case 'right':
          this.position.x += (this.speed * dt);
          break;
        case 'left':
         this.position.x -= (this.speed * dt);
          break;
      }
      
      this.draw_position = helpers.draw_position(this.position, this.width, this.height)

      if (this.position.x < 0 || this.position.x > 640) this.explode();
    },
    draw: function(context) {
      context.fillStyle=this.color;
      context.fillRect(this.draw_position.x, this.draw_position.y, this.width, this.height);
      
    },
    explode: function(reason) {
      this.active = false;
    }
  };

  return Projectile
})

