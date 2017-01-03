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
      firework.particle.update().draw();
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

  Particle.prototype.update = function(){
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.y += particles.settings.gravity;
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
  }

  Firework.prototype.end = function(){
    console.log(this);
    this.exploded = true;
  };

  Firework.prototype.explode = function(){
    var position = this.particle.position;
    var length = this.particles.length;
    var end = this.end;

    this.particles.filter(function(particle){
      if(particle){
        return particle.life >= 100;
      }
    }).map(function(particle, index){
      console.log(particle);
    });

    // TODO: SOME BUG HERE WITH THE PARTICLES BEING EMITTED.
    this.particles.map(function(particle, index){
      if(!particle){
        var randomVelocity = 4 + Math.random() * 4;
        var angle = index * ((Math.PI * 2) / length);
        particle = new Particle();
        particle.position = position;
        particle.velocity = {
          x: Math.cos(angle) * randomVelocity,
          y: Math.sin(angle) * randomVelocity
        };
      }
      particle.update().draw();
      particle.life++;

      return particle;
    });
  }

})();
