/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: { base: { 900: "#0b1210" } },
			boxShadow: {
				glass: "0 10px 40px -10px rgba(0,0,0,.6)",
			},
		},
	},
	plugins: [],
};
