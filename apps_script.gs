// Google Apps Script para la sección de regalos.
// 1) Cambia ACCESS_KEY.
// 2) Cambia BANK_INFO.
// 3) Opcional: pega SPREADSHEET_ID para guardar registros en un Google Sheet.
// 4) Deploy > New deployment > Web app > Execute as Me > Anyone.

const ACCESS_KEY = 'password123';
const SPREADSHEET_ID = ''; // opcional. Ejemplo: '1abcDEF...'

const BANK_INFO = `Banco: Nombre del banco
Nombre: Nombre Apellido
RUT: 12.345.678-9
Tipo de cuenta: Cuenta corriente
Número de cuenta: 123456789
Correo: correo@ejemplo.com
Comentario: Regalo matrimonio`;

function doGet(e) {
  const params = e.parameter || {};
  const callback = params.callback || '';
  let result;

  try {
    if (params.action === 'bank') {
      result = getBankInfo_(params);
    } else if (params.action === 'record') {
      result = recordGift_(params);
    } else {
      result = { ok: false, message: 'Acción no reconocida.' };
    }
  } catch (err) {
    result = { ok: false, message: err && err.message ? err.message : String(err) };
  }

  const json = JSON.stringify(result);

  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function getBankInfo_(params) {
  const key = String(params.key || '').trim();
  if (key !== ACCESS_KEY) {
    return { ok: false, message: 'Clave incorrecta.' };
  }
  return { ok: true, bankInfo: BANK_INFO };
}

function recordGift_(params) {
  const row = [
    new Date(),
    String(params.name || '').trim(),
    String(params.gift || '').trim(),
    String(params.amount || '').trim(),
    String(params.message || '').trim(),
  ];

  if (!SPREADSHEET_ID) {
    return { ok: true, saved: false, message: 'Registro recibido, pero no hay Sheet configurado.' };
  }

  const sheet = getOrCreateSheet_();
  sheet.appendRow(row);
  return { ok: true, saved: true };
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Regalos');
  if (!sheet) {
    sheet = ss.insertSheet('Regalos');
    sheet.appendRow(['Fecha', 'Nombre', 'Regalo', 'Monto', 'Mensaje']);
  }
  return sheet;
}