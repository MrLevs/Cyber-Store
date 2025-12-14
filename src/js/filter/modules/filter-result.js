'use strict';

export function filterResult(arrayData, arrayFilters) {
  console.log(arrayFilters);
  let dataFilterProduct = [];
  if (arrayFilters.length === 0) {
    arrayData.filter(item => {
      if (item.brand) {
        dataFilterProduct.push(item);
      }
    });
  } else {
    arrayFilters.forEach(items => {
      arrayData.filter(item => {
        if (item.brand === items) {
          dataFilterProduct.push(item);
        }
      });
    });
  }
  console.log(dataFilterProduct);
  let dataProduct = dataFilterProduct.map(item => ({
    title: item.title.toLowerCase(),
    brand: item.brand
      .split(' ')
      .map(word => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
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
  }));
  return dataProduct;
}
