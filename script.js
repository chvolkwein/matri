// 1) Publica el Apps Script como Web App.
// 2) Copia la URL terminada en /exec aquí abajo.
const API_URL = 'https://script.google.com/macros/s/AKfycby-J8Bvm1UnuOQMcE9kvzQODh-TbQ48uW0bPGouKNSej1Oucm_Ex7Sjj86B-U-i5ys79A/exec';

const giftButtons = document.querySelectorAll('.gift-item');
const openGiftFormBtn = document.getElementById('openGiftFormBtn');
const giftForm = document.getElementById('giftForm');
const selectedGiftText = document.getElementById('selectedGiftText');
const guestNameInput = document.getElementById('guestName');
const giftAmountInput = document.getElementById('giftAmount');
const giftMessageInput = document.getElementById('giftMessage');
const giftPasswordInput = document.getElementById('giftPassword');
const registerGiftBtn = document.getElementById('registerGiftBtn');
const giftStatus = document.getElementById('giftStatus');
const bankInfoEl = document.getElementById('bankInfo');

let selectedGift = {
  name: 'Aporte libre',
  amount: '',
};

function formatAmount(amount) {
  if (!amount) return '';
  return new Intl.NumberFormat('es-CL').format(Number(amount));
}

function showGiftForm() {
  giftForm.classList.remove('hidden');
  giftForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function setSelectedGift(button) {
  giftButtons.forEach((item) => item.classList.remove('selected'));
  button.classList.add('selected');

  selectedGift = {
    name: button.dataset.gift || 'Aporte libre',
    amount: button.dataset.amount || '',
  };

  selectedGiftText.textContent = selectedGift.name;

  if (selectedGift.amount) {
    giftAmountInput.value = formatAmount(selectedGift.amount);
  } else {
    giftAmountInput.value = '';
  }

  showGiftForm();
}

function resetMessages() {
  giftStatus.textContent = '';
  bankInfoEl.textContent = '';
  bankInfoEl.classList.add('hidden');
}

async function registerGiftAndShowBankInfo() {
  resetMessages();

  const name = guestNameInput.value.trim();
  const amount = giftAmountInput.value.trim();
  const message = giftMessageInput.value.trim();
  const password = giftPasswordInput.value.trim();

  if (!name) {
    giftStatus.textContent = 'Ingresa tu nombre para registrar el regalo.';
    return;
  }

  if (!password) {
    giftStatus.textContent = 'Ingresa la clave para ver los datos de transferencia.';
    return;
  }

  if (!API_URL || API_URL.includes('PEGAR_AQUI')) {
    giftStatus.textContent = 'Falta configurar la URL del Apps Script en script.js.';
    return;
  }

  registerGiftBtn.disabled = true;
  registerGiftBtn.textContent = 'Registrando...';

  try {
    const params = new URLSearchParams({
      action: 'record',
      key: password,
      name,
      gift: selectedGift.name,
      amount,
      message,
    });

    const response = await fetch(`${API_URL}?${params.toString()}`, { method: 'GET' });
    const data = await response.json();

    if (!data.ok) {
      giftStatus.textContent = data.message || 'No se pudo validar la clave.';
      return;
    }

    bankInfoEl.textContent = data.bankInfo;
    bankInfoEl.classList.remove('hidden');

    giftStatus.textContent = data.saved
      ? 'Regalo registrado. Puedes hacer la transferencia con estos datos.'
      : 'Clave correcta. Los datos se muestran abajo. Ojo: falta conectar el Google Sheet para registrar automáticamente.';
  } catch (error) {
    console.error(error);
    giftStatus.textContent = 'No se pudo conectar con Google Apps Script. Revisa la URL /exec y el deployment.';
  } finally {
    registerGiftBtn.disabled = false;
    registerGiftBtn.textContent = 'Registrar y ver datos de transferencia';
  }
}

giftButtons.forEach((button) => {
  button.addEventListener('click', () => setSelectedGift(button));
});

openGiftFormBtn.addEventListener('click', showGiftForm);
registerGiftBtn.addEventListener('click', registerGiftAndShowBankInfo);

giftPasswordInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') registerGiftAndShowBankInfo();
});
