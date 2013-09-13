define(['models/unit', 'lib/helpers'], function(Unit, helpers){
  Player = function(base){
    Unit.call(this, base);
    
    this.x = base.x || 50;
    this.y = base.y || 400;
    this.width = base.width || 15;
    this.height = base.width || 15;
    this.color = base.color || '#1e76b0';
    this.fire_event = 'player:fire';
    this.fire_direction = 'right';
    
    //jumping
    this.grounded = true;
    this.jumpSinWavePos = 0;
    this.jumpHeight = 64;
    this.halfPI = Math.PI / 2;
    this.jumpHangTime = .5;
    this.jumpSinWaveSpeed = this.halfPI / this.jumpHangTime;
    this.fallMultiplyer = 1.5;
  }
  
  Player.prototype = Object.create(Unit.prototype);
  
  Player.prototype.update = function(dt) {
    
    //jumping
    if (!this.grounded) {
      var lastHeight = this.jumpSinWavePos;
      this.jumpSinWavePos += this.jumpSinWaveSpeed * dt;
    
      if (this.jumpSinWavePos >= Math.PI) {
        this.grounded = true;
        
        this.y = 400;
      }
      else {
        this.y -= (Math.sin(this.jumpSinWavePos) - Math.sin(lastHeight)) * this.jumpHeight;
      }
    }
    this.draw_x = helpers.draw_x(this.x, this.y, this.width, this.height)
    this.draw_y = helpers.draw_y(this.x, this.y, this.width, this.height) 
  }

  Player.prototype.draw = function(context) {
    //Draw ammo text
    context.fillStyle = this.color;
    context.textAlign = "right";
    context.textBaseline = "bottom";
    context.fillText(this.ammo, 635, 475);
    
    //Draw player dot
    context.fillRect(this.draw_x, this.draw_y, this.width, this.height);

  }
  
  Player.prototype.jump = function() {
    if(this.grounded) {
      this.grounded = false;
      this.jumpSinWavePos = 0;
    }
  }

  return Player
})

