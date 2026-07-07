# Ejercicio 024: Motor de Control de Inventario y Seguridad (Concesionario de Motocicletas)

## Análisis del Problema

El objetivo es desarrollar un componente de software para la gestión de inventario de un concesionario y taller de motocicletas que evalúe el estado físico y legal de los vehículos en stock, aplicando prioridades dinámicas para detener o desviar el flujo de venta ante cualquier bloqueo técnico, avería o restricción legal.

* **Entrada:** Un objeto contenedor con la siguiente firma:
    * `motos`: Array de Strings (Estados del stock de vehículos: `"disponible"`, `"pendiente"`, `"bloqueado"`).
    * `prioridad`: String (Nivel de prisa comercial o del taller: `"alta"`, `"media"`, `"baja"`).
    * `criterio`: String (Instrucción específica o directiva dada al sistema, ej: `"revisar bloqueados primero"`).
* **Proceso:** 1. Validar inicialmente mediante cláusulas de guarda que la lista no esté vacía ni los strings de control falten para mitigar excepciones de lectura en memoria.
    2. Estandarizar todas las cadenas de texto recibidas a minúsculas (`.toLowerCase()`) para asegurar un procesamiento seguro y tolerante a fallos de formato.
    3. Evaluar de manera jerárquica las condiciones críticas del inventario (regla de bloqueo activa + elemento `"bloqueado"` real).
    4. Resolver flujos secundarios como despachos urgentes pendientes o ventas libres directas en piso empleando la técnica de *Early Returns*.
* **Salida:** Un objeto con la estructura estricta: `{ accion: string, motivo: string }`.

---

## Reglas de Negocio

1. **Garantía y Seguridad Primero:** Si el `criterio` exige exactamente `"revisar bloqueados primero"` y se encuentra al menos una motocicleta en estado `"bloqueado"` (por avería, papeles incompletos o alertas de fábrica), se interrumpe de inmediato cualquier flujo de venta para mitigar responsabilidades legales devolviendo la acción `"revisar bloqueado"`.
2. **Desembotellamiento de Reservas:** Si el sistema está libre de bloqueos críticos pero la `prioridad` es `"alta"`, los vehículos en estado `"pendiente"` (apartados o pre-vendidos) se procesan prioritariamente para cumplir con los tiempos de entrega pactados devolviendo la acción `"procesar apartados"`.
3. **Disponibilidad Comercial Plena:** Si no existen restricciones críticas ni pedidos urgentes pendientes en el lote analizado, las motocicletas en estado `"disponible"` se destinan a flujo de exhibición y venta directa devolviendo la acción `"habilitar venta"`.
4. **Control de Inventario Vacío (Caso Borde):** Ante la total ausencia de datos de vehículos en el lote de entrada (arreglo vacío), el sistema se protege de forma segura retornando la acción `"pausar asignaciones"`.

---

## Casos de Prueba

### 1. Interrupción por Vehículo Bloqueado (Caso Normal)
* **Entrada:**
    ```json
    {
      "motos": ["disponible", "pendiente", "bloqueado"],
      "prioridad": "alta",
      "criterio": "revisar bloqueados primero"
    }
    ```
* **Resultado esperado:**
    ```json
    {
      "accion": "revisar bloqueado",
      "motivo": "Se detectaron motocicletas bloqueadas bajo directriz de revisión prioritaria. Flujo comercial detenido por seguridad."
    }
    ```

### 2. Priorización de Entregas y Reservas (Caso Alterno)
* **Entrada:**
    ```json
    {
      "motos": ["disponible", "pendiente"],
      "prioridad": "alta",
      "criterio": "revisar bloqueados primero"
    }
    ```
* **Resultado esperado:**
    ```json
    {
      "accion": "procesar apartados",
      "motivo": "Stock libre de bloqueos críticos. Se prioriza el despacho de vehículos en estado pendiente por alta demanda comercial."
    }
    ```

### 3. Activación de Guarda por Lote Vacío (Caso Borde)
* **Entrada:**
    ```json
    {
      "motos": [],
      "prioridad": "baja",
      "criterio": "revisar bloqueados primero"
    }
    ```
* **Resultado esperado:**
    ```json
    {
      "accion": "pausar asignaciones",
      "motivo": "Ausencia total de unidades evaluables en el lote de inventario recibido. Procesamiento suspendido."
    }
    ```

---

## Arquitectura de la Solución

La solución utiliza el patrón de diseño de Cláusulas de Guarda (*Guard Clauses*) coordinado con retornos anticipados (*Early Returns*) para sanear el flujo de control de la aplicación. Al evaluar y abortar el procesamiento al inicio de la función en caso de colecciones vacías o argumentos inválidos, evitamos el anidamiento innecesario de bloques `if/else` (*Arrow Anti-pattern*). La búsqueda de estados específicos dentro del array aprovecha métodos nativos optimizados del motor V8 de JavaScript, manteniendo una complejidad de tiempo en el peor de los casos de $O(n)$ y una estructura de código limpia, modular y altamente mantenible.

---

## Ejecución del Módulo

1. Asegúrate de contar con [Node.js](https://nodejs.org/) instalado en tu estación de trabajo (versión LTS recomendada).
2. Abre la consola de comandos o terminal en el directorio raíz de este ejercicio.
3. Ejecuta el script de la solución utilizando el comando:
    ```bash
    node maria-montepeque.js
    ```