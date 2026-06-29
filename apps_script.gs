// Apps Script: pegar este código en script.google.com
// Luego ir a Deploy > New deployment > Web app.
// Execute as: Me
// Who has access: Anyone

const SECRET_KEY = 'CAMBIAR_ESTA_CLAVE';

const BANK_INFO = `Nombre: Nombre Apellido
Banco: Nombre del banco
Tipo de cuenta: Cuenta corriente / vista
Nº cuenta: 00000000
RUT: 00.000.000-0
Email: correo@ejemplo.com
Comentario: Regalo matrimonio`;

function doGet(e) {
  const key = e.parameter.key || '';

  const output = key === SECRET_KEY
    ? { ok: true, bankInfo: BANK_INFO }
    : { ok: false, message: 'Clave incorrecta.' };

  return ContentService
    .createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}
