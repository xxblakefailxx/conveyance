define(['models/physical_object', 'models/projectile', 'lib/helpers'], function(PhysicalObject, Projectile, helpers){
  Unit = function(base){    
    PhysicalObject.call(this, base);
    this.ammo = base.ammo || -1; //-1 is unlimited ammo
    this.fire_event = 'unit:fire'
    this.fire_direction = 'left'
  }
  
  Unit.prototype = Object.create(PhysicalObject.prototype);
  
  Unit.prototype.fire = function() {
    if(this.ammo != 0){
      var event = new CustomEvent(this.fire_event, {
        'detail': {
          x: this.x + this.width / 2,
          y: this.y - this.height / 2,
          direction: this.fire_direction,
          color: this.color
        }
      });
      dispatchEvent(event);
      console.log(event);
      this.ammo--;
    }
  }
  
  
    
  return Unit
})

