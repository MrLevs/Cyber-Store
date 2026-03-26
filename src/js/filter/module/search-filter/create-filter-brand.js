'use strict';

export function createFilterBrand(elem, arrayProduct) {
  elem.innerHTML = '';

  arrayProduct.sort().forEach(item => {
    const div = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const spanCheckbox = document.createElement('span');
    const spanName = document.createElement('span');
    const spanCount = document.createElement('span');

    div.className = 'filters__inner';
    label.className = 'filters__label';
    label.setAttribute('for', `brand-${item}`);
    label.setAttribute('tabindex', '0');

    input.className = 'filters__input';
    input.setAttribute('id', `brand-${item}`);
    input.setAttribute('type', 'checkbox');
    input.setAttribute('value', `${item}`);
    input.setAttribute('tabindex', '-1');

    spanCheckbox.className = 'filters__checkbox';
    spanName.className = 'filters__name';

    if (item === 'oppo' || item === 'poco') {
      spanName.textContent = `${item.toUpperCase()} `;
    } else {
      spanName.textContent = `${item[0].toUpperCase()}${item.slice(1).toLowerCase()} `;
    }

    spanCount.className = 'filters__count';
    spanCount.setAttribute('data-brand', `${item}`);

    spanName.append(spanCount);
    label.append(spanCheckbox);
    label.append(spanName);
    div.append(label);
    div.append(input);

    elem.append(div);
  });
}
