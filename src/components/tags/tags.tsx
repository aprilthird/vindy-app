import { useCallback } from "react";
import { IonRippleEffect } from "@ionic/react";
import { BASE_COLORS } from "../../utils";
import type { Icon } from "react-feather";

type TagsBaseProps = {
	id: string;
	name: string;
	active: boolean;
	icon?: Icon | null;
	onClick?: () => void;
};

export const Tags: React.FC<TagsBaseProps> = ({
	name,
	active,
	icon = null,
	onClick = null,
}) => {
	const IconTag = icon ?? null;

	const baseClasses = useCallback(() => {
		return `w-full ion-activatable flex items-center justify-center select-none relative overflow-hidden py-3 transition rounded-l-xl rounded-tr-xl border
         ${
						active
							? "bg-secundary border-transparent"
							: "bg-transparent  border-secundary"
					}
      `;
	}, [active]);

	const textClasses = useCallback(() => {
		return `text-xs whitespace-nowrap font-light text-center text-ellipsis overflow-hidden mx-auto
         ${active ? "text-back" : "text-secundary"}
      `;
	}, [active]);

	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	};

	return (
		<div className={baseClasses()} onClick={() => handleClick()}>
			<div className="flex flex-row gap-2 px-4 w-full max-w-10 items-center">
				{IconTag && (
					<IconTag
						width={18}
						height={18}
						color={active ? BASE_COLORS.back : BASE_COLORS.blue}
					/>
				)}
				<p className={textClasses()}>{name}</p>
			</div>
			<IonRippleEffect
				type="bounded"
				className={`${
					active ? "custom-ripple-contained" : "custom-riple-outlined"
				}`}
			></IonRippleEffect>
		</div>
	);
};

// export default React.memo(Tags);
