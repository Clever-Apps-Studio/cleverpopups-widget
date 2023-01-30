import { hasElementID } from "./utils";
import getConfigObject from "../config";

const loadWidgets = () => {
  const config = getConfigObject();
  const hasFloatingWidget = hasElementID(config.floatingWidgetId);

  //load head links and tags
  import("../config/head-configs").then((_) => {});

  //load various widgets
  if (hasFloatingWidget) {
    import("../widgets/floating-widget").then((_) => {});
  }
};

export default loadWidgets;
