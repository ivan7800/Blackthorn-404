# Blackthorn 404 — Dirección visual y prueba de estilo

## Decisión artística
Dirección propuesta: **grabado gótico en pixel art de 16 bits**. Debe sentirse como una aventura oscura y legible, con siluetas recortadas, agrupación deliberada de píxeles, planos de profundidad, luces cálidas escasas y una paleta limitada por escena. Evitar que “pixel art” signifique solamente usar rectángulos de colores o un filtro.

## Ejemplos de diseño

### Elena Voss — protagonista
- Silueta reconocible a 16–24 px de alto: abrigo de conservadora largo, cuello alto, pelo recogido, bandolera de herramientas y linterna.
- Paleta de 5 tonos: carbón, pizarra, cuero, piel desaturada y un acento granate. La linterna añade una luz ámbar local.
- Animación base: respiración, 4–6 fotogramas de caminar por dirección, anticipación y recuperación diferenciadas en ataques, guardia/parry, esquiva, daño y uso de sigilo.
- Mantener hitbox actual: el arte puede superar la colisión visual, no alterar el combate.

### Criaturas
- **Hollow Drifter:** cuerpo humano deshilachado, hombros asimétricos, una mano demasiado larga; silueta de carbón con costuras de luz ceniza.
- **Pale Listener:** figura muy estrecha, cabeza inclinada hacia el sonido; ojos casi ausentes. Reacciona a audio/ruido mediante postura y pulsos.
- **Wall Witness:** parece salir del muro; mitad de cuerpo en piedra, cara fragmentada, animación de aparición por bloques.
- Las familias conservan la lectura cromática actual, pero comparten contorno, resolución y sombras.

### Jefe ejemplo — The Bell Without a Tongue
- Sotana ceremonial y campana rota integrada como tórax; cuerda de campana como brazo/arma.
- Tres estados legibles: reposo (campana opaca), preparación (grietas ámbar), ataque (onda en anillos pixelados y apertura para castigo).
- En sus fases posteriores, los píxeles y la arquitectura pierden alineación gradualmente, sin ocultar el telegraph.

## Arquitectura y salas
- Escena 320×180 como viewport de juego, composición en capas: silueta lejana, arquitectura media, objetos interactuables y suelo de combate.
- Mantener obstáculos y colisiones existentes, sustituyendo las cajas genéricas por piezas visuales alineadas a sus geometrías.
- Mansión: arcos apuntados, molduras, retratos incompletos, lámparas de aceite; piedra carbón, madera ciruela y ámbar.
- Priory 1349: nave estrecha, vitrales casi apagados, bancos, campanario visible; piedra azul gris y cera oxidada.
- Salt City: terrazas y observatorio, horizonte ocre, sal turquesa, estelas astrales.
- 1917: hospital de campaña, vigas, barro, lona y lámpara verde enfermiza.
- 1956: sala de radio, racks de válvulas, medidores luminosos cian y paneles de madera oscura.
- 1987: obra de restauración, andamios, cámara VHS, plásticos y cableado.
- Pale Interval: perspectiva imposible de la mansión, contornos violetas rotos y vacío sin niebla que tape amenazas.

## Mapeado
Mapa por capítulo construido a mano, no procedural: un grafo de habitaciones con ruta principal, bucles de retorno, salas opcionales y atajos desbloqueables. La navegación visual debe reflejar puertas, escaleras y conexiones reales; el mapa del jugador distingue explorado, visible y secreto sin revelar lo oculto antes de descubrirlo. El layout no cambia; se mejora su representación y se documentan conexiones reales.
- Leyenda: sala actual, salida cerrada/abierta, Anchor, evidencia, boss, sala segura.
- Mapas de campaña se diseñan como planos arquitectónicos dibujados a mano con rutas legibles, no cuadrículas aleatorias.
- Primera muestra: vestíbulo de Blackthorn + ala de archivo con bucle y una sala lateral de evidencia.

## UI
- Mantener navegación, legibilidad, accesibilidad, tamaño mínimo táctil y opciones ya existentes.
- Piel gótica pixelada: marcos inspirados en placas de latón y madera; tipografía de lectura cómoda para el texto; bitmap solo para rótulos o cifras breves.
- Evitar scanlines/grano excesivo, porque ensucian los píxeles y reducen contraste.
- Colores de estado con contraste suficiente; el terror puede afectar el mundo pero no volver ilegibles los menús.

## Muestra de implementación
Crear un prototipo artístico aislado de la campaña actual en `art-direction/`: HTML autónomo y arte Canvas procedural local, sin dependencias externas, con selector de escenas para comparar mansión, priory, ciudad de sal, hospital, radio y Pale Interval; ficha de personajes; vista de un mapa diseñado; panel breve de principios y paleta. El prototipo debe mostrar claramente pixel clusters, capas de arquitectura, Elena, una criatura y el jefe. Es una herramienta de decisión de arte, no una modificación del juego publicado.