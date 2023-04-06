"use client";
import React from "react";
import { useSession } from "next-auth/react";

export interface GuardProps {
	onUnauthorized?: JSX.Element | (() => void);
	children: JSX.Element;
	fallback?: JSX.Element;
}

export default function SessionGuard(props: GuardProps) {
	const { status } = useSession();

	if (
		props.onUnauthorized &&
		typeof props.onUnauthorized !== "function" &&
		!React.isValidElement(props.onUnauthorized)
	) {
		throw new Error("onUnauthorized must be a function or a valid React element");
	}

	switch (status) {
		case "loading":
			return props.fallback || null;

		case "authenticated":
			return props.children;

		case "unauthenticated":
			if (React.isValidElement(props.onUnauthorized)) {
				return props.onUnauthorized as JSX.Element;
			} else if (typeof props.onUnauthorized === "function") {
				props.onUnauthorized();
			}

			return null;
		default:
			return null;
	}
}
