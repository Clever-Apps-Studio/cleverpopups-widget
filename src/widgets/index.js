import WidgetLoader from "./WidgetLoader.svelte";

import getConfigObject from "./../config";

const config = getConfigObject();

const Loader = new WidgetLoader({
  target: document.getElementById(config.floatingWidgetId),
});

window["app"] = Loader;

export default Loader;
