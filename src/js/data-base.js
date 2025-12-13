'use strict';

import { formSearch } from './search/formSearch'; //Form Search
import { filter } from './filter/filter'; //Filter

export async function dataBase() {
  try {
    let response = await fetch('/data.json');
    let result = await response.json();

    //Form Search
    formSearch(result);

    //Filter
    filter(result);
  } catch (err) {
    alert(err + ' ' + 'Data base not working!');
    console.log(err + ' ' + 'Data base not working!');
  }
}
