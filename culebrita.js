let juegoCanvas = document.getElementById("juegoCanvas");
let ctx = juegoCanvas.getContext("2d");

function dibujarCuadricula(context) {
  for (let x = 20; x < 600; x += 20) {
    context.beginPath();
    context.fillStyle = "black";
    context.moveTo(x, 0);
    context.lineTo(x, 600);
    context.stroke();
  }

  for (let y = 20; y < 600; y += 20) {
    context.beginPath();
    context.fillStyle = "black";
    context.moveTo(0, y);
    context.lineTo(600, y);
    context.stroke();
  }
}

function dibujarCulebra(context, posX, posY) {
  context.beginPath();
  context.fillStyle = "black";
  context.fillRect(posX, posY, 20, 20);
  context.stroke();
}

dibujarCuadricula(ctx);

dibujarCulebra(ctx, 0, 0);
dibujarCulebra(ctx, 0, 20);
dibujarCulebra(ctx, 0, 40);
