'use strict';

export default async function () {
  try {
    let response = await fetch('/data.json');
    let result = await response.json();
    let data = result.map(({ title, name, link, price }) => ({
      title: title.toLowerCase(),
      name: name.toLowerCase(),
      link: link,
      price: price,
    }));
    return data;
  } catch (err) {
    alert(err + ' ' + 'Data base not working!');
    console.log(err + ' ' + 'Data base not working!');
  }
}
