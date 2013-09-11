define(function(){
  Player = function(name){
    //init
    this.name = name
  }
  Player.prototype = {
    do_it: function() {
      console.log('Did it for player: ' + this.name);
    }
  };

  return Player
})

