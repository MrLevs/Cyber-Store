'use strict';

export function productFiltersMap(array) {
  let dataProduct = array.map(item => ({
    title: item.title.toLowerCase(),
    brand: item.brand
      .split(' ')
      .map(word => {
        let textBrand;
        if (word === 'oppo' || word === 'poco') {
          textBrand = `${word.toUpperCase()}`;
          return textBrand;
        } else {
          textBrand = `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
          return textBrand;
        }
      })
      .join(' '),
    name: item.name
      .toLowerCase()
      .split(' ')
      .map(word => {
        let textName;
        if (word === 'iphone') {
          textName = `${word[0]}${word[1].toUpperCase()}${word.slice(2).toLowerCase()}`;
          return textName;
        } else {
          textName = `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
          return textName;
        }
      })
      .join(' '),
    battery: item.battery,
    screen: item.screen.toLowerCase(),
    diagonal: item.diagonal,
    protection: item.protection.toLowerCase(),
    memory: item.memory,
    price: item.price,
    color: item.color.toLowerCase(),
    serial: item.serial.toUpperCase(),
    filters: item.filters.toLowerCase(),
    img: item.img,
    link: item.link,
    date: item.date,
    rating: item.rating,
  }));
  return dataProduct;
}
