import loadWidgets from "./loadWidgets";

export const init = () => {
  window.addEventListener("load", () => {
    console.log("clever-popups loader");
    loadWidgets();
  });
};
