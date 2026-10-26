const PESOS = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];

/**
 * Quita puntos y espacios y verifica que solo queden dígitos.
 * @param {string | number} valor
 * @returns {string}
 */
function soloDigitos(valor) {
    if (typeof valor === 'number' && !Number.isSafeInteger(valor)) {
        throw new TypeError('Si el NIT es un número, debe ser un entero seguro');
    }
    if (typeof valor === 'number' && valor < 0) {
        throw new TypeError('El NIT no puede ser negativo');
    }
    const limpio = String(valor).replace(/[.\s]/g, '');
    if (!/^\d+$/.test(limpio)) {
        throw new TypeError('El NIT solo puede contener dígitos, puntos y espacios');
    }
    if (limpio.length > PESOS.length) {
        throw new RangeError(`El NIT no puede tener más de ${PESOS.length} dígitos`);
    }
    return limpio;
}

/**
 * Calcula el dígito de verificación de un NIT (sin DV).
 * @param {string | number} nit
 * @returns {number}
 */
export function calcularDV(nit) {
    const digitos = soloDigitos(nit);
    let suma = 0;
    for (let i = 0; i < digitos.length; i++) {
        // De derecha a izquierda: el último dígito usa el primer peso
        suma += Number(digitos[digitos.length - 1 - i]) * PESOS[i];
    }
    const residuo = suma % 11;
    return residuo > 1 ? 11 - residuo : residuo;
}

/**
 * Valida un NIT con DV, por ejemplo "800.197.268-4".
 * @param {string} nitConDV
 * @returns {boolean}
 */
export function validarNIT(nitConDV) {
    if (typeof nitConDV !== 'string') return false;
    const partes = nitConDV.split('-');
    if (partes.length !== 2 || !/^\d$/.test(partes[1].trim())) return false;
    try {
        return calcularDV(partes[0]) === Number(partes[1]);
    } catch {
        return false;
    }
}

/**
 * Devuelve el NIT formateado con su DV: "800.197.268-4".
 * @param {string | number} nit
 * @returns {string}
 */
export function formatearNIT(nit) {
    const digitos = soloDigitos(nit);
    const conPuntos = digitos.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${conPuntos}-${calcularDV(digitos)}`;
}