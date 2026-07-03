
# Reto: Motor de Búsqueda y Coincidencia de Elementos - Autos Hiperdeportivos 🏎️
## Módulo: Lógica de Programación - Campuslands

Este repositorio contiene la arquitectura lógica y la solución en código para el reto de búsqueda de elementos y validación de perfiles técnicos en el sector de los autos hiperdeportivos. A diferencia de los turnos de atención jerárquica (*Triage*), este ejercicio implementa un **algoritmo de búsqueda de patrones por atributos (Pattern Matching)** para clasificar elementos en un ecosistema de datos discretos.

---

## 🎯 Objetivo del Reto

Construir un script interactivo por interfaz de línea de comandos (CLI) que reciba los atributos técnicos de un vehículo, los compare contra un perfil de ingeniería indexado y devuelva si el elemento coincide (total o parcialmente) con los criterios de búsqueda establecidos.

---

## 🧠 Arquitectura de la Solución y Flujo Lógico

El flujo del programa fue desarrollado en Python bajo un enfoque de **evaluación matricial de banderas booleanas**. En lugar de procesar los datos de entrada de manera cruda, el sistema evalúa primero las capacidades físicas del vehículo para encender o apagar interruptores lógicos (`True`/`False`), los cuales son procesados posteriormente por un motor de coincidencia compuesto.


### 1. Atributos del Objeto de Búsqueda (Inputs)
* **`modelo`**: Identificador nominal del vehículo (`str`), normalizado con `.strip().capitalize()`.
* **`velocidad_maxima`**: Métrica de rendimiento de velocidad en km/h (`int`).
* **`caballos_fuerza`**: Métrica de potencia mecánica en HP (`int`).
* **`produccion_limitada`**: Criterio de exclusividad de mercado comercial (`str`).

### 2. Reglas del Perfil de Búsqueda (Matching Rules)
El sistema utiliza álgebra de Boole para determinar la coincidencia del elemento en tres niveles de precisión:

1. **Coincidencia Total (Hypercar):** Se implementa una compuerta estricta **`and`**. El vehículo debe registrar una velocidad $\ge 400$ km/h, una potencia $\ge 1000$ HP **Y** poseer una bandera de producción limitada afirmativa. Al cumplirse las tres de manera simultánea, el elemento es indexado con éxito.
2. **Coincidencia Parcial (Supercar):** Si la compuerta estricta falla, el sistema evalúa el entorno mediante una compuerta inclusiva **`or`**. Si el vehículo cumple con velocidad extrema ($\ge 400$ km/h) **O** con potencia extrema ($\ge 1000$ HP), se le cataloga como una coincidencia parcial de alto rendimiento.
3. **Falta de Coincidencia:** Si el elemento no enciende ninguna de las banderas de rendimiento, el bloque `else` actúa como un recolector por defecto, denegando el estatus especial e indexándolo como un vehículo deportivo estándar.

### 3. Reporte de Indexación (Output)
La solución genera una interfaz de salida limpia mediante *f-strings*, entregando el estado exacto del motor de búsqueda y un dictamen técnico legible para el operador del sistema.

---

## 🛠️ Conceptos de Programación Practicados

* **Búsqueda Basada en Atributos:** Diseño de algoritmos que validan la identidad de un objeto según sus propiedades cuantitativas y cualitativas.
* **Combinación de Conectores Lógicos (`and` / `or`):** Uso estratégico de operadores restrictivos e inclusivos en una misma estructura jerárquica para generar salidas intermedias (coincidencias parciales).
* **Sanitización de Datos (`.strip()`):** Remoción preventiva de espacios en blanco accidentales que el usuario pudiera ingresar en la consola de la Mac, protegiendo la integridad de las comparaciones de texto.