/**
 * MATERIAL-UI BUDGET PLAN APP
 *
 * @author Mehmet Polat KOÇAK <mehmetpolatkocak@gmail.com>
 * @format
 * @flow strict-local
 */

import { createAction } from "redux-smart-actions";
import { CurrencyValuesObject } from "../../types/object";

/**
 * GETTERS
 */
export const getCurrencyValues = createAction(
  "GET_CURRENCY_VALUES",
  (payload: string) => ({ payload })
);

/**
 * SETTERS
 */
export const setTableData = createAction("SET_TABLE_DATA", (payload) => ({
  payload,
}));

export const setCurrencyValues = createAction(
  "SET_CURRENCY_VALUES",
  (payload: CurrencyValuesObject) => ({ payload })
);
