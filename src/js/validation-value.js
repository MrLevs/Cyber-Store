'use strict';

export function validationAll(value) {
  const pattern = /^[a-zа-я\d\s-]+$/gi;
  return pattern.test(value);
}

export function validationWS(value) {
  const pattern = /^[a-zа-я\s-]+$/gi;
  return pattern.test(value);
}

export function validationNumber(value, number) {
  let val;
  if (value.length > number) {
    val = value.slice(0, number);
  } else {
    val = value;
  }
  return val;
}
