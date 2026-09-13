# Blackthorn 404: The Unremembered — Release Audit v1.1.1

## 1. Estado inicial

v1.1.0 arrancaba y su campaña/sistemas principales ya estaban ampliamente automatizados. No se localizaron bloqueantes de campaña, combate, guardado, finales o NG+. Sí se localizaron problemas de release en rendimiento, accesibilidad, robustez de datos y limpieza del paquete.

## 2. Arquitectura detectada

Aplicación estática local-first para GitHub Pages/PWA: HTML5 + CSS + JavaScript vanilla, Canvas 2D, Web Audio, localStorage, Service Worker y assets locales. Sin backend, cuentas, telemetría ni dependencias runtime remotas.

## 3. Función principal

Juego narrativo/action dark-fantasy de campaña completa con 108 salas, 9 jefes, combate, Sigils, archivos/lore, tres finales, NG+, guardados locales y soporte móvil/PWA.

## 4. Hallazgos priorizados

| ID | Severidad | Estado | Hallazgo / corrección |
|---|---|---|---|
| REL-001 | ALTA | CORREGIDO | Hero y seis fondos de escena estaban duplicados como Base64 en CSS/JS pese a existir como assets. Se externalizaron y se regeneró el bundle. |
| REL-002 | MEDIA | CORREGIDO | `normalizeSave()` aceptaba IDs arbitrarios de sala/arma/Sigil. Se validan contra catálogos reales y se sanea metadata numérica. |
| REL-003 | MEDIA | CORREGIDO | Viewport usaba `user-scalable=no`. Eliminado para permitir zoom. |
| REL-004 | MEDIA | CORREGIDO | Los 10 diálogos nativos no tenían nombre accesible explícito. Añadidos `aria-label`/`aria-labelledby`. |
| REL-005 | MEDIA | CORREGIDO | El Service Worker precacheaba documentación QA y un asset huérfano. El shell queda limitado a runtime necesario. |
| REL-006 | BAJA | CORREGIDO | Faltaba `.gitignore` y el paquete incluía `__pycache__` y numerosas capturas QA regenerables. Limpiado. |
| REL-007 | BAJA | LIMITACIÓN ACEPTADA | No existe LICENSE. No se añadió una licencia sin decisión explícita del autor. |
| REL-008 | MEDIA | NO VERIFICABLE | El sandbox bloquea navegación Chromium a localhost/file, por lo que no se pudo validar aquí el ciclo real install/activate/offline del SW en un origen HTTPS desplegado. Estructura, rutas, estrategia y pruebas PWA sí pasan. |

## 5. Funciones

| Función | Estado |
|---|---|
| Arranque / navegación / controles | REAL |
| Campaña 108 salas / capítulos | REAL |
| Combate / armas / parry / guard / jefes | REAL |
| 12 Sigils / intensidades / puzzles | REAL |
| Guardado 3 slots / migración schema 12 / backup | REAL |
| Archivo/lore / bestiario / logros | REAL |
| Tres finales | REAL |
| New Game+ | REAL |
| Móvil portrait/landscape / táctil | REAL |
| Audio procedural y ajustes | REAL |
| PWA shell, manifest, SW y cache migration | REAL; activación HTTPS desplegada NO VERIFICABLE en este sandbox |

## 6. Correcciones aplicadas

- v1.1.0 → v1.1.1, manteniendo `SAVE_SCHEMA=12` y compatibilidad de saves.
- Externalización de `title_hero.jpg` y seis `scene_*.png`.
- Endurecimiento de saves corruptos/manipulados.
- Escape defensivo del nombre de sala en slots.
- Accesibilidad de zoom y nombres de diálogos.
- Cache namespace `blackthorn404-v1.1.1-release` y precache solo runtime.
- `.gitignore`, changelog y test `release_hardening_e2e.py`.
- Limpieza de cachés, asset huérfano y screenshots QA regenerables no referenciados.

## 7. Archivos creados

`.gitignore`, `CHANGELOG.md`, `RELEASE_AUDIT_v1.1.1.md`, `tools/release_hardening_e2e.py`.

## 8. Archivos modificados principales

`index.html`, `css/app.css`, `js/data.js`, `js/save.js`, `js/engine.js`, `js/app.js`, `js/bundle.js`, `sw.js`, `README.md`, gates visual/release/final, balance y pruebas de fases 10–16 con expectativas de v1.1.1.

## 9. Archivos eliminados

