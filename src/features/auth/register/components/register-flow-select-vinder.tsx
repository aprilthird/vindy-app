import { useState } from "react";
import { IonContent } from "@ionic/react";
import { User as UserIcon, Briefcase as BagIcon } from "react-feather";
import { BasicHeader, Button, RadioButtons } from "../../../../components";
import { BASE_COLORS } from "../../../../utils";
import { ROLES, VINDER_TYPES } from "../../context/auth.reducer";
import { useRegisterContext } from "../context/register.context";

type SelectTypeVinder = {
	send: any;
};

export const RegisterFlowSelectTypeVinder: React.FC<SelectTypeVinder> = ({
	send,
}) => {
	const [type, setType] = useState<VINDER_TYPES | string>("");
	const { setVinderType } = useRegisterContext();
	const handleSelectvalue = (data: ROLES | any) => {
		setType(data);
	};

	const handleNextPage = () => {
		setVinderType(type as VINDER_TYPES);
		send(type);
	};

	return (
		<>
			<BasicHeader send={send} />
			<IonContent className="ion-padding auth" scrollY={false}>
				<div className="h-full w-full flex flex-col ion-padding">
					<div className="flex flex-col justify-between h-full">
						<div>
							<p className="text-lg font-semibold text-slate-800 items-start">
								Registro Vinder
							</p>
							<RadioButtons
								options={[
									{
										value: VINDER_TYPES.PERSONAL,
										label: "Soy una persona",
										icon: (
											<UserIcon
												width={20}
												height={20}
												color={BASE_COLORS.gray}
											/>
										),
									},
									{
										value: VINDER_TYPES.BUSINESS,
										label: "Soy una empresa",
										icon: (
											<BagIcon
												width={20}
												height={20}
												color={BASE_COLORS.gray}
											/>
										),
									},
								]}
								onSelectValue={handleSelectvalue}
							/>
						</div>
						<div>
							<Button
								label="continuar"
								color="primary"
								onClick={() => handleNextPage()}
								fullWidth
							/>
						</div>
					</div>
				</div>
			</IonContent>
		</>
	);
};

// export default React.memo(RegisterFlowSelectTypeVinder);
