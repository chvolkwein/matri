# Invitación de matrimonio en GitHub Pages

Este paquete tiene una página estática para GitHub Pages y un Apps Script opcional para mostrar los datos de transferencia solo después de ingresar una clave.

## Archivos

- `index.html`: página principal.
- `styles.css`: diseño visual.
- `script.js`: lógica para pedir la clave y consultar Apps Script.
- `apps_script.gs`: código que va en Google Apps Script, no en GitHub.

## Paso 1: crear el repositorio en GitHub

1. Entra a GitHub.
2. Crea un repositorio nuevo.
3. Puede ser público si usas Apps Script para esconder los datos bancarios.
4. Sube `index.html`, `styles.css` y `script.js` a la raíz del repo.
5. No subas tus datos bancarios reales al repo.

## Paso 2: activar GitHub Pages

1. En el repo, entra a Settings > Pages.
2. En Source, elige `Deploy from a branch`.
3. Branch: `main`.
4. Folder: `/root`.
5. Guarda.
6. GitHub te dará una URL tipo `https://usuario.github.io/repo/`.

## Paso 3: crear el Apps Script

1. Entra a https://script.google.com/.
2. Crea un proyecto nuevo.
3. Pega el contenido de `apps_script.gs`.
4. Cambia `SECRET_KEY` por la clave que compartirás con invitados.
5. Cambia `BANK_INFO` por tus datos reales.
6. Deploy > New deployment > Web app.
7. Execute as: Me.
8. Who has access: Anyone.
9. Copia la URL que termina en `/exec`.

## Paso 4: conectar la página con Apps Script

1. Abre `script.js`.
2. Reemplaza `PEGAR_AQUI_URL_DEL_APPS_SCRIPT_EXEC` por la URL `/exec` del Apps Script.
3. Sube el cambio a GitHub.

## Nota de privacidad

GitHub Pages es público. Por eso los datos bancarios no deben estar en `index.html`, `script.js` ni `styles.css`.
La clave con Apps Script no es seguridad bancaria avanzada, pero evita que los datos queden visibles directamente en el código del sitio.
