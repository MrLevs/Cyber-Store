'use strict';

export function validationAll(value) {
  const pattern = /^[a-zа-я\d\s-]+$/gi;
  return pattern.test(value);
}

export function validationWS(value) {
  const pattern = /^[a-zа-я\s]+$/gi;
  return pattern.test(value);
}
