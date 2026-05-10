function sendMessage() {
    try {
    // Obtengo los valores
    const origen = document.getElementById("origen").value;
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const consulta = document.getElementById("consulta").value;

    // Tu número de WhatsApp en formato internacional
    const phone = "543515957014";

    // Armo el mensaje
    let messageText = `Hola, soy ${fullName}.\n`;
    messageText += `Llegué a tu web por ${origen}.\n`;
    if (email) {
        messageText += `Mi email es ${email}.\n`;
    }
    if (consulta) {
        messageText += `Quería consultar ${consulta}.\n`;
    }

    // URL de WhatsApp
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(messageText)}`;

    // Abrir en nueva pestaña
    window.open(url, "_blank");
    } catch (e) {
        console.error("Error al enviar mensaje:", e);
    }

    return false; // Evita que el formulario se envíe de forma tradicional
}