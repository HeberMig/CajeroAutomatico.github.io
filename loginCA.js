var cuentas = [
    { nombre: "Mali", saldo: 200, password: "1234", historial: [] },
    { nombre: "Gera", saldo: 290, password: "5678", historial: [] },
    { nombre: "Maui", saldo: 67, password: "abcd", historial: [] }
];

var cuentaSeleccionada = null;


function autenticarUsuario() {
    var nombre = document.getElementById("username").value;
    cuentaSeleccionada = buscarCuentaPorNombre(nombre.toLowerCase());

    if (cuentaSeleccionada) {
        var password = document.getElementById("password").value;
        if (password === cuentaSeleccionada.password) {
            alert("¡Bienvenido(a), " + cuentaSeleccionada.nombre + "!");
            mostrarMovimientos();  
        } else {
            mostrarError("error-usuario","Contraseña incorrecta. Inténtelo nuevamente.");
        }
    } else {
        mostrarError("error-contrasena","No se encontró la cuenta con ese nombre.");
    }
}
function mostrarError(idElemento, mensaje) {
    var elementoError = document.getElementById(idElemento);
    elementoError.textContent = mensaje;

    setTimeout(function() {
        elementoError.textContent = '';
    }, 3000);
}

function buscarCuentaPorNombre(nombre) {
    return cuentas.find(function(cuenta) {
        return cuenta.nombre.toLowerCase() === nombre;
    });
}

// enter user
document.getElementById("password").addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        autenticarUsuario();
    }
});

//enter pass
document.getElementById("username").addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        autenticarUsuario();
    }
});

//enter iniciar opcional
/*document.getElementById("login-button").addEventListener('click', function () {
    autenticarUsuario();
}); **/