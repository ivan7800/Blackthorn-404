# Estado del arte de Blackthorn 404

## Inventario comprobado en `js/data.js`

- 108 salas: 35 en 2026, 10 en 1349 y 9 en cada una de 1198 BCE, 395 CE, 1587, 1790, 1917, 1956 y 1987.
- 51 tipos de enemigo en ocho familias y nueve jefes con perfiles de tres fases.
- 42 identificadores de decoración y 174 interacciones de sala.
- Nueve protagonistas por época, incluidos Elena en la mansión y el final.

## Recursos nuevos

- `protagonists.png`: nueve figuras, una por protagonista.
- `enemy-families.png`: nueve figuras originales, asignadas a ocho familias.
- `bosses.png`: nueve siluetas, una por jefe.
- `eras-ancient.png`, `eras-modern.png`, `eras-final.png`: doce composiciones de fondo, repartidas por época, contexto y zona.
- `scene_manor_detail.png`: vestíbulo de la mansión.

Recursos generados expresamente para este proyecto mediante una herramienta de generación de imágenes. No se han extraído de juegos comerciales. El renderer usa los atlas locales y no contacta servicios externos.

## Integración

`js/pixel-art.js` carga las imágenes y selecciona celdas por época, familia y jefe. `js/engine.js` usa el nuevo arte dentro de la campaña, conserva hitboxes y mantiene los métodos anteriores como alternativa durante la carga. `tools/build_bundle.py` incorpora el módulo al bundle. El mapa histórico muestra salas descubiertas y conexiones conocidas. La PWA precarga los recursos.

La revisión posterior corrigió la clave `395 CE`, limitó los fondos especiales de archivo y jardín a la mansión, fijó las posiciones del mapa histórico para que no salten al cambiar de sala e integró el efecto de combate en el motor. Se eliminó el script que sobrescribía `drawPlayer`; el golpe cuerpo a cuerpo se señala en el rectángulo de colisión real. La señal circular de cuerpo a cuerpo de los enemigos usa el alcance de 25 unidades del motor. El jefe de fase tres permanece visible durante el aviso de ataque. La opción de movimiento reducido detiene la oscilación del atlas. Los 42 identificadores de decoración tienen piezas de arquitectura; esto no garantiza que las 108 composiciones sean visualmente únicas.

## Cobertura y límites reales

| Elemento | Cobertura implementada | Comprobación pendiente |
| --- | --- | --- |
| Protagonistas | 9/9 siluetas estáticas | Movimiento y ataques dibujados fotograma a fotograma |
| Familias enemigas | 8/8 bases distintas | Variantes individuales de los 51 tipos |
| Jefes | 9/9 siluetas distintas | Animaciones únicas de cada fase y ataque |
| Fondos | 12 composiciones y vestíbulo, elegidos para las épocas | Composición individual de las 108 salas |
| Mapa | Mansión anterior y plano histórico estable con salas y conexiones descubiertas | Inspección visual de cada capítulo |
| UI | Portada y efectos atenuados | Rediseño minucioso de todos los diálogos y móviles |
| PWA | Recursos incluidos en caché | Prueba real sin conexión |

El bob, desplazamiento y flash de sprites son efectos de runtime; **no constituyen ciclos de animación originales**. No declarar esta fase como conversión completa ni publicar como lanzamiento final hasta pasar QA visual en navegador y completar las celdas anteriores.

Los gates estáticos y de balance verifican integridad de código, recursos y datos; no equivalen a la revisión visual de las 108 salas, los nueve jefes o los tres formatos de pantalla. La comprobación visual en navegador de la rama sigue pendiente.
