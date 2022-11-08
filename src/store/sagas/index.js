import { all } from "redux-saga/effects";

import { userLoginActionWatcher } from "./Login";

export default function* root() {
	yield all([ userLoginActionWatcher() ]);
}
