// Cambia esta clave por la que quieres enviar a tus invitados.
// OJO: esta es la solución simple. La clave queda visible para alguien que revise el código fuente.
const PASSWORD = "matrimonio2027";

// Cambia esta fecha/hora para el contador.
// Formato: YYYY-MM-DDTHH:mm:ss
const WEDDING_DATE = "2027-01-09T18:00:00";

const authScreen = document.getElementById("auth-screen");
const siteContent = document.getElementById("site-content");
const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password-input");
const authError = document.getElementById("auth-error");
const lockAgain = document.getElementById("lock-again");
const countdown = document.getElementById("countdown");
const giftSelected = document.getElementById("gift-selected");
const giftButtons = document.querySelectorAll("[data-gift]");

function normalize(value) {
  return value.trim().toLowerCase();
}

function unlockSite() {
  document.body.classList.remove("locked");
  authScreen.classList.add("hidden");
  siteContent.classList.remove("hidden");
  localStorage.setItem("wedding_invitation_unlocked", "true");
}

function lockSite() {
  document.body.classList.add("locked");
  siteContent.classList.add("hidden");
  authScreen.classList.remove("hidden");
  localStorage.removeItem("wedding_invitation_unlocked");
  passwordInput.value = "";
  passwordInput.focus();
}

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (normalize(passwordInput.value) === normalize(PASSWORD)) {
    authError.textContent = "";
    unlockSite();
  } else {
    authError.textContent = "Clave incorrecta. Intenta nuevamente.";
    passwordInput.select();
  }
});

lockAgain.addEventListener("click", lockSite);

if (localStorage.getItem("wedding_invitation_unlocked") === "true") {
  unlockSite();
}

function updateCountdown() {
  const target = new Date(WEDDING_DATE).getTime();
  const now = Date.now();
  const diff = target - now;

  if (!Number.isFinite(target)) {
    countdown.textContent = "Edita la fecha en script.js";
    return;
  }

  if (diff <= 0) {
    countdown.textContent = "¡Llegó el gran día!";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  const minutes = Math.floor((totalSeconds / 60) % 60);

  countdown.textContent = `${days} días · ${hours} horas · ${minutes} minutos`;
}

updateCountdown();
setInterval(updateCountdown, 60 * 1000);

giftButtons.forEach((button) => {
  button.addEventListener("click", () => {
    giftButtons.forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    const gift = button.dataset.gift;
    giftSelected.textContent = `Puedes poner “${gift}” en el comentario de la transferencia.`;
  });
});
