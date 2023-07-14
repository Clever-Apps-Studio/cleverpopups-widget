export const init = () => {
  window.addEventListener("load", () => {
    console.log("clever-popups loader");
    import("./previewLoader.js").then((_) => {
      // @ts-ignore
      console.log("window---app", window.app);
    });
  });
};

init();
