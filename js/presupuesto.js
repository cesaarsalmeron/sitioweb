function validarFormulario() {
    let validado = true;

    // Validación de nombre (solo letras, máximo 15 caracteres)
    const nombre = document.getElementById('nombre').value;
    const nombreRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (!nombreRegex.test(nombre) || nombre.length > 15) {
        document.getElementById('nombre-error').textContent = "El nombre debe contener solo letras y no exceder los 15 caracteres.";
        validado = false;
    } else {
        document.getElementById('nombre-error').textContent = "";
    }

    // Validación de apellidos (solo letras, máximo 40 caracteres)
    const apellidos = document.getElementById('apellidos').value;
    if (!nombreRegex.test(apellidos) || apellidos.length > 40) {
        document.getElementById('apellidos-error').textContent = "Los apellidos deben contener solo letras y no exceder los 40 caracteres.";
        validado = false;
    } else {
        document.getElementById('apellidos-error').textContent = "";
    }

    // Validación de teléfono (solo números, máximo 9 caracteres)
    const telefono = document.getElementById('telefono').value;
    const telefonoRegex = /^[0-9]{9}$/;
    if (!telefonoRegex.test(telefono)) {
        document.getElementById('telefono-error').textContent = "El teléfono debe tener 9 dígitos numéricos.";
        validado = false;
    } else {
        document.getElementById('telefono-error').textContent = "";
    }

    // Validación de correo electrónico
    const email = document.getElementById('email').value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        document.getElementById('email-error').textContent = "El correo electrónico no es válido.";
        validado = false;
    } else {
        document.getElementById('email-error').textContent = "";
    }

    return validado;
}

function actualizarPresupuesto() {
    const producto = document.getElementById('producto');
    const plazo = document.getElementById('plazo').value;
    const extras = document.querySelectorAll('input[name="extras"]:checked');
    let precioProducto = parseFloat(producto.options[producto.selectedIndex].getAttribute('data-price'));
    let totalExtras = 0;

    // Calcular total de extras
    extras.forEach(extra => {
        totalExtras += parseFloat(extra.value);
    });

    // Aplicar descuento por plazo
    let descuento = 0;
    if (plazo <= 30) {
        descuento = 0; // Sin descuento
    } else if (plazo <= 60) {
        descuento = 0.1; // 10% de descuento
    } else {
        descuento = 0.2; // 20% de descuento
    }

    // Calcular el presupuesto final
    const total = (precioProducto + totalExtras) * (1 - descuento);
    document.getElementById('total').value = total.toFixed(2) + " €";
}

// Actualización del presupuesto en tiempo real
document.getElementById('producto').addEventListener('change', actualizarPresupuesto);
document.getElementById('plazo').addEventListener('input', actualizarPresupuesto);
document.querySelectorAll('input[name="extras"]').forEach(extra => {
    extra.addEventListener('change', actualizarPresupuesto);
});
