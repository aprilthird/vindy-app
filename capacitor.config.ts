import { CapacitorConfig } from "@capacitor/cli";
import { KeyboardResize } from "@capacitor/keyboard";

const config: CapacitorConfig = {
	appId: "com.vindy.vindyapp",
	appName: "vindyApp",
	webDir: "build",
	bundledWebRuntime: false,
	plugins: {
		SplashScreen: {
			launchShowDuration: 3000,
			launchAutoHide: true,
			launchFadeOutDuration: 3000,
			backgroundColor: "#009ADA",
			androidSplashResourceName: "splash",
			androidScaleType: "CENTER_CROP",
			showSpinner: false,
			androidSpinnerStyle: "large",
			iosSpinnerStyle: "small",
			spinnerColor: "#999999",
			splashFullScreen: true,
			splashImmersive: true,
			layoutName: "launch_screen",
			useDialog: true,
		},
		Keyboard: {
			resize: KeyboardResize.Body,
			resizeOnFullScreen: true,
		},
	},
};

export default config;
