console.log("Hola, este log viene del archivo culebrita.js");

let juegoCanvas = document.getElementById("juegoCanvas");
let ctx = juegoCanvas.getContext("2d");

for (let x = 20; x < 600; x += 20) {
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.moveTo(x, 0);
  ctx.lineTo(x, 600);
  ctx.stroke();
}

for (let y = 20; y < 600; y += 20) {
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.moveTo(0, y);
  ctx.lineTo(600, y);
  ctx.stroke();
}

ctx.beginPath();
ctx.fillStyle = "black";
ctx.fillRect(20, 0, 20, 20);
ctx.stroke();
