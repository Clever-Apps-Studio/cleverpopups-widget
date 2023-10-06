export const init = () => {
  window.addEventListener("load", () => {
    console.log("clever-popups loader");
    import("./previewLoader.js").then((_) => {});
  });
};

init();
