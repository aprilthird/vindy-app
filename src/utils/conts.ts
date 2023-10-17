export const BUTTONS_VARIANTS = {
	outlined: {
		base: "border border-2 bg-transparent",
		colors: {
			primary: "border-primary text-primary",
			secundary: "border-secundary text-secundary",
			default: "border-default text-default",
			terciary: "border-terciary text-terciary",
			brightpurple: "border-brightpurple text-brightpurple",
			back: "border-back text-back",
			white: "",
			danger: "",
		},
	},
	contained: {
		base: "border-2",
		colors: {
			primary: "bg-primary border-primary text-white",
			secundary: "bg-secundary border-secundary text-white",
			default: "bg-default border-default text-slate-600",
			terciary: "bg-terciary border-terciary text-white",
			brightpurple: "bg-brightpurple border-brightpurple text-white",
			back: "bg-back border-back text-terciary",
			white: "",
			danger: "bg-red-500 border-red-500 text-white",
		},
	},
};
export const CHIPS_VARIANTS = {
	outlined: {
		base: "border bg-transparent bg-slate-100 ",
		colors: {
			primary: "border-primary text-primary",
			secundary: "border-secundary text-secundary",
			default: "border-default text-default",
			terciary: "border-terciary text-terciary",
			brightpurple: "border-brightpurple text-brightpurple",
			back: "border-back text-back",
			white: "",
		},
	},
	contained: {
		base: "",
		colors: {
			primary: "bg-primary text-white",
			secundary: "bg-secundary text-white",
			default: "bg-default text-white",
			terciary: "bg-terciary text-white",
			brightpurple: "bg-brightpurple text-white",
			back: "bg-back text-white",
			white: "",
		},
	},
};

export const CARDS_COLORS = {
	orange: "orange",
	blue: "blue",
	purple: "purple",
	nocolor: "nocolor",
};

export const CARDS_VARIANTS = {
	horizontal: {
		base: "card-categories flex items-center w-full rounded-xl relative overflow-hidden",
		content: "w-full h-24 rounded-xl text-center my-3",
		innerContent: "w-full p-1 bg-transparent h-full flex justify-evenly ",
	},
	vertical: {
		base: "card-categories flex items-center w-full h-40 rounded-xl overflow-hidden",
		content: "h-40 w-full ",
		innerContent:
			"h-full flex flex-col-reverse justify-evenly relative items-center",
	},
	noEffect: {
		base: "card-categories flex items-center w-full rounded-lg",
		content: "w-full h-12 rounded-md text-start",
		innerContent: "flex flex-row h-full w-full items-center",
	},
};

export const BUTTON_SIZES = {
	small: "h-6 px-4 text-sm",
	normal: "h-10  px-8",
	large: "h-12 px-8 text-sm",
};

export const CHIP_SIZES = {
	small: "h-6 text-xs font-light",
	normal: "h-8 text-sm",
};

export const BASE_COLORS = {
	blue: "#009ADA",
	orange: "#FF8815",
	gray: "#B5B5B5",
	purple: "#450A7A",
	brightpurple: "#7F6AFF",
	back: "#F1F5F9",
	degrade: {
		from: "#009ADA",
		to: "#450A7A",
	},
};
