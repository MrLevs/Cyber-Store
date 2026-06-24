'use strict';

import { createProductCard } from './create-product-card'; // Create Product Card

export function sortProductCard(data, like) {
  const newBlock = document.querySelector('#new-products');
  const bestsellerBlock = document.querySelector('#bestseller-products');
  const featuredBlock = document.querySelector('#featured-products');
  const discountsBlock = document.querySelector('#discounts');
  let newProducts = [];
  let bestsellerProducts = [];
  let featuredProducts = [];
  let discountsProducts = [];

  if (newBlock || bestsellerBlock || featuredBlock) {
    creationPCByCategory(data, like);
  }

  if (discountsBlock) {
    discountsCreatePC(data, like);
  }

  //-----Create Product Card by Category------------------------------
  function creationPCByCategory(data, like) {
    data.forEach(item => {
      switch (item.category) {
        case 'new':
          newProducts.push(item);
          break;
        case 'bestseller':
          bestsellerProducts.push(item);
          break;
        case 'featured':
          featuredProducts.push(item);
          break;
      }
    });
    createProductCard(newBlock, newProducts, like);
    createProductCard(bestsellerBlock, bestsellerProducts, like);
    createProductCard(featuredBlock, featuredProducts, like);
  }

  //-----Discounts Create Product Card----------------------------------------
  function discountsCreatePC(data, like) {
    data.forEach(item => {
      if (item.category === 'discounts') {
        if (discountsProducts.length < 4) {
          discountsProducts.push(item);
        }
      }
    });
    createProductCard(discountsBlock, discountsProducts, like);
  }
}
