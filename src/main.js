import "./app.scss";
import { init } from "./loader";
import { init as previewInit } from "./preview";

import { addDummySettings } from "./utils/methods";

//This should be commented out when building for production
addDummySettings();

previewInit();
init();
