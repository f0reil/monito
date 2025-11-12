const monito = document.getElementById('monito');
const dialogo = document.getElementById('dialogo');
const texto = document.getElementById('texto');

let corriendo = true;
let posicion = 0;
let direccion = 1;

// Configuración del spritesheet
const fps = 8;
const sheetCols = 10;
const sheetRows = 3;
const frameWidth = 203;
const frameHeight = 289;

// Frames de correr (última fila, columnas 0,1,2)
const runFrames = [
  {col: 0, row: 2},
  {col: 1, row: 2},
  {col: 2, row: 2}
];
let frameActual = 0;
let limiteDerecho = window.innerWidth - frameWidth;

// Función para mover el monito
function moverMonito() {
  if (!corriendo) return;

  posicion += 8 * direccion;

  if (posicion > limiteDerecho || posicion < 0) {
    direccion *= -1;
    monito.style.transform = `scaleX(${-direccion})`;
  }

  monito.style.left = posicion + 'px';
  requestAnimationFrame(moverMonito);
}

// Animación de sprites
function animarMonito() {
  if (!corriendo) return;

  const frame = runFrames[frameActual];
  const offsetX = -frame.col * frameWidth;
  const offsetY = -frame.row * frameHeight;

  monito.style.backgroundPosition = `${offsetX}px ${offsetY}px`;

  frameActual = (frameActual + 1) % runFrames.length;
  setTimeout(animarMonito, 1000 / fps);
}

// Evento clic para mostrar diálogo
monito.addEventListener('click', () => {
  if (!corriendo) return; // evitar múltiples clicks
  corriendo = false;

  // Cambiar sprite al primero del sheet (fila 0, columna 0)
  monito.style.backgroundPosition = `0px 0px`;

  // Mostrar diálogo
  dialogo.style.opacity = 1;

  const frases = [
    "¡AH, un feo!",
    "¡Qué susto!",
    "Ah, pero si eres tú...",
    "Uhm...",
    "He escuchado que andas algo down...",
    "y ahora me tienen aquí encerrado dando vueltas...",
    "como si fuera gracioso >:(",
    "supongo que la jefa pensó que lo seria...", 
    "al menos para alguien más...",
    "Cruel, ¿no crees?",
    "¿o acaso te estas divirtiendo, UH?", 
    "...",
    "...",
    "Me dejaron un mensaje para ti...",
    " [Ánimo <3]",
    "o una cursilada asi...", 
    "BUENO",
    "Creo que van a hacer reformas por aquí...",
    "y yo tengo que encontrar la manera de salir de aquí...",
    " ¡NOS VEMOS!"

  ];

  let i = 0;

  function escribirFrase() {
    if (i >= frases.length) {
      // Termina el diálogo
      dialogo.style.opacity = 0;
      frameActual = 0;
      corriendo = true;
      moverMonito();
      animarMonito();
      return;
    }

    texto.textContent = "";
    let j = 0;
    const intervalo = setInterval(() => {
      texto.textContent += frases[i][j];
      j++;
      if (j >= frases[i].length) {
        clearInterval(intervalo);
        i++;
        setTimeout(escribirFrase, 1200); // tiempo antes de la siguiente frase
      }
    }, 50);
  }

  escribirFrase();
});

// Ajuste al redimensionar ventana
window.addEventListener('resize', () => {
  limiteDerecho = window.innerWidth - frameWidth;
});

monito.style.transform = 'scaleX(-1)';
// Inicializar animación y movimiento
moverMonito();
animarMonito();
