
var user; // Declara la variable globalmente
function validarLogin() {
  var cedulaUsuario = document.getElementById("cedulaUsuario").value;
  var ultimosCuatro = document.getElementById("ultimosCuatro").value;
  fetch('https://caprofuptet.cromstudio.com.ve/sistema/datos.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar el archivo JSON');
      }
      return response.json();
    })
    .then(users => {
      const foundUser = users.find(u => u.cedula === cedulaUsuario);
      if (foundUser) {
        const cuentaPrincipal = foundUser["cuenta-principal"];
        const lastFourDigits = cuentaPrincipal.slice(-4);
        if (lastFourDigits === ultimosCuatro) {
          // Asignamos el usuario a la variable global
          user = foundUser;
          // Mostrar resultado
          mostrarResultado(user);
        } else {
          document.getElementById("resultado").innerHTML = "Error: Los últimos 4 dígitos de la cuenta no coinciden.";
        }
      } else {
        document.getElementById("resultado").innerHTML = "Error: Su cedula no se encuentra en el sistema.";
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById("resultado").innerHTML = "Error al cargar los datos. Intente más tarde.";
    });
  return false;
}
function mostrarResultado(user) {
  var fechaHora = new Date();
  var hora = fechaHora.getHours();
  var saludo = '';
  if (hora >= 6 && hora < 12) {
    saludo = 'Buenos días';
  } else if (hora >= 12 && hora < 18) {
    saludo = 'Buenas tardes';
  } else {
    saludo = 'Buenas noches';
  }
  var saldovoluntario = parseFloat(user["ahorro-voluntario"]).toFixed(2);
  var saldoestatutario = parseFloat(user["ahorro-estatutario"]).toFixed(2);
  var cuotamensual = parseFloat(user["cuota-mensual"]).toFixed(2);
  var afiliado = user["numero-afiliado"];
  var fechaIngreso = user["fecha-ingreso"];
var fechaIngresoFormateada = new Date(fechaIngreso);
var dia = fechaIngresoFormateada.getDate();
var mes = fechaIngresoFormateada.getMonth() + 1; 
var año = fechaIngresoFormateada.getFullYear();
var fechaIngresoStr = dia + "/" + mes + "/" + año
var equiposFinanciados = user["equipos-financiados"];
var montoEquipoFinanciado = parseFloat(user["monto-equipo-financiado"]).toFixed(2);

var fechaSolicitudEquipo = user["fecha-solicitud-equipo"];
var fechaSolicitudEquipoFormateada = new Date(fechaSolicitudEquipo);
var diaEquipo = fechaSolicitudEquipoFormateada.getDate();
var mesEquipo = fechaSolicitudEquipoFormateada.getMonth() + 1; 
var añoEquipo = fechaSolicitudEquipoFormateada.getFullYear();
var fechaSolicitudEquipoStr = diaEquipo + "/" + mesEquipo + "/" + añoEquipo;
var cuotasEquipoFinanciado = user["cuotas-equipo-financiado"];
var creditoEstatutario = parseFloat(user["credito-estatutario"]).toFixed(2);
var cuotasEstatutario = user["cuotas-estatutario"];
var fechaSolicitudEstatutario = user["fecha-solicitud-estatutario"];
var fechaSolicitudEstatutarioFormateada = new Date(fechaSolicitudEstatutario);
var diaEstatutario = fechaSolicitudEstatutarioFormateada.getDate();
var mesEstatutario = fechaSolicitudEstatutarioFormateada.getMonth() + 1;
var añoEstatutario = fechaSolicitudEstatutarioFormateada.getFullYear();
var fechaSolicitudEstatutarioStr = diaEstatutario + "/" + mesEstatutario + "/" + añoEstatutario;
var creditoFav = parseFloat(user["credito-fav"]).toFixed(2);
var saldopendientefav = parseFloat(user["saldo-pendiente-fav"]).toFixed(2);
var saldopendientecreditoestatutario = parseFloat(user["saldo-pendiente-credito-estatutario"]).toFixed(2);
var saldopendienteequipofinanciado = parseFloat(user["saldo-pendiente-de-equipo-financiado"]).toFixed(2);
var ahorrosocio = parseFloat(user["ahorro-socio"]).toFixed(2);
var aportepatronal = parseFloat(user["aporte-patronal"]).toFixed(2);
var saldodisponibleestatutario = (parseFloat(ahorrosocio) + parseFloat(aportepatronal)).toFixed(2);
var ahorrosocioporcobrar = parseFloat(user["ahorro-socio-por-cobrar"]).toFixed(2);
var aportepatronalporcobrar = parseFloat(user["aporte-patronal-por-cobrar"]).toFixed(2);
var saldobloqueadoestatutario = (parseFloat(ahorrosocioporcobrar) + parseFloat(aportepatronalporcobrar)).toFixed(2);
var totalsaldoestatutario = (parseFloat(saldodisponibleestatutario) + parseFloat(saldobloqueadoestatutario)).toFixed(2);
var fechaSolicitudFav = user["fecha-solicitud-fav"];
var cuotasFav = user["cuotas-credito-fav"];
var fechaSolicitudFavFormateada = new Date(fechaSolicitudFav);
var diaFav = fechaSolicitudFavFormateada.getDate();
var mesFav = fechaSolicitudFavFormateada.getMonth() + 1;
var añoFav = fechaSolicitudFavFormateada.getFullYear();
var fechaSolicitudFavStr = diaFav + "/" + mesFav + "/" + añoFav;
var sumaTotal = montoEquipoFinanciado + creditoEstatutario + creditoFav;
var nombreUsuario = user["nombre"]; 
          var resultadoHTML = `
          <img src="https://caprofuptet.cromstudio.com.ve/imagenes/logo-caprof.webp" alt="Imagen de perfil">
          <br>
            <p class="saludo">${saludo} <div class="nombre">${nombreUsuario}</div></p>
            <br>
            <div class="walletBalanceCard">
   <div class="balanceHeading">Ahorro Estatutario</div>
                  <div class="detailedBalances">
        <div class="balanceDetail">
            <div class="label">Disponible</div>
            <div class="value"><span id="currency">Bs</span>${saldodisponibleestatutario}</div>
        </div>
        <div class="balanceDetail">
            <div class="label">P/Cobrar</div>
            <div class="value"><span id="currency">Bs</span>${saldobloqueadoestatutario}</div>
        </div>
        <div class="balanceDetail">
            <div class="label">Total</div>
            <div class="value"><span id="currency">Bs</span>${totalsaldoestatutario}</div>
        </div>
  </div>
</div>
<br>
  <div class="walletBalanceCard">
        <div class="balanceHeading">Ahorro Voluntario (Mensual: $${cuotamensual})</div>
        <div class="balance"><span id="currency">$</span>${saldovoluntario}</div>
    </div>
    <br>
    <div class="walletBalanceCard">
        <div class="balanceHeading">Saldo en Creditos</div>
                  <div class="detailedBalances">
        <div class="balanceDetail">
            <div class="label">Bienes y Servicios</div>
            <div class="value"><span id="currency">$</span>${saldopendienteequipofinanciado}</div>
        </div>
        <div class="balanceDetail">
            <div class="label">Crédito Estatutario</div>
            <div class="value"><span id="currency">Bs</span>${saldopendientecreditoestatutario}</div>
        </div>
        <div class="balanceDetail">
            <div class="label">Crédito F.A.V.</div>
            <div class="value"><span id="currency">$</span>${saldopendientefav}</div>
        </div>
          </div>
    </div>
<!-- Botón principal -->
<button class="button" onclick="toggleExtraButtons()">Solicitar Créditos</button>
<!-- Botones adicionales -->
<div class="extra-buttons hidden" id="extraButtons">
    <button class="button" onclick="showForm('80% Haberes', user)">80% Haberes</button>
    <button class="button" onclick="showFavForm()">Créditos F.A.V</button>
    <button class="button" onclick="window.location.href='https://caprofuptet.cromstudio.com.ve/tienda'">Tienda Virtual</button></div>
<!-- Modal de formulario -->
<div id="modal" class="modal hidden">
    <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <h2 id="form-title"></h2>
        <form id="creditForm" action="https://formsubmit.co/99738e359615e61c3ed0986f558f40a3" method="POST">
            <input type="hidden" name="_subject" value="Solicitud de Crédito 80% Estatutario">
            <input type="hidden" name="_template" value="box">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_next" value="https://caprofuptet.cromstudio.com.ve/solicitud-enviada/">
            <!-- Campo para el tipo de crédito -->
            <input type="hidden" id="creditType" name="Tipo de Credito" readonly>
            <!-- Campo para el monto calculado -->
            <br>
            <label for="calculatedAmount">Disponible:</label>
            <input type="text" id="calculatedAmount" name="Monto" readonly>
            <input type="hidden" id="userId" name="Cedula de Identidad" readonly>

            <!-- Selección de meses -->
            <label for="months">Seleccione los meses:</label>
            <select id="months" name="Meses" onchange="calculateInstallments()">
                <option value="1">1 mes</option>
                <option value="2">2 meses</option>
                <option value="3">3 meses</option>
                <option value="4">4 meses</option>
                <option value="5">5 meses</option>
                <option value="6">6 meses</option>                
            </select>

            <!-- Mostrar cuota mensual y quincenal -->
            <label for="monthlyQuota">Cuota Mensual:</label>
            <input type="text" id="monthlyQuota" name="Cuota Mensual" readonly>
            <label for="biweeklyQuota">Cuota Quincenal:</label>
            <input type="text" id="biweeklyQuota" name="Cuota Quincenal" readonly>
            <p><strong>SE INCLUYEN GASTOS BANCARIOS.</strong></p>
            <button type="submit">Enviar Solicitud</button>
        </form>
    </div>
</div>

<div id="favFormModal" class="modal hidden">
    <div class="modal-content">
        <span class="close" onclick="closeForm('favFormModal')">&times;</span>
        <h2 id="form-title">Solicitud Crédito F.A.V.</h2>
        <form id="favForm" action="https://formsubmit.co/99738e359615e61c3ed0986f558f40a3" method="POST">
            <input type="hidden" name="_subject" value="Solicitud de Crédito F.A.V.">
            <input type="hidden" name="_template" value="box">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_next" value="https://caprofuptet.cromstudio.com.ve/solicitud-enviada/">
            <input type="hidden" id="cedula" name="cedula" readonly>
            <br>
            <label for="monto">Monto a solicitar ($):</label>
            <input type="number" id="monto" name="monto" min="1" max="160" required onchange="calcularFav()">
          <label for="plazo">Número de meses:</label>
<select id="plazo" name="plazo" required onchange="calcularFav()">
    <option value="1">1 mes</option>
    <option value="2">2 meses</option>
    <option value="3">3 meses</option>
    <option value="4">4 meses</option>
    <option value="5">5 meses</option>
    <option value="6">6 meses</option>
    <option value="7">7 meses</option>
    <option value="8">8 meses</option>
</select>
            <label for="cuotaMensual">Cuota Mensual:</label>
            <input type="text" id="cuotaMensual" name="cuotaMensual" readonly>
            <label for="cuotaQuincenal">Cuota Quincenal:</label>
            <input type="text" id="cuotaQuincenal" name="cuotaQuincenal" readonly>
            <p><strong>SE INCLUYEN GASTOS BANCARIOS.</strong></p>
            <button type="submit">Enviar Solicitud</button>
        </form>
    </div>
</div>
  <!-- Modal de error -->
  <div id="favErrorModal" class="modal hidden">
    <div class="modal-content error">
      <span class="close" onclick="closeForm('favErrorModal')">&times;</span>
      <p>Debe tener más de 6 meses de antigüedad para solicitar este crédito.</p>
    </div>
  </div>

          `;
          
          document.getElementById("resultado").innerHTML = resultadoHTML;
        }
