define(['models/physical_object', 'lib/helpers'], function(PhysicalObject, helpers){
  Projectile = function(base){
    PhysicalObject.call(this, base);
    //init
    this.direction = base.direction || 'right';
    this.speed = base.speed || 500;
    this.width = base.width || 6;
    this.height = base.height || 6;
  }
  Projectile.prototype = Object.create(PhysicalObject.prototype);
  Projectile.prototype.update = function(dt) {
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
  }

  return Projectile
})

