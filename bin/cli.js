#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { calcularDV, validarNIT, formatearNIT } from '../src/index.js';

const AYUDA = `nit-dv - Dígito de verificación del NIT colombiano

Uso:
  nit-dv <nit>           Imprime el DV         nit-dv 800197268    -> 4
  nit-dv <nit>-<dv>      Valida el NIT         nit-dv 800197268-4  -> válido
  nit-dv -f <nit>        Imprime con formato   nit-dv -f 800197268 -> 800.197.268-4

Opciones:
  -f, --formato    Muestra el NIT formateado con su DV
  -v, --version    Muestra la versión
  -h, --help       Muestra esta ayuda

Códigos de salida: 0 correcto o válido, 1 NIT inválido, 2 uso incorrecto.
`;

function main(args) {
  if (args.includes('-h') || args.includes('--help')) {
    console.log(AYUDA);
    return 0;
  }

  if (args.includes('-v') || args.includes('--version')) {
    const pkg = JSON.parse(
      readFileSync(new URL('../package.json', import.meta.url), 'utf8')
    );
    console.log(pkg.version);
    return 0;
  }

  const formato = args.includes('-f') || args.includes('--formato');
  const nits = args.filter((a) => !a.startsWith('-'));

  if (nits.length !== 1) {
    console.error(AYUDA);
    return 2;
  }

  const entrada = nits[0];

  try {
    if (formato) {
      console.log(formatearNIT(entrada));
      return 0;
    }
    if (entrada.includes('-')) {
      const valido = validarNIT(entrada);
      console.log(valido ? 'válido' : 'inválido');
      return valido ? 0 : 1;
    }
    console.log(calcularDV(entrada));
    return 0;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return 2;
  }
}

process.exitCode = main(process.argv.slice(2));