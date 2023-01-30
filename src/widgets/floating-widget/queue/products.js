import { writable, derived } from "svelte/store";

import { orders } from "../stores/orders";

export const products = derived(orders, ($orders) => {
  const orders = $orders.orders;
  const currentIdx = $orders.current;

  if (!orders.length) return [];

  const currentOrder = orders[currentIdx];

  if (currentOrder) {
    return currentOrder.items;
  }
  console.log("products---->", currentOrder.items);
  return [];
});
