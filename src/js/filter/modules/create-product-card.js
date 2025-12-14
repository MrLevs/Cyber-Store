'use strict';

export function createProductCard(elem, array) {
  elem.innerHTML = '';
  array.forEach(item => {
    const productCard = document.createElement('article');
    const btnProductCard = document.createElement('button');
    const svgProductCard = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const useProductCard = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    const innerProductCard = document.createElement('div');
    const imgProductCard = document.createElement('img');
    const titleProductCard = document.createElement('h3');
    const priceProductCard = document.createElement('p');
    const linkProductCard = document.createElement('a');

    let productCardInfo = `${item.brand} ${item.name} ${item.memory}GB ${item.color} (${item.serial})`;

    productCard.className = 'product-card';
    btnProductCard.className = 'product-card__btn';
    btnProductCard.setAttribute('aria-label', 'like');

    svgProductCard.setAttribute('class', 'product-card__svg');
    svgProductCard.setAttribute('width', '31');
    svgProductCard.setAttribute('height', '27');
    svgProductCard.setAttribute('viewBox', '2 0 34 27');
    svgProductCard.setAttribute('fill', 'none');
    useProductCard.setAttribute('href', '/images/sprite-icon.svg#like');

    innerProductCard.className = 'product-card__inner';
    imgProductCard.className = 'product-card__img';
    imgProductCard.setAttribute('src', item.img);
    imgProductCard.setAttribute('alt', productCardInfo);
    imgProductCard.setAttribute('loading', 'lazy');

    titleProductCard.className = 'product-card__title';
    titleProductCard.textContent = productCardInfo;

    priceProductCard.className = 'product-card__price';
    priceProductCard.textContent = `$${item.price}`;

    linkProductCard.className = 'product-card__link';
    linkProductCard.textContent = 'Buy Now';
    linkProductCard.setAttribute('herf', '#');
    linkProductCard.setAttribute('aria-label', `Buy Now ${productCardInfo})`);

    innerProductCard.append(imgProductCard);
    innerProductCard.append(titleProductCard);
    innerProductCard.append(priceProductCard);
    innerProductCard.append(linkProductCard);

    svgProductCard.append(useProductCard);
    btnProductCard.append(svgProductCard);

    productCard.append(btnProductCard);
    productCard.append(innerProductCard);
    elem.append(productCard);
  });
}
