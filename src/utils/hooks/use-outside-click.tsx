import React from "react";

type Callback = () => void;

export const useOutsideClick = (callback: Callback) => {
	const ref = React.useRef<HTMLDivElement>(null);

	const onClickOutside = (event: React.MouseEvent) => {
		event.stopPropagation();
	};

	React.useEffect(() => {
		const handleClick = (event: Event): void => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		document.addEventListener("click", handleClick, true);

		return () => {
			document.removeEventListener("click", handleClick, true);
		};
	}, [callback, ref]);

	return { ref, onClickOutside };
};
