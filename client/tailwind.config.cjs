/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"c-e0": "#e0e0e0",
				"c-43": "#4361ee",
				"c-de": "#dedede",
			},
		},
		screens: {
			xl: { max: "1279px" },
			lg: { max: "1024px" },
			md: { max: "800px" },
			sm: { max: "640px" },
			mos: { max: "425px" },
			mo: { max: "375px" },
		},
		container: {
			padding: "10px",
			overflow: "hidden",
			center: true,
		},
	},
	plugins: [],
};