`assets/art/portrait_elena.png` (huérfano), `tools/__pycache__/`, y capturas `QA_*.png` regenerables salvo las dos referenciadas por `PHASE_1_REPORT.md`.

## 10. Comandos / verificaciones ejecutadas

`node --check`; `tools/release_gate.py`; `tools/final_release_gate.py`; `tools/visual_gate.py`; `tools/balance_check.py`; `tools/phase1_e2e.py` … `tools/phase16_e2e.py`; `tools/release_hardening_e2e.py`; servidor HTTP + `curl` bajo subruta `/Blackthorn-404/`; comprobación de recursos 200; inspección de DOM sinks, APIs de red/privacidad, secretos y basura de release.

## 11. Tests superados

- Fases E2E 1–16: PASS tras regresión. Una ejecución paralela de fase 5 dio un falso negativo por contención; repetida aisladamente terminó `PHASE5_E2E_PASS` completa.
- `RELEASE_GATE_PASS`.
- `FINAL_RELEASE_GATE_PASS 50/50`.
- Visual gate final: 13/13.
- Balance: 31/31.
- Hardening E2E: 6/6.
- Subruta HTTP estilo GitHub Pages: index, CSS, bundle, manifest, SW, iconos y art críticos respondieron 200.
- Fase 16 final: desktop/móvil, touch targets, records y cero errores de consola.

## 12. Tests fallidos

Ningún fallo reproducible pendiente. El único fallo observado fue el falso negativo de fase 5 bajo ejecución paralela saturada; aislado pasó íntegramente.

## 13. Tests no ejecutados

- Instalación/activación/offline real del Service Worker en GitHub Pages HTTPS desde Chromium del sandbox: navegación local bloqueada por política del entorno.
- Safari/iOS físico y Firefox físico.
- Lector de pantalla real y auditoría manual WCAG completa.
- Lighthouse sobre la URL pública desplegada.

## 14. Comprobaciones manuales pendientes

Tras publicar: abrir la URL de Pages en incógnito, iniciar partida, instalar PWA, desconectar red y recargar; comprobar actualización desde una caché v1.1.0 y realizar un smoke en Safari iPhone.

## 15. Riesgos

Bajos. El principal riesgo residual es específico de navegador/origen real para Service Worker y comportamiento iOS. Los datos de usuario son exclusivamente locales.

## 16. Limitaciones

Sin licencia de código/contenido definida. No hay backend/cuentas/cloud saves por diseño. El sandbox no permite el smoke browser real de localhost/file.

## 17. Estado final

**PUBLICABLE CON LIMITACIONES**. No quedan bloqueantes conocidos de ejecución, campaña, controles, guardado, navegación o GitHub Pages estático. La limitación es de verificación del SW desplegado y dispositivos/navegadores reales, no un fallo confirmado.

## 18. Puntuación inicial

**9,1/10** — producto profesional, pero con deuda real de payload duplicado, zoom, naming de diálogos, saneado de save y limpieza de release.

## 19. Puntuación final

**9,5/10** — excelente y razonablemente publicable con la validación automatizada disponible.

## 20. Qué falta para 10/10

Smoke real en GitHub Pages HTTPS incluyendo upgrade de SW/offline, matriz Chrome/Firefox/Safari + iPhone físico, Lighthouse desplegado, auditoría WCAG con lector de pantalla y decisión explícita de licencia.

## 21. Ejecución

Sirve el directorio con un servidor estático o publícalo en GitHub Pages. Para desarrollo local: `python3 -m http.server 8000` desde la raíz y abre `http://localhost:8000/`.

## 22. Publicación

Sube el contenido de la raíz del ZIP al repositorio de GitHub Pages. `manifest` usa `start_url`, `scope` e `id` relativos; CSS/JS/assets y Service Worker están preparados para una subcarpeta de repositorio.

## 23. Checklist final

- [x] Sintaxis JS válida
- [x] Gate release
- [x] Gate final
- [x] Balance
- [x] QA fases 1–16
- [x] Cero URLs runtime remotas
- [x] Sin secretos detectados
- [x] Rutas relativas / subruta HTTP
- [x] PWA cache namespace nuevo
- [x] Zoom accesible
- [x] Diálogos etiquetados
- [x] Saves saneados
- [x] Limpieza de package
- [ ] Smoke SW HTTPS en URL pública
- [ ] Safari/iPhone físico
- [ ] Elegir licencia

## 24. Paquete final

`Blackthorn-404-The-Unremembered_v1.1.1_RELEASE.zip`.
