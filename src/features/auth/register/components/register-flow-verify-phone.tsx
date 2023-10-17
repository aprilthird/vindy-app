import { useEffect, useState } from "react";
import { IonContent } from "@ionic/react";
import { BasicHeader, PhoneCodeVerification } from "../../../../components";

const TIME_INTERVAL = 12;
// const TIME_INTERVAL = 62;

type VerifyPhone = {
	send: (data: string) => void;
};

export const RegisterFlowVerifyPhone: React.FC<VerifyPhone> = ({ send }) => {
	const [time, setTime] = useState<number>(TIME_INTERVAL);
	// const [reSend, setReSend] = useState<boolean>(false);

	const handlePhoneCode = (data: string) => {
		console.log("el valor del input", data);
	};

	// const handleResetTime = () => {
	// 	setTime(TIME_INTERVAL);
	// 	//agregar codigo para reenviar el codigo por mensaje de texto
	// };

	useEffect(() => {
		const interval = setInterval(() => {
			if (time > 0) {
				setTime((prevState) => prevState - 1);
			} else {
				//lo comente por aho, desbloquear cuando se conecte API
				// setReSend(true);
				send("CONTINUE");
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [time, send]);

	return (
		<>
			<BasicHeader send={send} customMainLabel="Confirmar Telefono" />
			<IonContent className="ion-padding">
				<div className="flex flex-col ion-padding h-full justify-between items-center">
					<div className="flex flex-col pt-20 ">
						<span className="text-5xl text-center font-black text-slate-800">
							{time && time <= 10 && <>{time}</>}
							{/* {time && time <= 59 && <>{time}</>} */}
						</span>
						<div className="my-10">
							<p className="text-sm font-regular text-center">
								Te enviaremos un codigo a tu telefono.
							</p>
							<p className="text-sm font-regular text-center">
								introducelo para poder autenticar tus datos
							</p>
						</div>
					</div>
					<div className="w-full overflow-hidden h-16">
						<PhoneCodeVerification onCompleted={handlePhoneCode} />
					</div>
					<div className="flex flex-row items-center text-center mt-16">
						{/* {reSend && (
							<span
								className="text-xs font-light text-center transition active:opacity-30"
								onClick={() => handleResetTime()}
							>
								Volver a enviar el codigo
							</span>
						)} */}
					</div>
				</div>
			</IonContent>
		</>
	);
};

// export default React.memo(RegisterFlowVerifyPhone);
