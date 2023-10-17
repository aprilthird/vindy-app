import { useEffect, useState } from "react";
import { IonContent } from "@ionic/react";
import { useAuth } from "../../use-auth";
import { useRegisterContext } from "../context/register.context";
import {
	BasicHeader,
	Button,
	CustomPopup,
	PopupButtons,
} from "../../../../components";

type AcceptTerms = {
	handleSuccess: (data: any) => void;
	send?: any;
};

export const RegisterFlowAcceptTerms: React.FC<AcceptTerms> = ({
	handleSuccess,
	send = null,
}) => {
	const { state } = useRegisterContext();
	const { acceptUserTerms } = useAuth();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		setIsOpen(false);
	}, []);

	const popButton: PopupButtons = {
		text: "Aceptar",
		role: "confirm",
	};

	const handlePopup = () => {
		setIsOpen(false);
		handleSuccess(true);
	};

	const onSubmit = async () => {
		setIsLoading(true);
		if (state.userId?.length > 0) {
			await acceptUserTerms(state.userId)
				.then(async () => {
					setIsOpen(true);
				})
				.catch((error) => {
					console.log("el error en los terminos", error);
				});
		}
		setIsLoading(false);
	};

	return (
		<>
			{isOpen && (
				<CustomPopup
					isOpen={isOpen}
					type="success"
					title="Cuenta creada con exito"
					message="Ahora podras agendar servicios en Vindy App"
					confirmButton={popButton}
					clickOutSide={true}
					onDidDismiss={handlePopup}
				/>
			)}
			{!isOpen && <BasicHeader send={send} />}
			<IonContent
				className="ion-padding ion-padding-bottom auth ion-padding-horizontal"
				style={{
					height: "100%",
				}}
				scrollY={true}
				forceOverscroll
			>
				<div className="px-5">
					<p className="font-regular mb-2 text-justify">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
						fermentum risus at mauris blandit, sit amet feugiat ligula dictum.
						Praesent vehicula lorem erat, ac maximus massa sodales non. Morbi
						ultricies tincidunt nunc. Morbi sodales quis nibh eget ullamcorper.
						Suspendisse sed consequat ex. Vivamus quis ex luctus, aliquet neque
						non, commodo lectus. Interdum et malesuada fames ac ante ipsum
						primis in faucibus. Mauris sit amet consectetur nisl, ac fermentum
						ipsum. Morbi sapien libero, mollis et libero a, luctus cursus lorem.
						Nulla facilisi. Proin id massa placerat, consectetur urna in, rutrum
						quam. Donec erat orci, elementum vitae elit eu, congue ultrices
						diam. Integer volutpat arcu ut est sollicitudin posuere. Morbi in
						est eget neque faucibus sodales.
					</p>
					<p className="font-regular mb-2 text-justify">
						Curabitur tellus enim, facilisis et ornare a, scelerisque ut velit.
						Ut pulvinar erat massa, vitae vulputate lectus ullamcorper eu. Donec
						at nulla eros. Nullam malesuada maximus sapien dignissim mollis.
						Suspendisse consectetur ornare nisi, eu blandit erat consequat in.
						Ut lectus augue, tincidunt nec sodales ut, iaculis nec metus. Sed
						ipsum nibh, dignissim non augue eu, varius pulvinar ligula. Nulla
						facilisi.
					</p>
					<p className="font-regular mb-2 text-justify">
						Nam suscipit, tortor non malesuada auctor, orci quam viverra purus,
						id tincidunt felis diam sit amet nulla. In auctor erat mi, ut
						condimentum ante rutrum non. Curabitur augue nunc, consectetur at
						nibh in, sagittis dapibus ex. Integer consectetur id enim sit amet
						iaculis. Nullam sed nisl quis risus posuere gravida. Duis eget
						congue dui, eget lobortis elit. Nunc pretium aliquet placerat. Donec
						a tortor sit amet lectus gravida dignissim sagittis non urna. Nulla
						imperdiet nunc convallis turpis sodales, nec porta augue euismod.
						Phasellus ut tincidunt magna. Vivamus volutpat faucibus placerat.
						Mauris dolor libero, egestas at sapien id, consectetur dignissim
						est. Vestibulum ac magna eget lectus euismod aliquet.
					</p>
					<p className="font-regular mb-2 text-justify">
						Curabitur eget justo felis. Aenean aliquet massa nibh, sit amet
						dictum sem varius eu. Orci varius natoque penatibus et magnis dis
						parturient montes, nascetur ridiculus mus. Integer vel feugiat
						ligula, nec varius augue. In ultrices, ante sed iaculis rhoncus, ex
						turpis sodales velit, nec consectetur nunc augue id elit. Curabitur
						id pharetra nunc. Vivamus vestibulum non est venenatis suscipit.
						Orci varius natoque penatibus et magnis dis parturient montes,
						nascetur ridiculus mus. Integer eu eros ultricies, mollis dolor nec,
						pulvinar tortor. Integer nibh mauris, pellentesque a pretium id,
						sodales eget tortor.
					</p>
					<p className="font-regular mb-2 text-justify">
						Nam ac turpis consequat lacus pellentesque pretium nec nec tellus.
						Suspendisse nec nulla sit amet ex dictum accumsan a ac purus. Etiam
						id congue lectus. Sed eu sem pretium, lacinia nisi non, pharetra
						elit. Donec laoreet vulputate auctor. Curabitur non pharetra mi,
						vitae rutrum nisi. Nam mollis eget purus ac lobortis. Nunc aliquam
						lacinia turpis, ut eleifend justo rutrum sit amet. Duis at pharetra
						mi, vitae sollicitudin orci. Proin sed elit ut quam semper
						scelerisque tincidunt laoreet odio. Etiam et neque cursus nulla
						tempus posuere non vitae massa.
					</p>
					<div className="py-10">
						<Button
							label="Acepto"
							onClick={() => onSubmit()}
							fullWidth
							color="primary"
							loading={isLoading}
						/>
					</div>
				</div>
			</IonContent>
		</>
	);
};

// export default React.memo(RegisterFlowAcceptTerms);
