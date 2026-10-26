# @novadeveloper/nit-dv

Calcula, valida y formatea el dígito de verificación (DV) del NIT colombiano.
Sin dependencias.

## Instalación

```bash
npm install @novadeveloper/nit-dv
```

## Uso como librería

```js
import { calcularDV, validarNIT, formatearNIT } from '@novadeveloper/nit-dv';

calcularDV('800197268');        // 4
validarNIT('800.197.268-4');    // true
validarNIT('800197268-5');      // false
formatearNIT(800197268);        // "800.197.268-4"
```

`calcularDV` y `formatearNIT` lanzan `TypeError` o `RangeError` si la entrada
no es válida. `validarNIT` nunca lanza: devuelve `false`.

## Uso desde la terminal

```bash
npx @novadeveloper/nit-dv 800197268       # 4
npx @novadeveloper/nit-dv 800197268-4     # válido
npx @novadeveloper/nit-dv -f 800197268    # 800.197.268-4
```

Códigos de salida: `0` correcto o válido, `1` NIT inválido, `2` uso incorrecto.

## Cómo funciona

Cada dígito del NIT, de derecha a izquierda, se multiplica por un peso
(3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71). Se suman los
productos y se calcula el residuo al dividir entre 11. Si el residuo es 0 o 1,
ese es el DV; si no, el DV es 11 menos el residuo.

## Licencia

MIT