'use strict';

import { formSearch } from './search/formSearch'; //Form Search
import { filter } from './filter/filter'; //Filter

export async function initCatalog() {
  try {
    const response = await fetch('/data.json');

    if (!response.ok) {
      throw new Error('Error loading data:', response.status);
    }
    const data = await response.json();

    //Form Search
    formSearch(data);

    //Filter
    filter(data);
  } catch (error) {
    alert('Data base not working!');
    console.error(error);
  }
}
