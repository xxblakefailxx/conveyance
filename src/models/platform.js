define(['models/structure', 'lib/helpers'], function(Structure, helpers){
  Platform = function(base){    
    Structure.call(this, base);
  }
  
  Platform.prototype = Object.create(Structure.prototype);
  
  return Platform
})

