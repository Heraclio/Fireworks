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

    context.fillStyle = "magenta";
    context.fillRect(0,0, particles.settings.bounds.left, canvas.height);
    context.fillRect(particles.settings.bounds.right,0, canvas.width, canvas.height);
    context.fillRect(0, particles.settings.bounds.bottom, canvas.width, canvas.height);

    var determinant = Math.floor(Math.round(Number.prototype.randomBetween(0, 1) * 10) / 10);

    if(determinant > 0){
      var firework = new Firework();
      fireworks.push(firework);
    }

    fireworks.map(function(firework){
      if(firework.particle.life < firework.lifespan){
        firework.particle.draw();
      }
    });
  }, 30);

  function Particle(){
    this.position = {
      x: particles.settings.starting.x,
      y: particles.settings.starting.y
    };

    this.velocity = {
      x: 0,
      y: 0
    };

    this.life = 0;
  }

  Particle.prototype.draw = function(){
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.y += particles.settings.gravity;
    this.life++;

    context.clearRect(particles.settings.bounds.left, particles.settings.bounds.bottom, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.fillRect(this.position.x, this.position.y, 2, 2);
  }

  function Firework(){
    this.collection = [];
    this.lifespan = 25;

    this.particle = new Particle();

    var position = {
        x: Math.round(Number.prototype.randomBetween(0, canvas.width) * 100) / 100
    };

    this.particle.position.x = position.x;
    this.particle.position.y = canvas.height;

    var velocity = {
      x: -1
    };
    this.particle.velocity.x = velocity.x;

    var randomize = Math.round(Math.random() * 10) / 10;
    velocity.y = (randomize * -20) < -11 ? randomize * -20 : randomize;
    this.particle.velocity.y = velocity.y;
  }

})();
