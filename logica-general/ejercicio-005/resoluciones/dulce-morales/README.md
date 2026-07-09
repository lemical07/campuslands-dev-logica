# Plantilla de solucion

## Analisis

- Entrada: Un objeto `actuador` con las propiedades `componente` (texto), `temperaturaActual` (número) y `limiteSeguro` (número).
- Proceso: Verificar que la temperatura no se encuentre en un rango físicamente imposible de frío absoluto y evaluar el estado térmico para regular de manera automática la velocidad del sistema de enfriamiento (Ventilador/Disipador).
- Salida: Un objeto con el porcentaje de ciclo de trabajo PWM de los ventiladores, el estado térmico del sistema y si se activa o no el apagado de emergencia.

## Reglas identificadas

1. Regla de Mitigación Térmica: Si la `temperaturaActual` supera el `limiteSeguro`, el ciclo PWM de los ventiladores debe subir al máximo (`100`), el estado térmico se define como `"critico"` y el apagado de emergencia se activa en verdadero (`true`).
2. Regla de Cero Absoluto: Si la temperatura ingresada es menor a `-273.15`, se determina una lectura de sensor corrupta o dañada, suspendiendo de inmediato el procesamiento del controlador.

## Pruebas

### Caso normal

Entrada:
actuador: {
  componente: "Driver de Motores L298N",
  temperaturaActual: 85,
  limiteSeguro: 70
}

Resultado esperado:
cicloVentiladorPWM: 100
estadoTermico: "critico"
apagadoEmergencia: true

### Caso borde

Entrada:
actuador: {
  componente: "Motor Paso a Paso Nema 17",
  temperaturaActual: -300,
  limiteSeguro: 60
}

Resultado esperado:
cicloVentiladorPWM: 0
estadoTermico: "falla_hardware_sensor"
apagadoEmergencia: false

## Explicacion final

La solución funciona porque implementa una barrera de seguridad basada en el límite físico del cero absoluto para aislar lecturas rotas o cortocircuitos en el pin analógico. Al pasar esta validación, la lógica compara dinámicamente la temperatura contra el umbral crítico configurado, forzando la modulación por ancho de pulsos (PWM) al 100% y cortando el flujo de corriente mediante el apagado de emergencia para proteger la integridad del circuito de potencia.

## Sugerencia

Convierte cada regla del problema en una condicion clara antes de programar.