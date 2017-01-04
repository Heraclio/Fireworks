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
      gravity: 0.5,
      lifetime: 100
    }
  };

  var fireworks = [];

  setInterval(function(){
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var frequency = 1.25;
    var determinant = Math.floor(Math.round((Number.prototype.randomBetween(0, 1) * 10) / frequency) / 10);

    if(determinant > 0){
      var firework = new Firework();
      fireworks.push(firework);
    }

    fireworks.filter(function(firework){
      return firework.particle.velocity.y >= 0;
    }).map(function(firework, index){
      if(firework.exploded) {
        fireworks.splice(index, 1);
      } else {
        firework.explode();
      }
    });

    fireworks.filter(function(firework){
      return firework.particle.velocity.y < 0;
    }).map(function(firework, index){
      firework.particle.update(0.5).draw();
    });

    context.fillStyle = "magenta";
    context.fillRect(0,0, particles.settings.bounds.left, canvas.height);
    context.fillRect(particles.settings.bounds.right,0, canvas.width, canvas.height);
    context.fillRect(0, particles.settings.bounds.bottom, canvas.width, canvas.height);

  }, 30);

  function Particle(){
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

  Particle.prototype.update = function(gravity){
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;


    this.velocity.y += gravity;
    this.life++;

    return this;
  }

  Particle.prototype.draw = function(){
    context.clearRect(particles.settings.bounds.left, particles.settings.bounds.bottom, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.fillRect(this.position.x, this.position.y, 2, 2);
  }

  function Firework(){
    var count = Math.round(Number.prototype.randomBetween(5, 10) * 1) / 1;
    this.particles = Array.apply(null, Array(count));
    this.particle = new Particle();
    this.particle.position = {
        x: Math.round(Number.prototype.randomBetween(0, canvas.width) * 100) / 100,
        y: canvas.height
    };
    this.particle.velocity = {
      x: Number.prototype.randomBetween(-2.5, 2.5),
      y: Number.prototype.randomBetween(-12.5, -20)
    };
    this.explosion = {
      lifetime: 50
    };
  }

  Firework.prototype.end = function(){
    this.exploded = true;
  };

  Firework.prototype.explode = function(){
    var end = this.end;
    var lifetime = this.explosion.lifetime;

    this.particles.filter(function(particle){
      return particle != undefined;
    }).filter(function(particle){
        return particle.life >= lifetime;
    }).map(function(particle, index){
      end();
    });

    var update = this.particles.filter(function(particle){
      return particle != undefined;
    }).filter(function(particle){
        return particle.life < lifetime;
    }).map(function(particle, index){
      particle.update(0.05).draw();
      return particle;
    });

    var position = this.particle.position;
    var length = this.particles.length;

    var initialize = this.particles.filter(function(particle){
      return particle == undefined;
    }).map(function(initial, index){
      var randomVelocity = 5 + Math.random() * 5;
      var angle = index * ((Math.PI * 2) / length);

      var particle = new Particle();
      particle.position = position;

      //TODO: Velocity needs to be initialized at the position of the explosion, and the propel outward.
      //TODO: Revisit calculations.
      
      particle.velocity = {
        // Number.prototype.randomBetween(-2.5, 2.5)
        // x: Math.sin(angle) * randomVelocity,
        // y: Math.cos(angle) * randomVelocity
        x: Math.sin(angle) * randomVelocity,
        y: Math.cos(angle) * randomVelocity
      };

      return particle;
    });

    if(update.length > 0){
      this.particles = update;
    } else {
      this.particles = initialize;
    }

  }

})();
