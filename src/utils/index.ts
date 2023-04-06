export function classNames(...classes: any) {
	return classes.filter(Boolean).join(" ");
}

export const clsx = (input: any) =>
	input
		.replace(/\s+/gm, " ")
		.split(" ")
		.filter((cond: any) => typeof cond === "string")
		.join(" ")
		.trim();

export function capitalize(str: string = "") {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
