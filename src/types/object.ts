export type Column = {
  id: "name" | "isIncome" | "currency" | "amount";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
};

export type Row = {
  id?: string;
  name: string;
  isIncome: boolean;
  currency: string;
  amount: number;
};

export interface CurrencyValuesObject {
  amount: number;
  base: string;
  date: string;
  rates: Currencies;
}

export interface Currencies {
  AUD: string;
  BGN: string;
  BRL: string;
  CAD: string;
  CHF: string;
  CNY: string;
  CZK: string;
  DKK: string;
  EUR: string;
  GBP: string;
  HKD: string;
  HRK: string;
  HUF: string;
  IDR: string;
  ILS: string;
  INR: string;
  ISK: string;
  JPY: string;
  KRW: string;
  MXN: string;
  MYR: string;
  NOK: string;
  NZD: string;
  PHP: string;
  PLN: string;
  RON: string;
  RUB: string;
  SEK: string;
  SGD: string;
  THB: string;
  TRY: string;
  USD: string;
  ZAR: string;
}
