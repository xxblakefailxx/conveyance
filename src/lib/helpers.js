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
    update_with_dt: function(object){
      object.update(this);
    },
    filter_active: function(object) {
      return object.active
    },
    collides: function(a, b) {
      return a.position.x < b.position.x + b.width &&
             a.position.x + a.width > b.position.x &&
             a.position.y > b.position.y - b.height &&
             a.position.y - a.height < b.position.y;
    },
    draw_with_context: function(object){
      object.draw(this);
    },
  };
})

