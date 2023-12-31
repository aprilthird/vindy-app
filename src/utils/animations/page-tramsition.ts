import { createAnimation } from "@ionic/react";

export const animationPageBuilder = (baseEl: any, opts: any) => {
	const enteringAnimation = createAnimation()
		.addElement(opts.enteringEl)
		.fromTo("opacity", 0, 1)
		.duration(250);

	const leavingAnimation = createAnimation()
		.addElement(opts.leavingEl)
		.fromTo("opacity", 1, 0)
		.duration(250);

	const animation = createAnimation()
		.addAnimation(enteringAnimation)
		.addAnimation(leavingAnimation);

	return animation;
};
