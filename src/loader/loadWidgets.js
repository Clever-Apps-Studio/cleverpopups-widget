import { hasElementID } from "./utils";
import getConfigObject from "../config";

const loadWidgets = () => {
  const config = getConfigObject();
  const hasFloatingWidget = hasElementID(config.floatingWidgetId);
  if (hasFloatingWidget) {
    import("../widgets/floating-widget").then((_) => {});
  }
};

export default loadWidgets;
