import { writable } from "svelte/store";

export const user = writable({
  details: null,
});
