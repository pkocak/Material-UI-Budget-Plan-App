/**
 * MATERIAL-UI BUDGET PLAN APP
 *
 * @author Mehmet Polat KOÇAK <mehmetpolatkocak@gmail.com>
 * @format
 * @flow strict-local
 */

import { createAction } from "redux-smart-actions";
import { Currencies } from "../../types/object";

/**
 * GETTERS
 */

export const getCurrencies = createAction("GET_CURRENCIES");

/**
 * SETTERS
 */
export const setLanguage = createAction("SET_LANGUAGE", (payload: string) => ({
  payload,
}));

export const setCurrency = createAction("SET_CURRENCY", (payload: string) => ({
  payload,
}));

export const setCurrencies = createAction(
  "SET_CURRENCIES",
  (payload: Currencies) => ({ payload })
);
