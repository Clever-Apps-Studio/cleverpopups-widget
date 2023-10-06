import SpinToWin from "./SpinToWin.svelte";
import getConfigObject from "./../../config";

const config = getConfigObject();

const Spinner = new SpinToWin({
  target: document.getElementById(config.floatingWidgetId),
});

export default Spinner;
