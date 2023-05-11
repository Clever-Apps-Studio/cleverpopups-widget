import { writable } from "svelte/store";

export const orders = writable({
  current: null,
  orders: [],
  size: 0,
});
