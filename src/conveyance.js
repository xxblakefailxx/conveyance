define(['models/player', 'models/obstacle', 'levels/level1', 'config'], function(Player, Obstacle, level1, config) {
  var Conveyance = function() {
    //init
    this.player = new Player(config.player_name);
    this.enemies = [];
    this.obstacles = level1.obstacles.map(function(obs){return new Obstacle(obs);})
    
    window.onkeydown = function() {
      this.player.jump();
    }.bind(this);
  }
  
  Conveyance.prototype = {
    run: function() {
      if(this.player.active){
        this.update();
        this.redraw(config.canvas.getContext('2d'));
        // start the mainloop
        requestAnimationFrame( this.run.bind(this), config.canvas );
      }
      else {
        //Start over?
        alert('lose!');
      }
    },
    update: function() {
      this.handle_collisions();
      // calculate the time since the last frame
      var thisFrame = new Date().getTime();
      var dt = (thisFrame - this.lastFrame)/1000;
      if(!dt){dt = 0;}
      this.lastFrame = thisFrame;
      
      this.player.update(dt);
      this.obstacles.forEach(function(obstacle){
        obstacle.update(dt);
      });
      this.obstacles = this.obstacles.filter(function(obstacle) {
        return obstacle.active;
      });
    },
    handle_collisions: function() {
      function collides(a, b) {
        return a.position.x < b.position.x + b.width &&
               a.position.x + a.width > b.position.x &&
               a.position.y < b.position.y + b.height &&
               a.position.y + a.height > b.position.y;
      }
      this.obstacles.forEach(function(obstacle){
        if(collides(obstacle, this.player)){
          this.player.explode();
        }
      }.bind(this));

    },
    redraw: function(context) {
      //Clear the canvas
      context.clearRect(0, 0, config.game_width, config.game_height);
      
      context.fillStyle = '#000';
      //Draw the floor
      context.fillRect(0, 400, config.game_width, 80);
      
      //Draw all of the game's objects
      this.player.draw(context);
      this.obstacles.forEach(function(obstacle){
        obstacle.draw(context);
      });
      
    }
  }
  
  return Conveyance;
  
});
