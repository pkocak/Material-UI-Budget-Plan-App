import { GlobalStrings } from "react-localization";
import * as O from "./object";

export interface RootState {
  app: AppReducer;
  locale: LanguageReducer;
  static: StaticReducer;
  system: SystemReducer;
}

export interface AppReducer {
  loading: boolean;
}

export interface LanguageReducer {
  base: GlobalStrings<string>;
  components: GlobalStrings<string>;
  error: GlobalStrings<string>;
  table: GlobalStrings<string>;
}

export interface StaticReducer {
  data: O.Row[];
  currencyValues?: O.CurrencyValuesObject;
}

export interface SystemReducer {
  language: string;
  currency: string;
  currencies?: O.Currencies;
}
