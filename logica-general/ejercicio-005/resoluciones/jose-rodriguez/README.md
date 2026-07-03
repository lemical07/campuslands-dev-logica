# Reto: Sistema de Ordenamiento de Prioridades - Taller Mecánico 👨‍🔧
## Módulo: Lógica de Programación - Campuslands

Este repositorio contiene la arquitectura lógica y el código de resolución para el reto de ordenamiento de prioridades en un taller de servicio automotriz. A diferencia de los filtros restrictivos (*operaciones puramente binarias*), este ejercicio implementa un **algoritmo de clasificación jerárquica (Triage)** para optimizar la asignación de recursos y tiempos de respuesta operativos.

---

## 🎯 Objetivo del Reto

Construir un script interactivo por consola (CLI) que reciba el estado de un vehículo, evalúe factores de riesgo y variables logísticas, y asigne de manera inequívoca un nivel de prioridad y una ruta de acción inmediata dentro del taller.

---

## 🧠 Arquitectura de la Solución y Flujo Lógico

El flujo del programa se diseñó en Python utilizando un **embudo secuencial de prioridad descendente** (`if-elif-else`). La premisa clave es que las variables de alto impacto técnico o de seguridad humana actúan como "mecanismos de interrupción", absorbiendo el flujo antes de evaluar condiciones comerciales u operativas estándar.


### 1. Variables de Captura de Estado (Inputs)
* **`cliente`**: Nombre del operador o propietario (`str`).
* **`tipo_vehiculo`**: Categoría del transporte (`str`), estandarizada mediante `.capitalize()`.
* **`motivo_ingreso`**: Diagnóstico inicial reportado (`str`).
* **`es_emergencia`**: Bandera de texto condicional (`"Si"`/`"No"`) que mide el riesgo de seguridad.

### 2. Motor de Triage y Reglas de Negocio
El ordenamiento se ejecuta bajo la siguiente jerarquía estricta de evaluación de arriba hacia abajo:

1. **Prioridad Crítica (Nivel 1):** Controlado por una compuerta inclusiva (`or`). Si el vehículo viene por `Accidente` **O** la bandera `es_emergencia` es verdadera, el hilo lógico se detiene inmediatamente, asignando atención de emergencia y un tiempo de entrega de 1 día.
2. **Prioridad Alta (Nivel 2):** Controlado por el bloque `elif`. Si el caso no es crítico pero el motivo es una `Falla eléctrica`, se prioriza su diagnóstico temprano (3 días de entrega) debido a la complejidad del software automotriz.
3. **Prioridad Media-Alta (Nivel 3):** Evaluada mediante el tipo de hardware. Si el vehículo es un `Camión` (transporte comercial/pesado), se prioriza sobre los vehículos particulares para minimizar pérdidas económicas por inactividad comercial (4 días de entrega).
4. **Prioridad Estándar (Nivel 4):** El bloque `else` actúa como la cola de espera genérica para mantenimientos preventivos o reparaciones comunes en autos o motos particulares (5 días de entrega).

### 3. Reporte de Salida Dinámico (Output)
La consola emite un reporte formateado utilizando *f-strings* que consolida la prioridad numérica calculada, la acción operativa directa que debe tomar el jefe de taller y los días estimados de resolución.

---

## 🛠️ Conceptos de Programación Practicados

* **Clasificación por Jerarquía Dinámica:** Dominio de flujos condicionales ordenados críticamente de mayor a menor impacto de negocio.
* **Mecanismos de Escape Próximos:** Comprensión de cómo un bloque condicional estructurado ignora evaluaciones secundarias redundantes una vez que una prioridad alta es interceptada.
* **Normalización de Cadenas (`.capitalize()`):** Mecanismo defensivo para estandarizar las entradas de texto del operador del taller.

---