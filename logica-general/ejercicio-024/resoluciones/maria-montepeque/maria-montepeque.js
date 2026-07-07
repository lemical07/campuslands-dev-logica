//Solución Ejercicio 024 - Filtros por condiciones

function filtrarInventarioMotos(motos, prioridad, criterio) {
    // 1. Casos Borde Estructurales
    if (!Array.isArray(motos) || motos.length === 0) {
        return {
            accion: "ninguna",
            motivo: "El inventario está vacío o los datos ingresados no son válidos."
        };
    }

    const prioridadLimpia = String(prioridad || 'baja').toLowerCase().trim();
    const criterioLimpio = String(criterio || '').toLowerCase().trim();

    // 2. Indexación Analítica O(N): Mapeo a Set para lookup inmediato O(1)
    const setMotos = new Set(motos.map(moto => String(moto).toLowerCase().trim()));
    const tieneBloqueado = setMotos.has("bloqueado");
    const tienePendiente = setMotos.has("pendiente");
    const tieneDisponible = setMotos.has("disponible") || setMotos.has("aprobado");

    // 3. Matriz de Decisiones de Seguridad y Logística Vehicular
    if (tieneBloqueado && (criterioLimpio.includes("bloqueado") || criterioLimpio.includes("mantenimiento"))) {
        return {
            accion: "revisar bloqueado",
            motivo: "La regla prioriza la inspección de motos retenidas o bloqueadas por fallas de seguridad antes de gestionar las ventas."
        };
    }

    if (tieneBloqueado) {
        return {
            accion: "auditar lote",
            motivo: "Alerta de inventario: Existen motocicletas retenidas en el lote bajo análisis. Se requiere una auditoría manual por seguridad."
        };
    }

    // Regla 2: Alta demanda o reservas en espera
    if (prioridadLimpia === "alta" && tienePendiente) {
        return {
            accion: "despachar pedido pendiente",
            motivo: "La alta prioridad del sistema exige liberar los vehículos con asignaciones pendientes con urgencia."
        };
    }

    // Regla 3: Flujo ordinario de ventas
    if (tieneDisponible) {
        return {
            accion: "procesar venta disponible",
            motivo: "La motocicleta se encuentra aprobada y lista para exhibición o entrega inmediata."
        };
    }

    // 4. Estado por defecto de contingencia general
    return {
        accion: "auditar lote",
        motivo: "Los estados del inventario actual requieren una revisión manual por el supervisor."
    };
}

console.log("--- EJECUTANDO PRUEBAS - EJERCICIO 024 ---");

const pruebas = [
    {
        tipo: "Caso Normal (Guía) - Prioridad de Mantenimiento",
        motos: ["disponible", "pendiente", "bloqueado"], prioridad: "alta", criterio: "revisar bloqueados primero"
    },
    {
        tipo: "Caso Inseguro Corregido - Intento de evasión de Bloqueo Crítico",
        motos: ["disponible", "bloqueado"], prioridad: "alta", criterio: "priorizar entregas"
    },
    {
        tipo: "Caso Propio - Despacho de Pendientes Limpios",
        motos: ["disponible", "pendiente"], prioridad: "alta", criterio: "priorizar entregas"
    },
    {
        tipo: "Caso Borde - Colección Estructural Vacía",
        motos: [], prioridad: "baja", criterio: "revisar bloqueados primero"
    }
];

pruebas.forEach(({ tipo, motos, prioridad, criterio }) => {
    console.log(`\n[${tipo}]`);
    console.log(JSON.stringify(filtrarInventarioMotos(motos, prioridad, criterio), null, 2));
});