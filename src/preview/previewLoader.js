import PreviewLoader from "./PreviewLoader.svelte";
import getConfigObject from "./../config";

const config = getConfigObject();
const target = document.getElementById(config.previewWidgetId);

if (target) {
  target.innerHTML = "";
}

const Loader = new PreviewLoader({
  target: target,
});

window["app"] = Loader;

export default Loader;
