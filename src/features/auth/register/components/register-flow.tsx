import { useState, useCallback } from "react";
import { Keyboard } from "@capacitor/keyboard";
import { useSelector } from "@xstate/react";
import { useAuthContext } from "../../context/auth.hook";
import { useRegisterContext } from "../context/register.context";
import { RegisterMachineViews as currentView } from "../register.machine";
import { getCurrentView, getHowDidViewEnter } from "../../../../utils";
import { ROLES } from "../../context/auth.reducer";
import { useWindowDimensions } from "../../../../utils/hooks/use-screen";

import { RegisterFlowSelectAccountType } from "./register-flow-account-type";
import { RegisterFlowUserForm } from "./register-flow-user-form";
import { RegisterFlowVerifyPhone } from "./register-flow-verify-phone";
import { RegisterFlowAcceptTerms } from "./register-flow-accept-terms";
import { RegisterFlowSelectTypeVinder } from "./register-flow-select-vinder";
import { RegisterFlowBusinessVinderForm } from "./register-flow-business-vinder-form";
import { RegisterFlowAvailibility } from "./register-flow-availability";
import { RegisterFlowCategoryVinder } from "./register-flow-category-vinder";
import { RegisterFlowSaveDriver } from "./register-flow-save-driver";
import { RegisterFlowBusinessInfo } from "./register-flow-business-form";
import { RegisterFlowPersonalVinderForm } from "./register-flow-personal-vinder-form";

import "animate.css";
import "./register.scss";

type Credentials = {
	email: string;
	password: string;
};

export const RegisterFlow: React.FC = () => {
	const { login, userAuthenticated } = useAuthContext();
	const { machineService, state } = useRegisterContext();
	const { height } = useWindowDimensions();
	const view = useSelector(machineService, getCurrentView);
	const enter = useSelector(machineService, getHowDidViewEnter);
	const { send } = machineService;
	const [pageHeight, setPageHeight] = useState<number | null>(null);

	Keyboard.addListener("keyboardWillShow", (info) => {
		setPageHeight(Number(height) - Number(info.keyboardHeight));
	});

	Keyboard.addListener("keyboardWillHide", () => {
		setPageHeight(null);
	});

	const handleSuccess = async (data: any) => {
		let credentials: Credentials | null = null;

		if (state.role === "MEMBER") {
			credentials = {
				email: state.user.email,
				password: state.user.password,
			};
		} else if (state.role === "VINDER" && state.isBusiness) {
			credentials = {
				email: state.businessVinder.email,
				password: state.businessVinder.password,
			};
		} else if (state.role === "VINDER" && !state.isBusiness) {
			credentials = {
				email: state.personalVinder.email,
				password: state.personalVinder.password,
			};
		}

		if (data === true && credentials) {
			await login({
				...credentials,
				role: state.role === "MEMBER" ? ROLES.MEMBER : ROLES.VINDER,
			})
				.then(async (res: any) => {
					userAuthenticated({
						...res,
						type: state.role === "MEMBER" ? ROLES.MEMBER : ROLES.VINDER,
					});
				})
				.catch((error) => {
					console.log("algo raro paso", error);
				});
		}
	};

	const animationClasses = useCallback(() => {
		return `h-screen pb-10 animate__animated bg-transparent
		${
			enter === "BACK" ? "animate__slideInLeft" : "animate__slideInRight"
		}  animate__fast`;
	}, [view, enter]);

	return (
		<>
			{view === currentView.selectTypeAccount && (
				<div className={animationClasses()}>
					<RegisterFlowSelectAccountType send={send} />
				</div>
			)}

			{view === currentView.registerUser && (
				<div className={animationClasses()}>
					<RegisterFlowUserForm
						send={send}
						height={pageHeight}
						screen={height}
					/>
				</div>
			)}
			{view === currentView.confirmPhone && (
				<div className={animationClasses()}>
					<RegisterFlowVerifyPhone send={send} />
				</div>
			)}
			{view === currentView.showTermAndConditions && (
				<div className={animationClasses()}>
					<RegisterFlowAcceptTerms handleSuccess={handleSuccess} send={send} />
				</div>
			)}
			{view === currentView.selectTypeVinder && (
				<div className={animationClasses()}>
					<RegisterFlowSelectTypeVinder send={send} />
				</div>
			)}
			{view === currentView.registerPersonalVinder && (
				<div className={animationClasses()}>
					<RegisterFlowPersonalVinderForm
						send={send}
						height={pageHeight}
						screen={height}
					/>
				</div>
			)}
			{view === currentView.registerBusinessVinder && (
				<div className={animationClasses()}>
					<RegisterFlowBusinessVinderForm
						send={send}
						height={pageHeight}
						screen={height}
					/>
				</div>
			)}
			{view === currentView.saveAvailabilityVinder && (
				<div className={animationClasses()}>
					<RegisterFlowAvailibility send={send} />
				</div>
			)}
			{view === currentView.saveCategoryVinder && (
				<div className={animationClasses()}>
					<RegisterFlowCategoryVinder send={send} />
				</div>
			)}
			{view === currentView.saveDriverInfo && (
				<div className={animationClasses()}>
					<RegisterFlowSaveDriver
						send={send}
						height={pageHeight}
						screen={height}
					/>
				</div>
			)}
			{view === currentView.saveBusinessInfo && (
				<div className={animationClasses()}>
					<RegisterFlowBusinessInfo
						send={send}
						height={pageHeight}
						screen={height}
					/>
				</div>
			)}
		</>
	);
};

// export default React.memo(RegisterFlow);
