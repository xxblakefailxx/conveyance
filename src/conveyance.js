define(['models/player'], function(Player) {
  var Conveyance = function(config) {
    //init
    this.player = new Player(config.player_name)
  }
  
  Conveyance.prototype = {
    
  }
  
  return Conveyance;
  
});