// Mostrar y ocultar los botones extra
function toggleExtraButtons() {
    const extraButtons = document.getElementById('extraButtons');
    extraButtons.classList.toggle('hidden');
}
// Mostrar el formulario con los datos del usuario
function showForm(creditType, user) {
    if (!user || !user) {
        console.error("El objeto 'user' no está definido o no contiene la información necesaria.");
        return;
    }
    const modal = document.getElementById('modal');
    const formTitle = document.getElementById('form-title');
    const creditTypeField = document.getElementById('creditType');
    const calculatedAmountField = document.getElementById('calculatedAmount');
    const userIdField = document.getElementById('userId');

    const ahorrosocio = parseFloat(user["ahorro-socio"]).toFixed(2);
    const aportepatronal = parseFloat(user["aporte-patronal"]).toFixed(2);
    const saldodisponibleestatutario = (parseFloat(ahorrosocio) + parseFloat(aportepatronal)).toFixed(2);
    const afiliado = user["cedula"];
    formTitle.textContent = 'Solicitud: ' + creditType;
    creditTypeField.value = creditType;

    if (creditType === '80% Haberes') {
        const amount = (saldodisponibleestatutario * 0.8).toFixed(2);
        calculatedAmountField.value = amount;
    } else {
        calculatedAmountField.value = '';
    }

    userIdField.value = afiliado;
    modal.style.display = 'flex';

    // Inicializar cuotas al mostrar el formulario
    calculateInstallments();
}

