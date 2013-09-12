define(['models/physical_object', 'lib/helpers'], function(PhysicalObject, helpers){
  Item = function(base){    
    PhysicalObject.call(this, base);
  }
  
  Item.prototype = Object.create(PhysicalObject.prototype);
  
  return Item
})

