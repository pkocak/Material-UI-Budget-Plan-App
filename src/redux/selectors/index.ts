import LocalizedStrings, {
  GlobalStrings,
  LocalizedStringsMethods,
} from "react-localization";
import { createSelector } from "reselect";
import { RootState } from "../../types";

/** APP **/
const loadingState = (state: RootState) => state.app.loading;
export const isLoadingState = createSelector(
  [loadingState],
  (loading) => loading
);

/** STATIC **/
const tableDataState = (state: RootState) => state.static.data;
export const tableDataSelector = createSelector(
  [tableDataState],
  (data) => data
);

const currencyValuesState = (state: RootState) => state.static.currencyValues;
export const currencyValuesSelector = createSelector(
  [currencyValuesState],
  (currencyValues) => currencyValues
);

/** SYSTEM **/
const languageState = (state: RootState) => state.system.language;
export const languageSelector = createSelector(
  [languageState],
  (language) => language
);

const currencyState = (state: RootState) => state.system.currency;
export const currencySelector = createSelector(
  [currencyState],
  (currency) => currency
);

const currenciesState = (state: RootState) => state.system.currencies;
export const currenciesSelector = createSelector(
  [currenciesState],
  (currencies) => currencies
);

/** LOCALE **/
const getUserLanguageState = (state: RootState) => state.system.language;
export const userLanguageState = createSelector(
  [getUserLanguageState],
  (lang) => lang
);

const returnLocolaziedString = (
  auth: GlobalStrings<string>,
  lang?: string
): LocalizedStringsMethods => {
  const l = new LocalizedStrings(auth);
  if (lang) l.setLanguage(lang);
  return l;
};

const getLocaleBase = (state: RootState) => state.locale.base;
export const getLocalizedBase = createSelector(
  [getLocaleBase, getUserLanguageState],
  (base, lang) => returnLocolaziedString(base, lang)
);

const getLocaleComponents = (state: RootState) => state.locale.components;
export const getLocalizedComponents = createSelector(
  [getLocaleComponents, getUserLanguageState],
  (components, lang) => returnLocolaziedString(components, lang)
);

const getLocaleErrors = (state: RootState) => state.locale.error;
export const getLocalizedErrors = createSelector(
  [getLocaleErrors, getUserLanguageState],
  (error, lang) => returnLocolaziedString(error, lang)
);

const getLocaleTable = (state: RootState) => state.locale.table;
export const getLocalizedTable = createSelector(
  [getLocaleTable, getUserLanguageState],
  (table, lang) => returnLocolaziedString(table, lang)
);
