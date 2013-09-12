define(function(){
  return {
    key_press: function(e) {
      switch(e.which) {
        //f
        case 70:
          this.player.fire();
          break;
        //space
        case 32:
          this.player.jump();
          break;
      }
    },
    draw_position: function(position, width, height) {
      return {
        x: position.x,
        y: position.y - height
      }
    },
    update_with_dt: function(object){
      object.update(this);
    },
    filter_active: function(object) {
      return object.active
    },
    collides: function(a, b) {
      return a.draw_position.x < b.draw_position.x + b.width &&
             a.draw_position.x + a.width > b.draw_position.x &&
             a.draw_position.y < b.draw_position.y + b.height &&
             a.draw_position.y + a.height > b.draw_position.y;
    },
    draw_with_context: function(object){
      object.draw(this);
    },
    explode_first_on_collide: function(first, second) {
      if(this.collides(first, second)){
        first.explode();
      }
    },
    explode_both_on_collide: function(first, second) {
      if(this.collides(first, second)){
        first.explode();
        second.explode();
      }
    }
  };
})

