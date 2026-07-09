function controlarTemperaturaActuador(actuador) {
    // Caso borde: Datos nulos o temperaturas inferiores al cero absoluto físico
    if (!actuador || actuador.temperaturaActual < -273.15 || actuador.limiteSeguro < -273.15) {
        return {
            cicloVentiladorPWM: 0,
            estadoTermico: "falla_hardware_sensor",
            apagadoEmergencia: false
        };
    }

    const { temperaturaActual, limiteSeguro } = actuador;

    // Proceso: Evaluar regla de negocio para mitigación térmica extrema
    if (temperaturaActual > limiteSeguro) {
        return {
            cicloVentiladorPWM: 100,
            estadoTermico: "critico",
            apagadoEmergencia: true
        };
    }

    // Estado estable: Si no supera el límite, opera de forma regular a mitad de potencia
    return {
        cicloVentiladorPWM: 50,
        estadoTermico: "nominal",
        apagadoEmergencia: false
    };
}

// Ejecución de pruebas para verificar consola
console.log(controlarTemperaturaActuador({
    componente: "Driver de Motores L298N",
    temperaturaActual: 85,
    limiteSeguro: 70
})); // Caso Normal

console.log(controlarTemperaturaActuador({
    componente: "Motor Paso a Paso Nema 17",
    temperaturaActual: -300,
    limiteSeguro: 60
})); // Caso Borde