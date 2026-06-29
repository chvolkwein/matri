// 1) Publica el Apps Script como Web App.
// 2) Copia la URL terminada en /exec aquí abajo.
const API_URL = 'PEGAR_AQUI_URL_DEL_APPS_SCRIPT_EXEC';

const passwordInput = document.getElementById('password');
const unlockBtn = document.getElementById('unlockBtn');
const statusEl = document.getElementById('status');
const bankInfoEl = document.getElementById('bankInfo');

async function unlockGiftInfo() {
  const password = passwordInput.value.trim();

  bankInfoEl.classList.add('hidden');
  bankInfoEl.textContent = '';
  statusEl.textContent = '';

  if (!password) {
    statusEl.textContent = 'Ingresa la clave.';
    return;
  }

  if (!API_URL || API_URL.includes('PEGAR_AQUI')) {
    statusEl.textContent = 'Falta configurar la URL del Apps Script en script.js.';
    return;
  }

  unlockBtn.disabled = true;
  unlockBtn.textContent = 'Revisando...';

  try {
    const url = `${API_URL}?key=${encodeURIComponent(password)}`;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();

    if (!data.ok) {
      statusEl.textContent = data.message || 'Clave incorrecta.';
      return;
    }

    bankInfoEl.textContent = data.bankInfo;
    bankInfoEl.classList.remove('hidden');
    statusEl.textContent = 'Datos desbloqueados.';
  } catch (error) {
    console.error(error);
    statusEl.textContent = 'No se pudo cargar la información. Intenta de nuevo.';
  } finally {
    unlockBtn.disabled = false;
    unlockBtn.textContent = 'Ver datos';
  }
}

unlockBtn.addEventListener('click', unlockGiftInfo);
passwordInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') unlockGiftInfo();
});
