import { combineReducers } from "redux";

import appReducer from "./appReducer";
import languageReducer from "./languageReducer";
import staticReducer from "./staticReducer";
import systemReducer from "./systemReducer";

export default combineReducers({
  app: appReducer,
  locale: languageReducer,
  static: staticReducer,
  system: systemReducer,
});
