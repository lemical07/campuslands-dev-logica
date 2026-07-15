# Plantilla de solucion

## Analisis

* **Entrada:** Un arreglo de números (`puntajesCrudos`), un número (`puntajeMaximo`) y un número para el ajuste de calibración.
* **Proceso:** Normalizar cada valor a una escala de 0-100 aplicando la fórmula $\frac{puntaje}{maximo} \times 100$, sumar el ajuste, aplicar "clamping" para mantener los valores entre 0 y 100, y asignar una categoría (Certificado, Aprobado o Reprobado) según el resultado.
* **Salida:** Un arreglo de objetos conteniendo el puntaje original, el puntaje final calculado y su clasificación de calidad.

## Reglas identificadas

1. **Normalización:** El puntaje base se convierte a base 100 mediante la proporción respecto al máximo.
2. **Restricción (Clamping):** El resultado final no puede ser menor a 0 ni mayor a 100, independientemente del ajuste.
3. **Clasificación:**
* $\ge 90$: "Certificado".
* $\ge 70$: "Aprobado".
* $< 70$: "Reprobado".



## Pruebas

### Caso normal

**Entrada:**
`puntajes: [80, 70], max: 100, ajuste: 5`

**Resultado esperado:**
`[{original: 80, final: "85.00", clasificacion: "Aprobado"}, {original: 70, final: "75.00", clasificacion: "Aprobado"}]`

### Caso borde

**Entrada:**
`puntajes: [10], max: 100, ajuste: -20`

**Resultado esperado:**
`[{original: 10, final: "0.00", clasificacion: "Reprobado"}]`

## Explicacion final

La solución funciona porque utiliza el método `.map()` para transformar los datos de forma inmutable, asegurando que cada puntaje individual pase por un proceso de limpieza. Al integrar `Math.max(0, Math.min(100, final))`, evitamos errores de lógica donde una calibración excesiva pudiera arrojar valores fuera de la escala lógica, garantizando que el sistema de control de calidad sea siempre consistente.

## Sugerencia

Convierte cada regla del problema en una condicion clara antes de programar. En este caso, divide la lógica en: primero normalizar, segundo ajustar, tercero limitar, y cuarto clasificar; esto facilitará enormemente el *debugging* si algún resultado no es el esperado.