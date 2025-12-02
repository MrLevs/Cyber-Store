'use strict';

import { search } from './search'; //Search
import { filter } from './filter'; //Filter

export async function dataBase() {
  try {
    let response = await fetch('/data.json');
    let result = await response.json();

    //Search
    search(result);

    //Filter
    filter(result);
  } catch (err) {
    alert(err + ' ' + 'Data base not working!');
    console.log(err + ' ' + 'Data base not working!');
  }
}
