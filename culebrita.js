let juegoCanvas = document.getElementById("juegoCanvas");
let ctx = juegoCanvas.getContext("2d");

let culebra = [
  { posX: 60, posY: 40 },
  { posX: 60, posY: 20 },
  { posX: 40, posY: 20 },
  { posX: 20, posY: 20 },
];

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

function dibujarCulebra(context, culebra) {
  for (let i = 0; i < culebra.length; i++) {
    context.beginPath();
    context.fillStyle = "black";
    context.fillRect(culebra[i].posX, culebra[i].posY, 20, 20);
    context.stroke();
  }
}

dibujarCuadricula(ctx);
dibujarCulebra(ctx, culebra);

document.addEventListener("keydown", function (e) {
  if (e.code === "ArrowUp") {
    culebra.posY -= 20;
  } else if (e.code === "ArrowDown") {
    culebra.posY += 20;
  } else if (e.code === "ArrowLeft") {
    culebra.posX -= 20;
  } else if (e.code === "ArrowRight") {
    culebra.posX += 20;
  } else {
    return;
  }

  ctx.clearRect(0, 0, 600, 600);
  dibujarCuadricula(ctx);
  dibujarCulebra(ctx, culebra);
});
