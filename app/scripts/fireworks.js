(function(){

  var canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 400;
  document.body.appendChild(canvas);
  var context = canvas.getContext('2d');

  Number.prototype.randomBetween = function(min, max){
    return  min + (Math.random() * ((max - min) + 1));
  }

  var particles = {
    settings: {
      bounds: {
        bottom: canvas.height - 2.5,
        left: 2.5,
        right: canvas.width - 2.5
      },
      density: 20,
      size: 10,
      starting: {
        x: 20,
        y: 20
      },
      lifetime: 100
    }
  };

  var fireworks = [], counter = 0, limit = 2;
  setInterval(function(){
    context.clearRect(particles.settings.bounds.left, particles.settings.bounds.bottom, canvas.width, canvas.height);
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var frequency = 1.25;
    var determinant = Math.floor(Math.round((Number.prototype.randomBetween(0, 1) * 10) / frequency) / 10);

    if(counter < limit){
      var firework = new Firework();
      fireworks.push(firework);
      counter++;
    }

//    if(determinant > 0){
//      var firework = new Firework();
//      fireworks.push(firework);
//    }

//    fireworks.filter(function(firework){
//      return firework.particle.velocity.y >= 0 && !firework.exploded;
//    }).map(function(firework, index){
//      //fireworks.splice(index, 1);
//      firework.explode();
//    });

    //.filter(function(firework){
    //  return firework.particle.velocity.y < 0;
    //})

    fireworks.map(function(firework, index){
      firework.particle.draw();
      firework.particle.update();
    });

//    fireworks.filter(function(firework){
//      return firework.particles;
//    }).map(function(firework, index){
//      firework.particles.map(function(particle){
//        console.log(particle.velocity);
//        particle.update();
//        particle.draw();
//      });
//    });

    context.fillStyle = "magenta";
    context.fillRect(0,0, particles.settings.bounds.left, canvas.height);
    context.fillRect(particles.settings.bounds.right,0, canvas.width, canvas.height);
    context.fillRect(0, particles.settings.bounds.bottom, canvas.width, canvas.height);

  }, 30);

  function Particle(){
    this.resistance = 1;

    this.position = {
      x: 0,
      y: 0
    };

    this.velocity = {
      x: 0,
      y: 0
    };
    this.life = 0;
  }

  Particle.prototype.update = function(){
    /*
    this.velocity.x *= this.resistance;
    this.velocity.y *= this.resistance;

    this.velocity.y += this.gravity || 0;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    */
    this.speed *= this.friction || 0;

//    this.position.x += Math.cos(this.angle) * this.speed;
//    this.position.y -= Math.sin(this.angle) * this.speed - this.gravity;

//    this.position.x += Math.cos(Number.prototype.randomBetween(Math.PI / 2, Math.PI / 2)) * this.speed;
//    this.position.y -= Math.sin(Number.prototype.randomBetween(Math.PI / 2, Math.PI / 2)) * this.speed - this.gravity;

    this.position.x += Math.cos(Number.prototype.randomBetween(Math.PI / 2, Math.PI / 2)) * this.speed;
    this.position.y -= this.speed - this.gravity;
//    this.position.y -= Math.sin(Number.prototype.randomBetween(Math.PI / 2, Math.PI / 2)) * this.speed - this.gravity;

    this.life++;

    return this;
  }

  Particle.prototype.draw = function(){
    //context.clearRect(particles.settings.bounds.left, particles.settings.bounds.bottom, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.fillRect(this.position.x, this.position.y, 2, 2);
  }

  function Firework(){
//    this.particle.angle = Math.atan2(Math.sin(angle * Math.PI/180.0), Math.cos(angle * Math.PI/180.0)) * 180.0/Math.PI;
//    this.particle.angle = Math.PI / 2;
    //Math.round(Number.prototype.randomBetween(0, Math.PI * 2) * 1) / 1;

    this.particle = new Particle();
//    this.particle.speed = Number.prototype.randomBetween(75,150);
    this.particle.speed = Number.prototype.randomBetween(10,50);
    this.particle.friction = 0.8;
    this.particle.gravity = 9.8;
    this.particle.position = {
        x: Math.round(Number.prototype.randomBetween(0, canvas.width) * 100) / 100,
        y: canvas.height - 10
    };

    this.explosion = {
      lifetime: 50
    };
  }

  Firework.prototype.end = function(){

  };

  Firework.prototype.explode = function(){
//    var end = this.end;
//    var position = this.particle.position;
//    var count = Math.round(Number.prototype.randomBetween(10, 20) * 1) / 1;
//    var array = Array.apply(null, Array(count));
//    this.particles = array.map(function(){
//      var angle = Number.prototype.randomBetween(0,Math.PI * 2);
//      var speed = Number.prototype.randomBetween(0,5);
//      var particle = new Particle();
//      particle.position = position;
//      var gravity = 0.2;
//      particle.velocity = {
//        x: Math.cos(angle) * speed,
//        y: Math.sin(angle) * speed + gravity
//      };
//      return particle;
//    });
//    this.exploded = true;
  }
})();

//    var lifetime = this.explosion.lifetime;
//    this.particles.filter(function(particle){
//      return particle != undefined;
//    }).filter(function(particle){
//        return particle.life >= lifetime;
//    }).map(function(particle, index){
//      end();
//    });
//
//    var update = this.particles.filter(function(particle){
//      return particle != undefined;
//    }).filter(function(particle){
//        return particle.life < lifetime;
//    }).map(function(particle, index){
//      particle.update().draw();
//      return particle;
//    });
//
//    var position = this.particle.position;
//    var length = this.particles.length;
//
//    var initialize = this.particles.filter(function(particle){
//      return particle == undefined;
//    }).map(function(initial, index){
//
//    });
//
//    if(update.length > 0){
//      this.particles = update;
//    } else {
//      this.particles = initialize;
//    }
