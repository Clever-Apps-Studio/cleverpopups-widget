import loadWidgets from "./loadWidgets";

export const init = () => {
  window.addEventListener("load", () => {
    loadWidgets();
  });
};

