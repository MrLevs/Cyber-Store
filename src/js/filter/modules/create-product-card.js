'use strict';

export function createProductCard(elem) {
  const productCard = document.createElement('article');
  const btnProductCard = document.createElement('button');
  const svgProductCard = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const useProductCard = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  const innerProductCard = document.createElement('div');
  const imgProductCard = document.createElement('img');
  const titleProductCard = document.createElement('h3');
  const priceProductCard = document.createElement('p');
  const linkProductCard = document.createElement('a');

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
  imgProductCard.setAttribute('src', '/images/products/apple/iphone14pro.webp');
  imgProductCard.setAttribute('alt', 'Apple iPhone 14 Pro 512GB Gold (MQ233)');
  imgProductCard.setAttribute('loading', 'lazy');

  titleProductCard.className = 'product-card__title';
  titleProductCard.textContent = 'Apple iPhone 14 Pro 512GB Gold (MQ233)';

  priceProductCard.className = 'product-card__price';
  priceProductCard.textContent = '$2437';

  linkProductCard.className = 'product-card__link';
  linkProductCard.textContent = 'Buy Now';
  linkProductCard.setAttribute('herf', '#');
  linkProductCard.setAttribute('aria-label', 'buy now Apple iPhone 14 Pro 512GB Gold (MQ233)');

  innerProductCard.append(imgProductCard);
  innerProductCard.append(titleProductCard);
  innerProductCard.append(priceProductCard);
  innerProductCard.append(linkProductCard);

  svgProductCard.append(useProductCard);
  btnProductCard.append(svgProductCard);

  productCard.append(btnProductCard);
  productCard.append(innerProductCard);
  elem.append(productCard);
}
