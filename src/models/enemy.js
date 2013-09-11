define(['models/projectile', 'lib/helpers'], function(Projectile, helpers){ 
  Enemy = function(ene, base_speed){
  //init
    this.position = ene.position;
    this.width = ene.width;
    this.height = ene.height;
    this.color = '#f0f';
    this.active = true;
    this.speed = base_speed;
    this.projectiles = [];
    this.delta_fire = 0;
    this.fire_rate = ene.fire_rate || 0
  }
  
    Enemy.prototype = {
    update: function(dt) {
      this.projectiles.forEach(helpers.update_with_dt.bind(dt));
      this.projectiles = this.projectiles.filter(helpers.filter_active);
      
      //Base speed move (level shifting towards player)
      this.position.x -= (this.speed * dt);
      
      //Fire this.fire_rate times per second
      this.delta_fire += dt;
      if(this.fire_rate && this.delta_fire > (1 / this.fire_rate)) {
        this.fire();
        this.delta_fire = 0;
      }
      
      //Set as inactive if the enemy has moved past the left-hand side of the screen
      this.active = this.position.x > (0 - this.width);
    },
    draw: function(context) {
      
      context.fillStyle = this.color;
      context.fillRect(this.position.x, this.position.y - this.height, this.width, this.height);
      
      //Draw
      this.projectiles.forEach(helpers.draw_with_context.bind(context));
    },
    fire: function() {
      this.projectiles.push(new Projectile({x: this.position.x + this.width / 2, y: this.position.y - this.height/2 }, 'left'));
    },
    explode: function() {
      this.active = false;
    }
};

  
  return Enemy
  })
  
