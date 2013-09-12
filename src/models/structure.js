define(['models/physical_object', 'lib/helpers'], function(PhysicalObject, helpers){
  Structure = function(base){    
    PhysicalObject.call(this, base);
  }
  
  Structure.prototype = Object.create(PhysicalObject.prototype);
  
  return Structure
})

