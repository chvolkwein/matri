# Invitación de matrimonio con clave simple

Esta versión muestra una pantalla de clave al entrar a la página. Si la clave es correcta, se muestra la invitación completa.

## Archivos

- `index.html`: estructura de la página.
- `styles.css`: diseño visual.
- `script.js`: clave, contador y comportamiento interactivo.
- `.nojekyll`: archivo vacío para GitHub Pages.
- `README.md`: instrucciones.

## Qué subir a GitHub

Sube todos estos archivos a la raíz del repo:

```text
index.html
styles.css
script.js
.nojekyll
README.md
```

La raíz es el nivel principal del repo, no una carpeta llamada `root`.

## Cambiar la clave

Abre `script.js` y cambia esta línea:

```js
const PASSWORD = "matrimonio2027";
```

Por ejemplo:

```js
const PASSWORD = "nuestraClave";
```

## Cambiar fecha del contador

En `script.js`, cambia:

```js
const WEDDING_DATE = "2027-01-09T18:00:00";
```

## Cambiar textos/datos

Edita directamente `index.html`. Busca estos textos y reemplázalos:

- `Nombre & Nombre`
- `Sábado 9 de enero de 2027`
- `Ciudad / Lugar`
- datos de transferencia
- link de WhatsApp para confirmar asistencia

## Importante sobre privacidad

Esta es la solución simple. Sirve para que invitados normales no vean la página sin clave, pero no es seguridad real. Como GitHub Pages es estático, alguien técnico podría abrir el código fuente y ver el contenido o la clave.


Nota: esta versión ajusta la portada para que no se corte y permite scroll en la pantalla de clave.
