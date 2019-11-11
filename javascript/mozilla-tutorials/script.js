var canvas = document.querySelector("#myCanvas");
var ctx = canvas.getContext("2d");

console.log(ctx);

function draw() {
  ctx.beginPath();
  ctx.arc(50, 50, 10, 0, 2 * Math.PI);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// call setInterval every 10 ms
setInterval(draw, 10);
