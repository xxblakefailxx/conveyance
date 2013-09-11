define([], function(){
  Projectile = function(position){
    //init
    this.position = {x: position.x, y: position.y}
    this.active = true;
    
    this.speed = 30;
  }
  Projectile.prototype = {
    update: function() {
      this.position.x += (this.speed * dt);
      
      
      //FIXME (put in collision detection?)
      this.active = this.position.x < 640;
    },
    draw: function(context) {
      context.beginPath();
      context.fillStyle='#bf2619';
      context.arc(this.position.x, this.position.y, 3, 0, Math.PI*2, true);
      context.closePath();
      context.fill();
    },
    explode: function() {
      this.active = false;
    }
  };

  return Projectile
})

