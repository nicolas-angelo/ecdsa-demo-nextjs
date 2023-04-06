/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			colors: {
				ethereum: "#716b94",
			}
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
