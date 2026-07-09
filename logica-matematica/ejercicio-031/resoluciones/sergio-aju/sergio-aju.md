# Ejercicio 031 - Conteo Combinatorio en Kickboxing

## Autor: 

Sergio Ajú

## Analisis

- **Entrada**: 
  - `participantes`: Arreglo de números enteros.
  - `bono`: Valor numérico a sumar.
  - `penalizacion`: Valor numérico a restar.
- **Proceso**: 
  - Cálculo de la suma total del arreglo.
  - Aplicación de ajustes (bono y penalización).
  - Clasificación del resultado final según umbrales predefinidos.
- **Salida**: 
  - Objeto conteniendo el puntaje final, la clasificación obtenida y una breve explicación.

## Reglas identificadas

1. **Sumatoria**: El puntaje base se obtiene sumando todos los valores de la lista de participantes.
2. **Modificadores**: Se suma el bono al puntaje base y se resta la penalización.
3. **Clasificación**: 
   - `> 50`: "profesional"
   - `20 - 50`: "competitivo"
   - `< 20`: "amateur"

## Pruebas

### Caso normal

**Entrada**: 
```javascript
participantes: [12, 18, 25, 30], bono: 8, penalizacion: 3