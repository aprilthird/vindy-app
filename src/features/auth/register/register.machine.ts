import { createMachine } from "xstate";

export enum RegisterMachineActions {
	goToSelectTypeAccount = "goToSelectTypeAccount",
	goToRegisterUser = "goToRegisterUser",
	goToSaveFirstAddress = "goToSaveFirstAddress",
	goToConfirmPhone = "goToConfirmPhone",
	goToTerms = "goToTerms",
	goToSuccessRegister = "goToSuccessRegister",
	goToSelectTypeVinder = "goToSelectTypeVinder",
	goToRegisterPersonalVinder = "goToRegisterPersonalVinder",
	goToRegisterBusinessVinder = "goToRegisterBusinessVinder",
	goToAvailabilityVinder = "goToAvailabilityVinder",
	goToCategoryVinder = "goToCategoryVinder",
	goToSaveDriverInfo = "goToSaveDriverInfo",
	goToSaveBusinessInfo = "goToSaveBusinessInfo",
}

export enum RegisterMachineViews {
	selectTypeAccount = "selectTypeAccount",
	registerUser = "registerUser",
	confirmPhone = "confirmPhone",
	showTermAndConditions = "showTermAndConditions",
	success = "success",
	selectTypeVinder = "selectTypeVinder",
	registerPersonalVinder = "registerPersonalVinder",
	registerBusinessVinder = "registerBusinessVinder",
	saveAvailabilityVinder = "saveAvailabilityVinder",
	saveCategoryVinder = "saveCategoryVinder",
	saveDriverInfo = "saveDriverInfo",
	saveBusinessInfo = "saveBusinessInfo",
}

export const RegisterMachine = createMachine({
	predictableActionArguments: true,
	id: "register",
	initial: RegisterMachineViews.selectTypeAccount,
	states: {
		selectTypeAccount: {
			on: {
				MEMBER: {
					target: RegisterMachineViews.registerUser,
					actions: [RegisterMachineActions.goToRegisterUser],
				},
				VINDER: {
					target: RegisterMachineViews.selectTypeVinder,
					actions: [RegisterMachineActions.goToSelectTypeVinder],
				},
			},
		},
		registerUser: {
			on: {
				CONTINUE: {
					target: RegisterMachineViews.confirmPhone,
					actions: [RegisterMachineActions.goToConfirmPhone],
				},
				BACK: {
					target: RegisterMachineViews.selectTypeAccount,
					actions: [RegisterMachineActions.goToSelectTypeAccount],
				},
			},
		},
		confirmPhone: {
			on: {
				CONTINUE: {
					target: RegisterMachineViews.showTermAndConditions,
					actions: [RegisterMachineActions.goToTerms],
				},
			},
		},
		showTermAndConditions: {
			on: {
				CONTINUE: {
					target: RegisterMachineViews.success,
					actions: [RegisterMachineActions.goToSuccessRegister],
				},
			},
		},
		selectTypeVinder: {
			on: {
				PERSONAL: {
					target: RegisterMachineViews.registerPersonalVinder,
					actions: [RegisterMachineActions.goToRegisterPersonalVinder],
				},
				BUSINESS: {
					target: RegisterMachineViews.registerBusinessVinder,
					actions: [RegisterMachineActions.goToRegisterBusinessVinder],
				},
				BACK: {
					target: RegisterMachineViews.selectTypeAccount,
					actions: [RegisterMachineActions.goToSelectTypeAccount],
				},
			},
		},
		registerPersonalVinder: {
			on: {
				CONTINUE: {
					target: RegisterMachineViews.saveAvailabilityVinder,
					actions: [RegisterMachineActions.goToAvailabilityVinder],
				},
				BACK: {
					target: RegisterMachineViews.selectTypeVinder,
					actions: [RegisterMachineActions.goToSelectTypeVinder],
				},
			},
		},
		registerBusinessVinder: {
			on: {
				CONTINUE: {
					target: RegisterMachineViews.saveAvailabilityVinder,
					actions: [RegisterMachineActions.goToAvailabilityVinder],
				},
				BACK: {
					target: RegisterMachineViews.selectTypeVinder,
					actions: [RegisterMachineActions.goToSelectTypeVinder],
				},
			},
		},
		saveAvailabilityVinder: {
			on: {
				CONTINUE: {
					target: RegisterMachineViews.saveCategoryVinder,
					actions: [RegisterMachineActions.goToCategoryVinder],
				},
			},
		},
		saveCategoryVinder: {
			on: {
				CONTINUE_DRIVER: {
					target: RegisterMachineViews.saveDriverInfo,
					actions: [RegisterMachineActions.goToSaveDriverInfo],
				},
				CONTINUE_VERIFY_PHONE: {
					target: RegisterMachineViews.confirmPhone,
					actions: [RegisterMachineActions.goToConfirmPhone],
				},
				CONTINUE_BUSINESS: {
					target: RegisterMachineViews.saveBusinessInfo,
					actions: [RegisterMachineActions.goToSaveBusinessInfo],
				},
				BACK: {
					target: RegisterMachineViews.saveAvailabilityVinder,
					actions: [RegisterMachineActions.goToAvailabilityVinder],
				},
			},
		},
		saveDriverInfo: {
			on: {
				CONTINUE_VERIFY_PHONE: {
					target: RegisterMachineViews.confirmPhone,
					actions: [RegisterMachineActions.goToConfirmPhone],
				},
				CONTINUE_BUSINESS: {
					target: RegisterMachineViews.saveBusinessInfo,
					actions: [RegisterMachineActions.goToSaveBusinessInfo],
				},
				BACK: {
					target: RegisterMachineViews.saveCategoryVinder,
					actions: [RegisterMachineActions.goToCategoryVinder],
				},
			},
		},
		saveBusinessInfo: {
			on: {
				CONTINUE: {
					target: RegisterMachineViews.confirmPhone,
					actions: [RegisterMachineActions.goToConfirmPhone],
				},
			},
		},

		success: {},
	},
});
