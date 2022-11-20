import Widget from "./FloatingWidget.svelte";

import getConfigObject from "../../config";

const config = getConfigObject();

const FloatingWidget = new Widget({
  target: document.getElementById(config.floatingWidgetId),
  props: {
    name: "world",
  },
});

window["app"] = FloatingWidget;

export default FloatingWidget;
