define(['models/physical_object', 'lib/helpers'], function(PhysicalObject, helpers){
  Unit = function(base){
    PhysicalObject.call(this, base);
    this.ammo = base.ammo || -1;
  }
  Unit.prototype = Object.create(PhysicalObject.prototype);
  Unit.prototype.fire = function() {
    var event = new CustomEvent('enemy:fire', {
      'detail': {
        x: this.x + this.width / 2,
        y: this.y - this.height / 2,
        direction: this.direction,
        color: this.color
      }
    });
    dispatchEvent(event);
  }
  return Unit
})
