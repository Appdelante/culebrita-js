console.log("Hola, este log viene del archivo culebrita.js");

let juegoCanvas = document.getElementById("juegoCanvas");
let ctx = juegoCanvas.getContext("2d");

ctx.beginPath();
ctx.fillStyle = "red";
ctx.fillRect(-50, 30, 100, 100);
ctx.stroke();

ctx.font = "40px Arial";
ctx.fillStyle = "black";
ctx.fillText("Culebrita!", 200, 220);

ctx.beginPath();
ctx.fillStyle = "blue";
ctx.ellipse(300, 300, 50, 100, 0, 0, 2 * Math.PI);
ctx.fill();
ctx.stroke();
