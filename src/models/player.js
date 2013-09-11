define(['models/projectile'], function(Projectile){
  Player = function(name){
    //init
    this.name = name;
    this.active = true;
    this.position = { x: 50, y: 400 };
    this.width = 15;
    this.height = 15;
    this.color = '#1e76b0';
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
      this.projectiles.forEach(function(projectile) {
        projectile.update();
      });
      this.projectiles = this.projectiles.filter(function(projectile) {
        return projectile.active;
      });
      
      //jumping
      if (!this.grounded) {
        // the last position on the sine wave
        var lastHeight = this.jumpSinWavePos;
        //the new position on the sine wave
        this.jumpSinWavePos += this.jumpSinWaveSpeed * dt;
      
        //we have fallen off the bottom of the sine wave, so continue falling
        //at a predetermined speed
        if (this.jumpSinWavePos >= Math.PI)
          //this.position.y += this.jumpHeight / this.jumpHangTime * this.fallMultiplyer * dt;
          //otherwise move along the sine wave
          this.grounded = true;
        else {
          this.position.y -= (Math.sin(this.jumpSinWavePos) - Math.sin(lastHeight)) * this.jumpHeight;
          //this.grounded = true;
        }
      }
      
      //Somehow remove old projectiles?
    },
    draw: function(context) {
      //Draw ammo text
      context.fillStyle = this.color;
      context.textAlign = "right";
      context.textBaseline = "bottom";
      context.fillText(this.ammo, 635, 475);
      
      //Draw player dot
      context.fillRect(this.position.x, this.position.y - this.height, this.width, this.height);
      
      //Draw player projectiles
      this.projectiles.forEach(function(projectile){
        projectile.draw(context);
      });
    },
    explode: function() {
      //Player just ran into something
      this.active = false;
      
    },
    fire: function() {
      if(this.ammo > 0) {
        this.projectiles.push(new Projectile(this.position));
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

