// Pega aquí la URL /exec de Google Apps Script cuando la tengas.
// Ejemplo: const API_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
const API_URL = 'https://script.google.com/macros/s/AKfycbzhrt9_I2ZcrsFQ-Vc2deZwgE0qoa1C5cPSNm1y5Y-6uSlNFyYcmQVkttRgmfDwy8tZzQ/exec';

const giftRows = document.querySelectorAll('.gift-row');
const selectedGiftText = document.getElementById('selectedGiftText');
const guestNameInput = document.getElementById('guestName');
const giftAmountInput = document.getElementById('giftAmount');
const giftMessageInput = document.getElementById('giftMessage');
const registerGiftBtn = document.getElementById('registerGiftBtn');
const registerStatus = document.getElementById('registerStatus');
const bankPasswordInput = document.getElementById('bankPassword');
const showBankBtn = document.getElementById('showBankBtn');
const bankStatus = document.getElementById('bankStatus');
const bankInfo = document.getElementById('bankInfo');

let selectedGift = 'Aporte libre';

function isApiConfigured() {
  return API_URL && !API_URL.includes('PEGAR_AQUI');
}

function formatCLP(value) {
  if (!value) return '';
  const numeric = String(value).replace(/\D/g, '');
  if (!numeric) return '';
  return new Intl.NumberFormat('es-CL').format(Number(numeric));
}

function setStatus(element, text) {
  element.textContent = text || '';
}

function clearBankInfo() {
  bankInfo.textContent = '';
  bankInfo.classList.add('hidden');
}

function chooseGift(row) {
  giftRows.forEach((item) => item.classList.remove('selected'));
  row.classList.add('selected');

  selectedGift = row.dataset.gift || 'Aporte libre';
  selectedGiftText.textContent = selectedGift;

  giftAmountInput.value = row.dataset.amount ? formatCLP(row.dataset.amount) : '';
  document.getElementById('registro').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

async function callApi(params) {
  if (!isApiConfigured()) {
    throw new Error('Falta configurar la URL del Apps Script en script.js.');
  }

  const url = `${API_URL}?${new URLSearchParams(params).toString()}`;
  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    throw new Error('Google Apps Script respondió con error.');
  }

  return response.json();
}

async function showBankDetails() {
  setStatus(bankStatus, '');
  clearBankInfo();

  const key = bankPasswordInput.value.trim();
  if (!key) {
    setStatus(bankStatus, 'Ingresa la clave para ver los datos de transferencia.');
    return;
  }

  showBankBtn.disabled = true;
  showBankBtn.textContent = 'Validando...';

  try {
    const data = await callApi({ action: 'bank', key });

    if (!data.ok) {
      setStatus(bankStatus, data.message || 'Clave incorrecta.');
      return;
    }

    bankInfo.textContent = data.bankInfo;
    bankInfo.classList.remove('hidden');
    setStatus(bankStatus, 'Clave correcta.');
  } catch (error) {
    console.error(error);
    setStatus(bankStatus, error.message || 'No se pudo conectar con Google Apps Script.');
  } finally {
    showBankBtn.disabled = false;
    showBankBtn.textContent = 'Mostrar datos';
  }
}

async function registerGift() {
  setStatus(registerStatus, '');

  const name = guestNameInput.value.trim();
  const amount = giftAmountInput.value.trim();
  const message = giftMessageInput.value.trim();

  if (!name && !message && !amount) {
    setStatus(registerStatus, 'Escribe al menos tu nombre, monto o mensaje.');
    return;
  }

  registerGiftBtn.disabled = true;
  registerGiftBtn.textContent = 'Registrando...';

  try {
    const data = await callApi({
      action: 'record',
      name,
      gift: selectedGift,
      amount,
      message,
    });

    if (!data.ok) {
      setStatus(registerStatus, data.message || 'No se pudo registrar.');
      return;
    }

    setStatus(registerStatus, data.saved ? 'Registro guardado. Gracias.' : 'Registro recibido.');
  } catch (error) {
    console.error(error);
    setStatus(registerStatus, error.message || 'No se pudo conectar con Google Apps Script.');
  } finally {
    registerGiftBtn.disabled = false;
    registerGiftBtn.textContent = 'Registrar regalo o mensaje';
  }
}

giftRows.forEach((row) => row.addEventListener('click', () => chooseGift(row)));
showBankBtn.addEventListener('click', showBankDetails);
registerGiftBtn.addEventListener('click', registerGift);

bankPasswordInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') showBankDetails();
});
