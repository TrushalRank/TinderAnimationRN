import { takeLatest, put, call } from "redux-saga/effects";

import { LOGIN_WATCHER } from "../../constant";

import { userLoginError, userLoginSuccess } from "../../actions";

import { API_URL, BASE_URL } from "../../services";

function* onUserLogin(userLoginResendCodeAction) {
	let { payload, resolve, reject } = userLoginResendCodeAction;
	try {
		const header = { "Content-Type": "application/json" };
		const response = yield fetch(BASE_URL + API_URL.LOGIN, {
			method: "POST",
			headers: header,
			body: JSON.stringify(payload)
		});

		console.log("body", payload);
		console.log("headers", header);
		console.log("URL", BASE_URL + API_URL.LOGIN);

		yield put(userLoginSuccess(response));
		resolve(response);
	} catch (e) {
		yield put(userLoginError(e));
		reject(e);
	}
}

export function* userLoginActionWatcher() {
	yield takeLatest(LOGIN_WATCHER, onUserLogin);
}
