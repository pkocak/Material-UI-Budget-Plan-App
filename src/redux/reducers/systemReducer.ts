import { produce } from "immer";
import { SystemReducer } from "../../types";
import * as A from "../actions/systemActions";

const initialState: SystemReducer = {
  language: "tr",
  currency: "TRY",
  currencies: undefined,
};

const settingsReducer = produce((draft: SystemReducer, action: any) => {
  switch (action.type) {
    case A.setLanguage.toString():
      draft.language = action.payload;
      break;
    case A.setCurrency.toString():
      draft.currency = action.payload;
      break;
    case A.setCurrencies.toString():
      draft.currencies = action.payload;
      break;
  }
}, initialState);

export default settingsReducer;
