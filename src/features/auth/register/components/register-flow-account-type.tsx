import { useEffect, useState } from "react";
import { IonContent } from "@ionic/react";
import { User as UserIcon, Briefcase as BagIcon } from "react-feather";
import { BASE_COLORS } from "../../../../utils";
import { ROLES } from "../../context/auth.reducer";
import { useRegisterContext } from "../context/register.context";
import { BasicHeader, Button, RadioButtons } from "../../../../components";

type SelectTypeAccount = {
	send: any;
};

export const RegisterFlowSelectAccountType: React.FC<SelectTypeAccount> = ({
	send,
}) => {
	const [type, setType] = useState<ROLES | string>("");
	const { setTypeAccount, resetState } = useRegisterContext();

	useEffect(() => {
		resetState();
	}, [resetState]);

	const handleSelectvalue = (data: ROLES | any) => {
		setType(data);
	};

	const handleNextPage = () => {
		setTypeAccount(type as ROLES);
		send(type);
	};

	return (
		<>
			<BasicHeader send={send} />
			<IonContent className="ion-padding auth" scrollY={false}>
				<div className="w-full h-full ion-padding">
					<div className="flex flex-col justify-between h-full">
						<div>
							<p className="text-lg font-semibold text-slate-800 mx-auto">
								¿Qué quieres hacer en Vindy App?
							</p>
							<RadioButtons
								options={[
									{
										value: ROLES.MEMBER,
										label: "Necesito un servicio",
										icon: (
											<UserIcon
												width={20}
												height={20}
												color={BASE_COLORS.gray}
											/>
										),
									},
									{
										value: ROLES.VINDER,
										label: "Quiero ofrecer mis servicios",
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

// export default React.memo(RegisterFlowSelectAccountType);
