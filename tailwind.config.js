/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				customblue: "#1fb6ff",
				custompurple: "#450a7a",
				customorange: "#ff8815",
				primary: "#FF8815",
				secundary: "#009ADA",
				default: "#B5B5B5",
				terciary: "#450A7A",
				brightpurple: "#7F6AFF",
				back: "#F1F5F9",
			},
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [],
};
