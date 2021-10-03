import getSymbolFromCurrency from "currency-symbol-map";

export const getCurrency = (
  description: string | number,
  currencyCode: string | undefined
): string => {
  if (currencyCode)
    return description + " (" + getSymbolFromCurrency(currencyCode) + ")";
  else return description.toString();
};

export function generateRandomID(length = 8): string {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
