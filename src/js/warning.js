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

export function showWarningInput(input, message) {
  const container = input.parentNode.querySelector('.warning');
  const span = document.createElement('span');
  span.setAttribute('role', 'alert');
  span.className = 'warning__alert-error';
  span.textContent = message;

  container.innerHTML = '';
  input.classList.add('warning__input');
  container.append(span);
  container.classList.add('warning_alert');
  container.style.display = 'block';
}

export function removeWarning(item) {
  const blockWarning = item.parentElement.querySelector('.warning');

  if (item.classList.contains('warning__input')) {
    item.classList.remove('warning__input');
  }

  if (blockWarning && blockWarning.classList.contains('warning_alert')) {
    blockWarning.innerHTML = '';
    blockWarning.classList.remove('warning_alert');
    blockWarning.style.display = 'none';
  }
}
