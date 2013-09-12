define(['lib/helpers'], function(helpers){
  Projectile = function(x, y, direction, color){
    //init
    this.x = x;
    this.y = y;
    this.active = true;
    this.direction = direction;
    this.speed = 500;
    this.color = color;
    this.width = 6;
    this.height = 6;
    this.draw_x = helpers.draw_x(this.x, this.y, this.width, this.height)
    this.draw_y = helpers.draw_y(this.x, this.y, this.width, this.height)
  }
  Projectile.prototype = {
    update: function(dt) {
      switch(this.direction) {
        case 'right':
          this.x += (this.speed * dt);
          break;
        case 'left':
         this.x -= (this.speed * dt);
          break;
      }
      
      this.draw_x = helpers.draw_x(this.x, this.y, this.width, this.height)
      this.draw_y = helpers.draw_y(this.x, this.y, this.width, this.height)

      if (this.x < 0 || this.x > 640) this.explode();
    },
    draw: function(context) {
      context.fillStyle=this.color;
      context.fillRect(this.draw_x, this.draw_y, this.width, this.height);
      
    },
    explode: function(reason) {
      this.active = false;
    }
  };

  return Projectile
})