// Calcular cuota mensual y quincenal
function calculateInstallments() {
    const calculatedAmount = parseFloat(document.getElementById('calculatedAmount').value) || 0;
    const months = parseInt(document.getElementById('months').value) || 6;
    const totalAmount = calculatedAmount * 1.163; // Aplicar el 12% adicional
    const monthlyQuota = (totalAmount / months).toFixed(2);
    const biweeklyQuota = (monthlyQuota / 2).toFixed(2);

    document.getElementById('monthlyQuota').value = `Bs ${monthlyQuota}`;
    document.getElementById('biweeklyQuota').value = `Bs ${biweeklyQuota}`;
}

// Cerrar el modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}
document.addEventListener("DOMContentLoaded", () => {
      // Mostrar el formulario si cumple con los requisitos
      window.showFavForm = function () {
        if (!user || !user) {
          console.error("El objeto 'user' no está definido.");
          return;
        }
  const fechaIngreso = user["fecha-ingreso"]; // Ejemplo: "2023-06-01"
  // Convertir la fecha a formato correcto
  const fechaIngresoFormateada = new Date(fechaIngreso); // Convierte "YYYY-MM-DD" a un objeto Date
  // Extraer día, mes y año del objeto Date
  const dia = fechaIngresoFormateada.getDate();
  const mes = fechaIngresoFormateada.getMonth() + 1; // Mes es 0 indexado
  const año = fechaIngresoFormateada.getFullYear();
  // Crear una fecha con formato legible (opcional, pero no afecta el cálculo)
  const fechaIngresoStr = dia + "/" + mes + "/" + año;
  console.log("Fecha de ingreso formateada:", fechaIngresoStr); // Verificar formato
  // Calcular la antigüedad en meses
  const fechaActual = new Date();
  const diferenciaMeses = (fechaActual.getFullYear() - año) * 12 + (fechaActual.getMonth() - (mes - 1));
  if (diferenciaMeses < 6) {
    document.getElementById("favErrorModal").classList.remove("hidden");
    document.getElementById("favErrorModal").style.display = "block";
    return;
  }
        const cedulaInput = document.getElementById("cedula");
        cedulaInput.value = user["cedula"]; // Establecer la cédula automáticamente
        const favFormModal = document.getElementById("favFormModal");
        favFormModal.classList.remove("hidden");
        favFormModal.style.display = "block";
      };
      // Cerrar el modal
      window.closeForm = function (id) {
        const modal = document.getElementById(id);
        modal.classList.add("hidden");
        modal.style.display = "none";
      };
      // Actualizar las opciones de plazo
      window.updatePaymentOptions = function () {
        const tipoPago = document.getElementById("tipoPago").value;
        const plazoSelect = document.getElementById("plazo");
        plazoSelect.innerHTML = ""; // Limpiar opciones anteriores
        if (tipoPago === "mensual") {
          for (let i = 1; i <= 8; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = `${i} ${i === 1 ? "mes" : "meses"}`;
            plazoSelect.appendChild(option);
          }
        } else if (tipoPago === "quincenal") {
          for (let i = 2; i <= 16; i += 2) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = `${i} ${i === 2 ? "quincena" : "quincenas"}`;
            plazoSelect.appendChild(option);
          }
        }
      };
    });
// Función para calcular los valores al hacer clic en "Calcular"
function calcularFav() {
  const monto = parseFloat(document.getElementById("monto").value);
  const plazo = parseInt(document.getElementById("plazo").value);

  // Validar monto
  if (isNaN(monto) || monto < 1 || monto > 160) {
      alert("El monto debe estar entre 1$ y 160$.");
      return;
  }

  // Calcular valores intermedios
  const valorA = monto * 0.038 / plazo;
  const valorB = monto * 0.03 / plazo;
  const valorC = 4 / plazo;
  const valorD = monto * 0.02 / plazo;
  const valorE = monto * 0.03 * plazo + monto / plazo;

  // Calcular la cuota mensual
  const cuotaMensual = (valorA + valorB + valorC + valorD + valorE) * 1.04;

  // Calcular la cuota quincenal
  const cuotaQuincenal = cuotaMensual / 2;

  // Mostrar las cuotas en el formulario
  document.getElementById("cuotaMensual").value = `$ ${cuotaMensual.toFixed(2)}`;
  document.getElementById("cuotaQuincenal").value = `$ ${cuotaQuincenal.toFixed(2)}`;
}
function tiendaVirtual() {
            window.location.href = "/tienda/"; // URL de la página a la que quieres ir
        }
