define(['lib/helpers'], function(helpers){
  PhysicalObject = function(base){
    base = base || {};

    this.width = base.width || 0;
    this.height = base.height || 0;
    this.x = base.x || 0;
    this.y = base.y || 0;
    this.draw_x = helpers.draw_x(this.x, this.y, this.width, this.height);
    this.draw_y = helpers.draw_y(this.x, this.y, this.width, this.height);
    
    this.active = base.active || true;
    this.level_speed = base.level_speed || 0;
    this.color = base.color || '#000';
  }
  PhysicalObject.prototype.update = function(dt) {
    //Base speed move (objects shifting towards player)
    this.x -= (this.level_speed * dt);

    
    //Set as inactive if the obstacle has moved past the left-hand side of the screen
    if (this.x + this.width < 0) this.explode();
    
    this.draw_x = helpers.draw_x(this.x, this.y, this.width, this.height)
    this.draw_y = helpers.draw_y(this.x, this.y, this.width, this.height)
  }
  PhysicalObject.prototype.draw = function(context) {
    context.fillStyle = this.color;
    context.fillRect(this.draw_x, this.draw_y, this.width, this.height);
  }
  PhysicalObject.prototype.explode = function() {
    this.active = false;
  }
  
  return PhysicalObject;
})

