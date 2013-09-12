define(['models/projectile', 'lib/helpers'], function(Projectile, helpers){
  Player = function(name){
    //init
    this.name = name;
    this.active = true;
    this.x = 50;
    this.y = 400;
    this.width = 15;
    this.height = 15;
    this.color = '#1e76b0';
    this.draw_x = helpers.draw_x(this.x, this.y, this.width, this.height)
    this.draw_y = helpers.draw_y(this.x, this.y, this.width, this.height)
    
    this.ammo = 100;
    this.projectiles = [];
    
    this.grounded = true;
    this.jumpSinWavePos = 0;
    this.jumpHeight = 64;
    this.halfPI = Math.PI / 2;
    this.jumpHangTime = .5;
    this.jumpSinWaveSpeed = this.halfPI / this.jumpHangTime;
    this.fallMultiplyer = 1.5;
    
  }
  Player.prototype = {
    update: function(dt) {
      this.projectiles.forEach(helpers.update_with_dt.bind(dt));
      this.projectiles = this.projectiles.filter(helpers.filter_active);
      
      //jumping
      if (!this.grounded) {
        // the last position on the sine wave
        var lastHeight = this.jumpSinWavePos;
        //the new position on the sine wave
        this.jumpSinWavePos += this.jumpSinWaveSpeed * dt;
      
        //we have fallen off the bottom of the sine wave, so continue falling
        //at a predetermined speed
        if (this.jumpSinWavePos >= Math.PI) {
          this.grounded = true;
          
          this.y = 400;
          //otherwise move along the sine wave
        }
        else {
          this.y -= (Math.sin(this.jumpSinWavePos) - Math.sin(lastHeight)) * this.jumpHeight;
          //this.grounded = true;
        }
      }
      this.draw_x = helpers.draw_x(this.x, this.y, this.width, this.height)
      this.draw_y = helpers.draw_y(this.x, this.y, this.width, this.height)
      
      //Somehow remove old projectiles?
    },
    draw: function(context) {
      //Draw ammo text
      context.fillStyle = this.color;
      context.textAlign = "right";
      context.textBaseline = "bottom";
      context.fillText(this.ammo, 635, 475);
      
      //Draw player dot
      context.fillRect(this.draw_x, this.draw_y, this.width, this.height);
      
      //Draw player projectiles
      this.projectiles.forEach(helpers.draw_with_context.bind(context));
    },
    explode: function() {
      //Player just ran into something
      this.active = false;
      
    },
    fire: function() {
      if(this.ammo > 0) {
        this.projectiles.push(new Projectile(this.x + this.width / 2, this.y - this.height/2 , 'right', this.color));
        this.ammo--;
      }
    },
    jump: function() {
      if(this.grounded) {
        this.grounded = false;
        this.jumpSinWavePos = 0;
      }
    }
  };

  return Player
})

