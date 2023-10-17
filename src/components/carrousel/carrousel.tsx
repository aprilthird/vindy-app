import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as randomUUID } from "uuid";
import { ReactElement, useCallback, useMemo } from "react";

type CarrouselBaseProps = {
	items: ReactElement[];
	className?: string;
	spaceBetween?: number;
	slidesPerView?: number;
};

export const Carrousel: React.FC<CarrouselBaseProps> = ({
	items,
	className = null,
	spaceBetween = 100,
	slidesPerView = 5,
}) => {
	const slides = useMemo(() => {
		return items?.map((el: any) => ({
			el,
			key: randomUUID(),
		}));
	}, [items]);

	const baseClasses = useCallback(() => {
		if (!className) {
			return `py-4 h-fit`;
		} else {
			return className;
		}
	}, [className]);

	return (
		<div className={baseClasses()}>
			<Swiper
				direction="horizontal"
				spaceBetween={spaceBetween}
				slidesPerView={slidesPerView}
				loop
			>
				{slides.map((slideContent, index) => (
					<SwiperSlide key={slideContent.key} virtualIndex={index}>
						{slideContent.el}
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
