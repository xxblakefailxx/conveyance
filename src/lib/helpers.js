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
    draw_x: function(x, y, width, height) {
      return x;
    },
    draw_y: function(x, y, width, height) {
      return y - height;
    },
    update_with_dt: function(object){
      object.update(this);
    },
    filter_active: function(object) {
      return object.active
    },
    collides: function(a, b) {
      return a.draw_x < b.draw_x + b.width &&
             a.draw_x + a.width > b.draw_x &&
             a.draw_y < b.draw_y + b.height &&
             a.draw_y + a.height > b.draw_y;
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

