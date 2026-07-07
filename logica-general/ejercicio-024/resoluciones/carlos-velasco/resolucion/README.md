# Plantilla de solución

## Analisis

* **Entrada**: Un arreglo de objetos `inventario`, donde cada objeto representa una motocicleta con las propiedades `marca`, `cilindraje`, `estado` y `precio`.
* **Proceso**: Iteración sobre cada elemento del inventario mediante un mapeo, aplicando una jerarquía de condiciones (cilindraje y precio/estado) para asignar una nueva propiedad `categoria`.
* **Salida**: Un nuevo arreglo de objetos que incluye todas las propiedades originales más la nueva propiedad `categoria` calculada.

## Reglas identificadas

1. Si el `cilindraje` es > 600, se clasifica como "Alta Gama".
2. Si el `cilindraje` es <= 200 y el `precio` < 5000, se clasifica como "Económica".
3. Si la moto está `usada` y su `precio` < 3000, se clasifica como "Oportunidad"; de lo contrario, se asigna "Estándar".

## Pruebas

### Caso normal

* **Entrada**: `{ marca: "Yamaha", cilindraje: 700, estado: "nueva", precio: 12000 }`
* **Resultado esperado**: `{ marca: "Yamaha", cilindraje: 700, estado: "nueva", precio: 12000, categoria: "Alta Gama" }`

### Caso borde

* **Entrada**: `{ marca: "Suzuki", cilindraje: 250, estado: "usada", precio: 2000 }`
* **Resultado esperado**: `{ marca: "Suzuki", cilindraje: 250, estado: "usada", precio: 2000, categoria: "Oportunidad" }`

## Explicacion final

La solución funciona mediante el método `.map()`, que asegura la transformación de cada elemento del inventario sin alterar los datos originales. La lógica utiliza una estructura de condicionales con prioridad, donde la categoría de "Alta Gama" se evalúa primero para asegurar que las motos más potentes sean etiquetadas correctamente, independientemente de su precio. Al final de la cadena de condiciones, el valor por defecto "Estándar" actúa como una red de seguridad, garantizando que cada motocicleta reciba una clasificación válida sin importar sus características específicas.

## Sugerencia

Convierte cada regla del problema en una condicion clara antes de programar:

* **Regla 1**: `moto.cilindraje > 600`
* **Regla 2**: `moto.cilindraje <= 200 && moto.precio < 5000`
* **Regla 3**: `moto.estado === "usada" && moto.precio < 3000`