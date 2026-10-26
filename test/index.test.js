import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { calcularDV, validarNIT, formatearNIT } from '../src/index.js';

describe('calcularDV', () => {
  test('calcula el DV de NITs conocidos', () => {
    assert.equal(calcularDV('800197268'), 4); // DIAN
    assert.equal(calcularDV('860034313'), 7); // Davivienda
  });

  test('acepta números y entradas con puntos o espacios', () => {
    assert.equal(calcularDV(800197268), 4);
    assert.equal(calcularDV('800.197.268'), 4);
    assert.equal(calcularDV(' 800 197 268 '), 4);
  });

  test('devuelve 0 o 1 cuando el residuo es 0 o 1', () => {
    assert.equal(calcularDV('0'), 0); // suma 0  -> residuo 0
    assert.equal(calcularDV('4'), 1); // suma 12 -> residuo 1
  });

  test('rechaza entradas que no son dígitos', () => {
    assert.throws(() => calcularDV(''), TypeError);
    assert.throws(() => calcularDV('12A45'), TypeError);
    assert.throws(() => calcularDV('800197268-4'), TypeError);
    assert.throws(() => calcularDV(null), TypeError);
    assert.throws(() => calcularDV(undefined), TypeError);
    assert.throws(() => calcularDV({}), TypeError);
  });

  test('rechaza números no enteros o negativos', () => {
    assert.throws(() => calcularDV(1.5), TypeError);
    assert.throws(() => calcularDV(-800197268), TypeError);
    assert.throws(() => calcularDV(NaN), TypeError);
  });

  test('acepta hasta 15 dígitos y rechaza más', () => {
    assert.doesNotThrow(() => calcularDV('1'.repeat(15)));
    assert.throws(() => calcularDV('1'.repeat(16)), RangeError);
  });
});

describe('validarNIT', () => {
  test('acepta NITs con DV correcto en distintos formatos', () => {
    assert.equal(validarNIT('800.197.268-4'), true);
    assert.equal(validarNIT('800197268-4'), true);
    assert.equal(validarNIT('800197268 - 4'), true);
  });

  test('rechaza DV incorrecto', () => {
    assert.equal(validarNIT('800197268-5'), false);
  });

  test('rechaza formatos inválidos sin lanzar error', () => {
    assert.equal(validarNIT('800197268'), false);   // sin DV
    assert.equal(validarNIT('800197268-45'), false); // DV de dos dígitos
    assert.equal(validarNIT('abc-1'), false);
    assert.equal(validarNIT(''), false);
    assert.equal(validarNIT(800197268), false);      // no es string
    assert.equal(validarNIT(null), false);
  });
});

describe('formatearNIT', () => {
  test('formatea con puntos y DV', () => {
    assert.equal(formatearNIT('800197268'), '800.197.268-4');
    assert.equal(formatearNIT(860034313), '860.034.313-7');
  });

  test('funciona con NITs cortos y ya formateados', () => {
    assert.equal(formatearNIT('4'), '4-1');
    assert.equal(formatearNIT('800.197.268'), '800.197.268-4');
  });

  test('propaga el error con entradas inválidas', () => {
    assert.throws(() => formatearNIT('abc'), TypeError);
  });
});