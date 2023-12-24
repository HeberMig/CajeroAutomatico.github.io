cuentas.forEach(function (cuenta) {
    cuenta.historial = [];
});

function registrarTransaccion(accion, monto) {
    if (accion !== "Consulta de Saldo" && (monto < 10 || (cuentaSeleccionada.saldo - monto) < 10 || (cuentaSeleccionada.saldo + monto) > 990)) {
        mostrarMensajeEnPantalla("La transacción no cumple con las reglas de la cuenta.");
        return; 
    }

    var fechaActual = new Date();

    cuentaSeleccionada.historial.push({
        fecha: fechaActual,
        accion: accion,
        monto: monto
    });

    if (accion === "Ingreso" || accion === "Retiro") {
        cuentaSeleccionada.saldo += (accion === "Ingreso") ? monto : -monto;

        //  saldo a $10 - $990
        cuentaSeleccionada.saldo = Math.max(10, Math.min(990, cuentaSeleccionada.saldo));
    }

    mostrarMensajeEnPantalla("Transacción exitosa. Nuevo saldo: $" + cuentaSeleccionada.saldo);
    mostrarHistorial();
}



function reiniciarHistorial() {
    cuentas.forEach(function (cuenta) {
        cuenta.historial = [];
    });
}

function mostrarMovimientos() {
    console.log("Mostrando movimientos...");
    document.getElementById("container-login").style.display = "none";
    document.getElementById("container-movimientos").style.display = "block";
    document.getElementById("video-container-movimientos").style.display = "block";
}

function mostrarMensajeEnPantalla(mensaje) {
    var mensajeDiv = document.getElementById("mensaje-en-pantalla");
    mensajeDiv.innerHTML = "<span>" + mensaje + " <button onclick=\"cerrarMensaje()\">Cerrar</button></span>";
    mensajeDiv.style.display = "block";
}

function cerrarMensaje() {
    var mensajeDiv = document.getElementById("mensaje-en-pantalla");
    mensajeDiv.style.display = "none";
}

function mostrarHistorial() {
    var historialDiv = document.getElementById("historial-en-pantalla");
    historialDiv.innerHTML = ""; 

    cuentaSeleccionada.historial.forEach(function (transaccion) {
        var dia = transaccion.fecha.getDate();
        var mes = transaccion.fecha.getMonth() + 1; 
        var año = transaccion.fecha.getFullYear();
        var horas = transaccion.fecha.getHours();
        var minutos = transaccion.fecha.getMinutes();
        var segundos = transaccion.fecha.getSeconds();

        
        var fechaHoraFormateada = `${dia}-${mes}-${año} ${horas}:${minutos}:${segundos}`;

     
        var transaccionDiv = document.createElement("div");
        transaccionDiv.textContent = fechaHoraFormateada + " - " + transaccion.accion + " $" + transaccion.monto;

     
        historialDiv.appendChild(transaccionDiv);

    });

    historialDiv.innerHTML += '<button onclick="cerrarHistorial()">Cerrar Historial</button>';
    historialDiv.style.display = "block";
}

function cerrarHistorial() {
    var historialDiv = document.getElementById("historial-en-pantalla");
    historialDiv.style.display = "none";
}

function consultarSaldo() {
    console.log("Consultando saldo...");
    var mensaje = "Su saldo actual es: $" + cuentaSeleccionada.saldo;
    mostrarMensajeEnPantalla(mensaje);
    registrarTransaccion("Consulta de Saldo", 0); 
}

function ingresarMonto() {
    console.log("Ingresando monto...");
    var montoStr = prompt("Ingrese el monto a depositar:");
    var monto = parseFloat(montoStr);

    if (!isNaN(monto) && monto > 0 && cuentaSeleccionada.saldo + monto <= 990) {
        cuentaSeleccionada.saldo += monto;
        registrarTransaccion("Ingreso", monto);
        var mensaje = "Se ha depositado $" + monto + ". Nuevo saldo: $" + cuentaSeleccionada.saldo;
        mostrarMensajeEnPantalla(mensaje);
        mostrarHistorial();
    } else {
        mostrarMensajeEnPantalla("Monto no válido o excede el límite de saldo permitido.");
    }
}

function retirarMonto() {
    console.log("Retirando monto...");
    var montoStr = prompt("Ingrese el monto a retirar:");
    var monto = parseFloat(montoStr);

    if (!isNaN(monto) && monto > 0 && monto <= cuentaSeleccionada.saldo && cuentaSeleccionada.saldo - monto >= 10) {
        cuentaSeleccionada.saldo -= monto;
        registrarTransaccion("Retiro", monto);
        var mensaje = "Se ha retirado $" + monto + ". Nuevo saldo: $" + cuentaSeleccionada.saldo;
        mostrarMensajeEnPantalla(mensaje);
        mostrarHistorial();
    } else {
        mostrarMensajeEnPantalla("Monto no válido o insuficiente saldo.");
    }
}



function cerrarSesion() {
    console.log("Cerrando sesión...");
    reiniciarHistorial();  // Reinicia el historial al cerrar sesión
    document.getElementById("container-login").style.display = "block";
    document.getElementById("container-movimientos").style.display = "none";
    document.getElementById("historial-en-pantalla").style.display = "none";
    cuentaSeleccionada = null;
}

