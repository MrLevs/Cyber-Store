'use strict';

export default async function () {
  let response = await fetch('/data.json');
  let result = await response.json();
  let data = result.map(({ name, link }) => ({
    name: name.toLowerCase(),
    link: link,
  }));
  return data;
}
