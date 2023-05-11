import { writable } from "svelte/store";

export const user = writable({
  visitorIP: null,
  ipDetails: null,
  os: null,
});
