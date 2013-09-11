define([], function(){ 
  //projectile maybe?
  Enemy = function(ene){
  //init
    this.position = ene.position;
    this.width = ene.width;
    this.height = ene.height;
    this.color = '#FFFF00';
    this.active = true;
    this.speed = 200;
  }
  
    Enemy.prototype = {
    update: function(dt) {
      this.position.x -= (this.speed * dt);
      
      //FIXME (put in collision detection?)
      this.active = this.position.x > (0 - this.width);
    },
    draw: function(context) {
      
      context.fillStyle = this.color;
      context.fillRect(this.position.x, this.position.y - this.height, this.width, this.height);
    },
    explode: function() {
      this.active = false;
    }
    
    //TODO: When Enemy is killed
  };

  
  return Enemy
  })
  
