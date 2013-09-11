define(['models/player', 'config'], function(Player, config) {
  var Conveyance = function() {
    //init
    this.player = new Player(config.player_name);
    this.enemies = [];
    this.obstructions = [];
    this
  }
  
  Conveyance.prototype = {
    run: function() {      
      this.update();
      this.redraw(config.canvas.getContext('2d'));
      // start the mainloop
      requestAnimationFrame( this.run.bind(this), config.canvas );
    },
    update: function() {
      // calculate the time since the last frame
      var thisFrame = new Date().getTime();
      var dt = (thisFrame - this.lastFrame)/1000;
      this.lastFrame = thisFrame;
      
      this.player.update(dt);
      this.handle_collisions();
    },
    handle_collisions: function() {
      this.obstructions.forEach(function(obstruction){
        if(collides(obstruction, this.player)){
          this.player.explode();
        }
      });
      this.enemies.forEach(function(enemy){
        if(collides(enemy, this.player)){
          this.player.explode();
        }
        this.player.projectiles.forEach(function(projectile){
          if(collides(enemy, projectile)){
            enemy.explode();
            projectile.active = false;
          }
        });
      });
    },
    redraw: function(context) {
      //Clear the canvas
      context.clearRect(0, 0, config.game_width, config.game_height);
      
      //Draw all of the game's objects
      this.player.draw(context);
    }
  }
  
  return Conveyance;
  
});
