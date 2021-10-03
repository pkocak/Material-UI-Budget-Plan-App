import { call, put, takeLatest } from "@redux-saga/core/effects";
import { createRequestSaga, hideLoader, showLoader } from "../actions";
//import * as P from "../../types/params";
import * as O from "../../types/object";
import * as S from "../actions/staticActions";

function* getCurrencyValuesSaga({
  payload,
}: {
  type: string;
  payload: string;
}) {
  yield put(showLoader());
  try {
    //@ts-ignore
    const response = yield call(createRequestSaga, {
      method: "GET",
      url: `/latest?from=${payload}`,
    });
    if (response)
      yield put(S.setCurrencyValues(response as O.CurrencyValuesObject));
  } catch (e) {
    console.log("ERROR getCustomerUsedPointsSaga", e);
  } finally {
    yield put(hideLoader());
  }
}

const staticSaga = [
  takeLatest(S.getCurrencyValues.toString(), getCurrencyValuesSaga),
];

export default staticSaga;
