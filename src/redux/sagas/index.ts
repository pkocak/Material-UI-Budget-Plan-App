import { all } from "redux-saga/effects";

import staticSaga from "./staticSaga";
import systemSaga from "./systemSaga";

export function* rootSaga() {
  yield all([...staticSaga, ...systemSaga]);
}
