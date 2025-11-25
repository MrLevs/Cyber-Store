'use strict';

export default async function () {
  try {
    let response = await fetch('/data.json');
    let result = await response.json();
    return result;
  } catch (err) {
    alert(err + ' ' + 'Data base not working!');
    console.log(err + ' ' + 'Data base not working!');
  }
}
