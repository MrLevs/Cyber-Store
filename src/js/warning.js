'use strict';

export function displayWarningInputSearch(message, resultSuggests, input) {
  const span = document.createElement('span');
  span.setAttribute('role', 'alert');
  span.className = 'form-search__warning';
  span.textContent = message;

  resultSuggests.innerHTML = '';
  input.classList.add('form-search__input_warning');
  resultSuggests.append(span);
  resultSuggests.classList.add('form-search__suggests_warning');
  resultSuggests.style.display = 'block';
}

export function showWarningInputAddAddress(input, message) {
  const container = input.parentNode.querySelector('.payment__warning');
  const span = document.createElement('span');
  span.setAttribute('role', 'alert');
  span.className = 'payment__alert-error';
  span.textContent = message;

  container.innerHTML = '';
  input.classList.add('payment__form-add-address-input_warning');
  container.append(span);
  container.classList.add('payment__warning_warning');
  container.style.display = 'block';
}
