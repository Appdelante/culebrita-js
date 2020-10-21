/** Constantes **/

let DIRECCIONES = {
  ARRIBA: 1,
  ABAJO: 2,
  IZQUIERDA: 3,
  DERECHA: 4,
};

let FPS = 1000 / 15;

let JUEGO_CANVAS = document.getElementById("juegoCanvas");
let CTX = JUEGO_CANVAS.getContext("2d");

/** Estado del juego **/

let culebra = [
  { posX: 60, posY: 20 },
  { posX: 40, posY: 20 },
  { posX: 20, posY: 20 },
];

let direccionActual = DIRECCIONES.DERECHA;
let nuevaDireccion = DIRECCIONES.DERECHA;

let comida = generarNuevaPosicionDeComida(culebra);

let ciclo;

/** Dibujar **/

function rellenarCuadrado(context, posX, posY) {
  context.beginPath();
  context.fillStyle = "black";
  context.fillRect(posX, posY, 20, 20);
  context.stroke();
}

function dibujarCulebra(context, culebra) {
  for (let i = 0; i < culebra.length; i++) {
    rellenarCuadrado(context, culebra[i].posX, culebra[i].posY);
  }
}

function dibujarComida(context, comida) {
  rellenarCuadrado(context, comida.posX, comida.posY);
}

function dibujarParedes(context) {
  context.beginPath();
  context.lineWidth = "2";
  context.rect(20, 20, 560, 560);
  context.stroke();
}

/** Culebra **/

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
  return culebra.pop(); // { posX, posY }
}

function culebraComioComida(culebra, comida) {
  return culebra[0].posX === comida.posX && culebra[0].posY === comida.posY;
}

/** Comida **/

function generarNuevaPosicionDeComida(culebra) {
  while (true) {
    // 0 <= Math.random() < 1
    let columnaX = Math.max(Math.floor(Math.random() * 29), 1);
    let columnaY = Math.max(Math.floor(Math.random() * 29), 1);

    let posX = columnaX * 20;
    let posY = columnaY * 20;

    let colisionConCulebra = false;
    for (let i = 0; i < culebra.length; i++) {
      if (culebra[i].posX === posX && culebra[i].posY === posY) {
        colisionConCulebra = true;
        break;
      }
    }

    if (colisionConCulebra === true) {
      continue;
    }

    return { posX: posX, posY: posY };
  }
}

/** Colisiones **/

function ocurrioColision(culebra) {
  let cabeza = culebra[0];

  if (
    cabeza.posX < 20 ||
    cabeza.posY < 20 ||
    cabeza.posX >= 580 ||
    cabeza.posY >= 580
  ) {
    return true;
  }

  return false;
}

/** Ciclo de Juego **/

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
  let colaDescartada = moverCulebra(nuevaDireccion, culebra);
  direccionActual = nuevaDireccion;

  if (culebraComioComida(culebra, comida)) {
    culebra.push(colaDescartada);
    comida = generarNuevaPosicionDeComida(culebra);
  }

  if (ocurrioColision(culebra)) {
    clearInterval(ciclo);
    return;
  }

  CTX.clearRect(0, 0, 600, 600);
  dibujarParedes(CTX);
  dibujarCulebra(CTX, culebra);
  dibujarComida(CTX, comida);
}

dibujarParedes(CTX);
dibujarCulebra(CTX, culebra);
dibujarComida(CTX, comida);

JUEGO_CANVAS.addEventListener("click", function () {
  if (ciclo === undefined) {
    ciclo = setInterval(cicloDeJuego, FPS);
  }
});
