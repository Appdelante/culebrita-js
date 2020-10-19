let DIRECCIONES = {
  ARRIBA: 1,
  ABAJO: 2,
  IZQUIERDA: 3,
  DERECHA: 4,
};

let FPS = 1000 / 15;

let juegoCanvas = document.getElementById("juegoCanvas");
let ctx = juegoCanvas.getContext("2d");

let culebra = [
  { posX: 60, posY: 20 },
  { posX: 40, posY: 20 },
  { posX: 20, posY: 20 },
];

let direccionActual = DIRECCIONES.DERECHA;
let nuevaDireccion = DIRECCIONES.DERECHA;

let ciclo;

function moverCulebra(direccion, culebra) {
  let cabezaPosX = culebra[0].posX;
  let cabezaPosY = culebra[0].posY;

  if (direccion === DIRECCIONES.DERECHA) {
    cabezaPosX += 20;
  } else if (direccion === DIRECCIONES.IZQUIERDA) {
    cabezaPosX -= 20;
  } else if (direccion === DIRECCIONES.ABAJO) {
    cabezaPosY += 20;
  } else if (direccion === DIRECCIONES.ARRIBA) {
    cabezaPosY -= 20;
  }

  // Agregamos la nueva cabeza al principio de la lista
  culebra.unshift({ posX: cabezaPosX, posY: cabezaPosY });
  // Borramos la cola de la culebra
  culebra.pop();
}

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
  if (e.code === "ArrowUp" && direccionActual !== DIRECCIONES.ABAJO) {
    nuevaDireccion = DIRECCIONES.ARRIBA;
  } else if (e.code === "ArrowDown" && direccionActual !== DIRECCIONES.ARRIBA) {
    nuevaDireccion = DIRECCIONES.ABAJO;
  } else if (
    e.code === "ArrowLeft" &&
    direccionActual !== DIRECCIONES.DERECHA
  ) {
    nuevaDireccion = DIRECCIONES.IZQUIERDA;
  } else if (
    e.code === "ArrowRight" &&
    direccionActual !== DIRECCIONES.IZQUIERDA
  ) {
    nuevaDireccion = DIRECCIONES.DERECHA;
  }
});

function cicloDeJuego() {
  moverCulebra(nuevaDireccion, culebra);
  direccionActual = nuevaDireccion;

  ctx.clearRect(0, 0, 600, 600);
  dibujarCuadricula(ctx);
  dibujarCulebra(ctx, culebra);
}

juegoCanvas.addEventListener("click", function () {
  if (ciclo === undefined) {
    ciclo = setInterval(cicloDeJuego, FPS);
  }
});
