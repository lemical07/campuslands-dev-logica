# Reto: Detector de Inconsistencias Lógicas - Playlist Musical 🎵
## Módulo: Lógica de Programación - Campuslands

Este repositorio contiene la arquitectura lógica y la solución automatizada para el reto de auditoría e integridad de datos aplicado a metadatos de archivos musicales. A diferencia de los motores de búsqueda de patrones o asignación de turnos, este ejercicio se enfoca en la **detección y aislamiento de anomalías estructurales mediante comparadores de desigualdad y lógica booleana**.

---

## 🎯 Objetivo del Reto

Construir un script interactivo por interfaz de línea de comandos (CLI) capaz de contrastar los datos declarados en el encabezado de una estructura de datos (*playlist*) contra la sumatoria real de sus componentes elementales (*tracks*), determinando con precisión si el archivo sufre de corrupción de metadatos o desfase de tiempo.

---

## 🧠 Arquitectura de la Solución y Flujo Lógico

El programa fue desarrollado en Python bajo el principio de **aislamiento de banderas de error (Error Flags)**. El sistema no procesa las condiciones directamente en el flujo principal del control; primero ejecuta la aritmética y enciende interruptores de desigualdad (`!=`) para alimentar un motor de diagnóstico jerárquico.

### 1. Variables del Sistema de Audio (Inputs)
* **`nombre_playlist`**: Identificador cualitativo de la lista (`str`).
* **`cantidad_reportada`**: Volumen de pistas declarado en el encabezado (`int`).
* **`duracion_reportada`**: Tiempo total acumulado declarado en segundos (`int`).
* **`cancion_[1-3]_segundos`**: Variables atómicas que representan la duración discreta de cada pista (`int`).

### 2. Reglas de Validación de Integridad (Auditing Rules)
El sistema evalúa de forma paralela dos leyes fundamentales de consistencia indexando los resultados en variables de tipo booleano:

* **Consistencia del Contador:** Verifica si la cantidad declarada difiere de la cantidad física real de elementos inyectados en el buffer de datos ($3$).
  $$\text{inconsistencia\_contador} = (\text{cantidad\_reportada} \neq \text{cantidad\_real})$$
* **Consistencia Cronológica:** Aplica una función de agregación (suma) sobre el desglose de canciones y contrasta si el resultado difiere del tiempo reportado en el encabezado global.
  $$\text{inconsistencia\_tiempo} = (\text{duracion\_reportada} \neq \sum \text{canciones})$$

### 3. Matriz de Diagnóstico Condicional
A través de un bloque secuencial `if-elif-else`, el sistema analiza las banderas para emitir un dictamen específico por descarte:
1. **Fallo Simultáneo (`if` compuesto con `and`):** Si ambas banderas operan en `True`, el sistema declara el estado crítico de corrupción total.
2. **Fallo de Metadatos (`elif` atómico):** Aísla si el error radica puramente en el contador de pistas.
3. **Fallo de Desfase (`elif` atómico):** Aísla si el error se debe a una discrepancia matemática en los segundos acumulados.
4. **Estado Óptimo (`else`):** Si ninguna bandera de error fue activada, el sistema valida la sincronización e integridad de la playlist.

---

## 🛠️ Conceptos de Programación Practicados

* **Operadores de Desigualdad (`!=`):** Uso de comparadores lógicos orientados a la detección temprana de discrepancias en bases de datos.
* **Funciones de Agregación Aritmética:** Consolidación de sub-métricas numéricas para auditorías cruzadas.
* **Aislamiento de Diagnósticos:** Estructuración de condicionales jerárquicos capaces de separar causas raíces específicas de un error sistémico.
