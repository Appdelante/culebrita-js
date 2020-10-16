let juegoCanvas = document.getElementById("juegoCanvas");
let ctx = juegoCanvas.getContext("2d");

let culebraPosX = 0;
let culebraPosY = 0;

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
dibujarCulebra(ctx, culebraPosX, culebraPosY);

document.addEventListener("keydown", function (e) {
  if (e.code === "ArrowUp") {
    culebraPosY -= 20;
  } else if (e.code === "ArrowDown") {
    culebraPosY += 20;
  } else if (e.code === "ArrowLeft") {
    culebraPosX -= 20;
  } else if (e.code === "ArrowRight") {
    culebraPosX += 20;
  } else {
    return;
  }

  ctx.clearRect(0, 0, 600, 600);
  dibujarCuadricula(ctx);
  dibujarCulebra(ctx, culebraPosX, culebraPosY);
});
