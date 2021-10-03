import { produce } from "immer";
import { LanguageReducer } from "../../types";

const initialState: LanguageReducer = require("../../utils/localization.json");
const languageReducer = produce((draft: LanguageReducer, action: any) => {},
initialState);

export default languageReducer;
