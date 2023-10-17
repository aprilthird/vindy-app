export const thousandsSeparatorFormatted = (value: string | number): string => {
	const group = value.toString().match(/(^-)?\d/gm);

	if (group && group.length > 0) {
		const str = group.join("");

		if (parseInt(str)) {
			return str.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
	}

	return "";
};

export const getCurrentView = (state: any): string => {
	if (typeof state === "object" && state.hasOwnProperty("value")) {
		return state.value;
	}

	return "";
};

export const getHowDidViewEnter = (state: any): string => {
	if (typeof state === "object" && state.hasOwnProperty("_event")) {
		return state._event?.name;
	}
	return "";
};

export const objectFormatter = (
	data: Record<string, string>
): Record<string, string> => {
	// let k: keyof typeof data;
	let formatted: typeof data = {};
	for (const k in data) {
		formatted[k] = data[k].toLocaleLowerCase();
	}
	return formatted;
};
