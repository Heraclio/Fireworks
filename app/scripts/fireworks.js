(function(){

  var canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 400;
  document.body.appendChild(canvas);

  var context = canvas.getContext('2d');
  var position = {
    x: 20,
    y: 100
  };

  var velocity = {
    x: 1,
    y: -1
  };

  var gravity = 0.25;

  setInterval(function(){
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    position.x += velocity.x;
    position.y += velocity.y;

    velocity.y += gravity;

    context.fillStyle = "white";
    context.fillRect(position.x, position.y, 2, 2);
  }, 30);

  function grid(){

  }


})();
