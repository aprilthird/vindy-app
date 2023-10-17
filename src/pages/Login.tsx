import type { Swiper as SwiperClass } from "swiper/types";
import { Navigation, Scrollbar, A11y, Virtual, Keyboard } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Keyboard as KeyboardCap } from "@capacitor/keyboard";

import React from "react";
import { useState } from "react";
import { IonContent, IonImg, IonPage } from "@ionic/react";
import { ToogleSegment } from "../components/toogle/toogle-segment";
import { LoginUserForm, LoginVinderForm } from "../features/auth";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "../theme/custom.scss";
import "../theme/custom.scss";

const enum swithValue {
	USUARIO = "usuario",
	VINDER = "vinder",
}

export const LoginPage: React.FC = () => {
	const [toolSeg, setToolSeg] = useState<swithValue>(swithValue.USUARIO);
	// const { height } = useWindowDimensions();

	const [resetUser, setResetUser] = useState<boolean>(false);
	const [isUserOpen, setIsUserOpen] = useState<boolean>(false);
	const [resetVinder, setResetVinder] = useState<boolean>(false);
	const [isVinderOpen, setIsVinderOpen] = useState<boolean>(false);
	const [swiperGalleryRef, setSwiperGalleryRef] = useState<SwiperClass | null>(
		null
	);
	// const [pageHeight, setPageHeight] = useState<number | null>(null);
	// const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);

	// KeyboardCap.addListener("keyboardWillShow", (info) => {
	// 	setPageHeight(Number(height) - Number(info.keyboardHeight));
	// 	setKeyboardOpen(true);
	// });

	// KeyboardCap.addListener("keyboardWillHide", () => {
	// 	setPageHeight(null);
	// 	setKeyboardOpen(false);
	// });

	// const baseClasses = useCallback(() => {
	// 	return `${pageHeight ? `h-[${pageHeight}]` : "h-screen"}`;
	// }, [height, pageHeight]);

	const handleSwithAuth = (key: string | undefined) => {
		const index: number = key === swithValue.USUARIO ? 0 : 1;
		if (index === 0 && isUserOpen) {
			setResetUser(true);
		} else if (index === 1 && isVinderOpen) {
			setResetVinder(true);
		}
		swiperGalleryRef?.slideTo(index);
	};
	const handleToolAuth = (index: number) => {
		const key: swithValue =
			index === 0 ? swithValue.USUARIO : swithValue.VINDER;
		setToolSeg(key);
	};

	const handleUserForView = (data: boolean) => {
		setIsUserOpen(data);
	};

	const handleVinderForView = (data: boolean) => {
		setIsVinderOpen(data);
	};

	return (
		<IonPage className="vindy-bg">
			<IonContent className="login" scrollY={true} forceOverscroll>
				<div className="">
					<div className="overflow-hidden h-full w-full ion-padding z-50">
						<div className="h-[90%] w-[90%] m-auto items-center overflow-hidden">
							<div className="w-full h-full flex flex-col space-y-2 pt-[17vh]">
								<div className="h-60 w-60 mx-auto pt-32">
									<IonImg src="/assets/img/logo_2.svg"></IonImg>
								</div>
								<div className="flex flex-col">
									<div className="mx-auto w-[75%]">
										<ToogleSegment
											labels={[
												{ name: swithValue.USUARIO, value: swithValue.USUARIO },
												{ name: swithValue.VINDER, value: swithValue.VINDER },
											]}
											color="back"
											onChange={handleSwithAuth}
											labelDefault={toolSeg}
										/>
									</div>
									<div>
										<Swiper
											updateOnImagesReady
											slidesPerView={1}
											spaceBetween={10}
											navigation={{
												nextEl: ".swiper-button-next",
												prevEl: ".swiper-button-prev",
												disabledClass: "disabled_swiper_button",
											}}
											touchReleaseOnEdges={false}
											simulateTouch={false}
											scrollbar={{ enabled: false }}
											modules={[Navigation, A11y, Virtual, Scrollbar, Keyboard]}
											onSwiper={setSwiperGalleryRef}
											onSlideChange={(slide) =>
												handleToolAuth(slide?.activeIndex)
											}
											className="h-full"
											preventClicksPropagation={false}
											preventClicks={false}
											allowTouchMove={false}
										>
											<SwiperSlide className="h-full w-full">
												<LoginUserForm
													reset={resetUser}
													isUserFormOpen={handleUserForView}
												/>
											</SwiperSlide>
											<SwiperSlide className="h-full w-full">
												<LoginVinderForm
													reset={resetVinder}
													isVinderFormOpen={handleVinderForView}
												/>
											</SwiperSlide>
										</Swiper>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

// export default React.memo(LoginPage);
