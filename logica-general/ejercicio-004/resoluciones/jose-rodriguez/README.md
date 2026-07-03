# Reto: Sistema de Filtros de Inventario - Motocicletas 🏍️
## Módulo: Lógica de Programación - Campuslands

Este repositorio contiene la arquitectura lógica y la documentación de la solución para el reto de filtrado condicional aplicado a un inventario de motos. A diferencia de los motores de decisión basados en ramificaciones (*árboles de decisión*), este ejercicio se enfoca en el **procesamiento simultáneo de reglas cruzadas mediante álgebra de Boole y operadores lógicos**.

---

## 🎯 Objetivo del Reto

Construir una solución interactiva por consola que evalúe las especificaciones de un artículo (motocicleta) contra un set predefinido de criterios restrictivos y preferenciales, determinando de forma binaria (Aprobado/Rechazado) si el producto pasa el control de búsqueda del inventario.

---

## 🧠 Arquitectura de la Solución y Flujo Lógico

El programa fue implementado en Python bajo un enfoque de **evaluación predictiva**. En lugar de usar múltiples condicionales anidados complejos, se optó por aislar las reglas de negocio en variables booleanas independientes para luego cruzarlas en una única compuerta lógica.

---

### 1. Variables de Captura (Inputs)
Para describir el artículo del inventario, el sistema recopila de forma interactiva diferentes tipos de datos nativos:
* **`marca`**: Cadena de texto (`str`) estandarizada automáticamente con el método `.capitalize()`.
* **`cilindrada`**: Valor numérico entero (`int`) que representa la potencia en centímetros cúbicos (CC).
* **`precio`**: Valor numérico decimal de punto flotante (`float`) para la gestión monetaria exacta.
* **`tipo`**: Cadena de texto (`str`) descriptiva sobre la categoría de uso de la motocicleta.

---

### 2. Capa de Reglas de Negocio (Filtros Condicionales)
La lógica del buscador se desglosó en tres criterios matemáticos específicos, combinando operadores de comparación y operadores lógicos:

* **Inclusión de Marca (`or`):** Permite flexibilidad al validar si la propiedad coincide con `"Honda"` **O** `"Yamaha"`. Si cualquiera es verdadera, el filtro de marca se aprueba.
  $$\text{condicion\_marca} = (\text{marca} == \text{"Honda"} \lor \text{marca} == \text{"Yamaha"})$$
* **Rango de Cilindrada (`and`):** Restringe estrictamente que el motor esté en un espectro urbano, obligando a que sea mayor o igual a 125 CC **Y** menor o igual a 250 CC de forma simultánea.
  $$\text{condicion\_cilindrada} = (\text{cilindrada} \ge 125 \land \text{cilindrada} \le 250)$$
* **Límite Presupuestario:** Filtro lineal que descarta cualquier artículo que supere el tope de costo establecido ($\le 25000$).

---

### 3. Procesamiento y Conector Lógico Restrictivo
Para la toma de decisión final, el flujo condicional ejecuta una operación distributiva estricta utilizando el conector **`and`**:

```python
if condicion_marca and condicion_cilindrada and condicion_precio:
    # El artículo cumple con el 100% de las expectativas