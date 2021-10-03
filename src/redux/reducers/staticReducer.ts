import { produce } from "immer";
import { StaticReducer } from "../../types";
import { setCurrencyValues, setTableData } from "../actions/staticActions";

const initialState: StaticReducer = {
  data: [],
  currencyValues: undefined,
};
const staticReducer = produce((draft: StaticReducer, action: any) => {
  switch (action.type) {
    case setTableData.toString():
      draft.data = action.payload;
      break;
    case setCurrencyValues.toString():
      draft.currencyValues = action.payload;
      break;
  }
}, initialState);

export default staticReducer;
