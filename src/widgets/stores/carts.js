import { writable } from "svelte/store";

export const carts = writable({
  current: null,
  orders: [],
  size: 0,
});
