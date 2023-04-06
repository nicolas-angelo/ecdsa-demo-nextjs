import axios from "axios";
import { signIn as authSignIn, type SignInResponse as Res } from "next-auth/react";

type SignInResponse = Omit<Res, "status" | "error">;
type SignInErrorResponse = SignInResponse & { error: string };

interface Options<S, E> {
	onSuccess?: (res: S) => void;
	onError?: (res: E) => void;
}

type UnlockOptions = Options<SignInResponse, SignInErrorResponse>
type GenerateOptions = Options<Account, Error>

export async function signIn(username: string, cbs?: UnlockOptions) {
	const signInResult = await authSignIn("ethereum", {
		username,
		redirect: false,
	});
	if (signInResult) {
		let { url, ok, status, ...rest } = signInResult;
		let error = String(rest?.error);
		ok && cbs?.onSuccess && cbs.onSuccess({ url, ok: true });
		!ok && cbs?.onError && cbs.onError({ url, ok: false, error });
	}
}

export const createAccount = (username: string, cbs?: GenerateOptions) => {
	axios
		.post<Account>("/api/accounts", { username })
		.then(async ({ data }) => {
      cbs?.onSuccess && cbs.onSuccess(data);
		})
		.catch(err => cbs?.onError && cbs.onError(err));
};
