import axios, { AxiosError } from "axios";
import { signIn as authSignIn, type SignInResponse as Res } from "next-auth/react";

type SignInResponse = Omit<Res, "status" | "error">;
type SignInErrorResponse = SignInResponse & { error: string };

interface Options<S, E> {
	onSuccess?: (res: S) => void;
	onError?: (res: E) => void;
}

type AccountError = Pick<AxiosError, "code" | "response">;
type UnlockOptions = Options<SignInResponse, SignInErrorResponse>;
type GenerateOptions = Options<Account, AccountError>;

export async function signIn(username: string, cb?: UnlockOptions) {
	const signInResult = await authSignIn("ethereum", {
		username,
		redirect: false,
	});
	if (signInResult) {
		let { url, ok, status, ...rest } = signInResult;
		let error = String(rest?.error);
		ok && cb?.onSuccess && cb.onSuccess({ url, ok: true });
		!ok && cb?.onError && cb.onError({ url, ok: false, error });
	}
}

export const createAccount = (username: string, cbs?: GenerateOptions) => {
	axios
		.post<Account>("/api/accounts", { username })
		.then(async ({ data }) => {
			cbs?.onSuccess && cbs.onSuccess(data);
			await signIn(data.username, {
				onError: err => console.log("SIGN IN ERR: ", err),
			});
		})
		.catch(({ response, code }) => cbs?.onError && cbs.onError({ response, code }));
};
