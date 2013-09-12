define(['models/player', 'models/obstacle', 'models/enemy', 'levels/level1', 'lib/helpers', 'config'],
function(Player, Obstacle, Enemy, level1, helpers, config) {
  var Conveyance = function() {
    //init
    this.player = new Player(config.player_name);
    this.enemies = [];
    this.obstacles = level1.obstacles.map(function(obs){return new Obstacle(obs, config.base_speed);})
    this.enemies = level1.enemies.map(function(ene){return new Enemy(ene, config.base_speed);})

    window.onkeydown = helpers.key_press.bind(this);
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
      // calculate the time since the last frame
      var thisFrame = new Date().getTime();
      var dt = (thisFrame - this.lastFrame)/1000;
      if(!dt){dt = 0;}
      this.lastFrame = thisFrame;
      
      this.handle_collisions();
      
      //Update all of the game's objects
      this.player.update(dt);
      this.enemies.forEach(helpers.update_with_dt.bind(dt));
      this.obstacles.forEach(helpers.update_with_dt.bind(dt));
      
      //Filter objects that are no longer active
      this.obstacles = this.obstacles.filter(helpers.filter_active);
      this.enemies = this.enemies.filter(helpers.filter_active);
    },
    handle_collisions: function() {
      
      this.obstacles.forEach(function(obstacle){
        //obstacle, player
        helpers.explode_first_on_collide(this.player, obstacle);
        
        //obstacle, player projectiles
        this.player.projectiles.forEach(function(projectile){
          helpers.explode_first_on_collide(projectile, obstacle);
        });
      }.bind(this));
      
      this.enemies.forEach(function(enemy){
        //enemy, player
        helpers.explode_first_on_collide(this.player, enemy);
        
        this.player.projectiles.forEach(function(projectile){
          helpers.explode_both_on_collide(enemy, projectile);
        });
        
        enemy.projectiles.forEach(function(projectile){
          //player, enemy projectile
          helpers.explode_both_on_collide(this.player, projectile);
          
          this.obstacles.forEach(function(obstacle){
            //obstacle, enemy projectile
            helpers.explode_first_on_collide(projectile, obstacle);
          });
        }.bind(this));
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
      this.obstacles.forEach(helpers.draw_with_context.bind(context));
      this.enemies.forEach(helpers.draw_with_context.bind(context));
      
    }
  }
  
  return Conveyance;
  
});
