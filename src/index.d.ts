/** Calcula el dígito de verificación (0-9) de un NIT sin DV. */
export function calcularDV(nit: string | number): number;

/** Valida un NIT con DV, por ejemplo "800.197.268-4". No lanza errores. */
export function validarNIT(nitConDV: string): boolean;

/** Devuelve el NIT con puntos y DV, por ejemplo "800.197.268-4". */
export function formatearNIT(nit: string | number): string;