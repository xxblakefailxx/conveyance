define(['models/unit', 'lib/helpers'], function(Unit, helpers){
  Enemy = function(base){
    Unit.call(this, base)

    this.color = base.color || '#f0f';
    this.direction = base.direction || 'left';
    this.delta_fire = 0;
    this.fire_rate = base.fire_rate || 0;
  }
  Enemy.prototype = Object.create(Unit.prototype);
  Enemy.prototype.update = function(dt) {
    //Base speed move (level shifting towards player)
    this.x -= (this.level_speed * dt);

    this.draw_x = helpers.draw_x(this.x, this.y, this.width, this.height)
    this.draw_y = helpers.draw_y(this.x, this.y, this.width, this.height)

    //Fire this.fire_rate times per second
    this.delta_fire += dt;
    if(this.fire_rate && this.delta_fire > (1 / this.fire_rate)) {
      this.fire();
      this.delta_fire = 0;
    }

    //Set as inactive if the enemy has moved past the left-hand side of the screen
    if (this.x + this.width < 0) this.explode();
  }

  return Enemy
})
