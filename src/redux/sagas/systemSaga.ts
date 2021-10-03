import { call, put, takeLatest } from "@redux-saga/core/effects";
import { createRequestSaga, hideLoader, showLoader } from "../actions";
//import * as P from "../../types/params";
import * as S from "../actions/systemActions";
import * as O from "../../types/object";

function* getCurrenciesSaga() {
  yield put(showLoader());
  try {
    //@ts-ignore
    const response = yield call(createRequestSaga, {
      method: "GET",
      url: "currencies",
    });
    if (response) yield put(S.setCurrencies(response as O.Currencies));
  } catch (e) {
    console.log("ERROR getCustomerUsedPointsSaga", e);
  } finally {
    yield put(hideLoader());
  }
}

const systemSaga = [takeLatest(S.getCurrencies.toString(), getCurrenciesSaga)];

export default systemSaga;
