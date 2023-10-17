import { useEffect } from "react";

type ExternalScript = string;

export const useExternalScripts = (url: ExternalScript) => {
	useEffect(() => {
		const head = document.querySelector("head");
		const script = document.createElement("script");

		script.setAttribute("src", url);
		if (head) {
			head.appendChild(script);
			// return () => {
			// 	head.removeChild(script);
			// };
		}
	}, [url]);

	return "";
};
