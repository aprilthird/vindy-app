import {
	Camera,
	CameraResultType,
	CameraSource,
	Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { useEffect, useState } from "react";
import {
	IonItem,
	IonItemOption,
	IonItemOptions,
	IonItemSliding,
	IonThumbnail,
	useIonAlert,
	useIonLoading,
	isPlatform,
} from "@ionic/react";
import { v4 as randomUUID } from "uuid";
import { XCircle as TrashIcon } from "react-feather";
import { Button } from "../buttons/button";

const IMAGE_DIR = "storage-images";

type OptionButtons = {
	gallery?: boolean;
	camera?: boolean;
};

type InputField = {
	nameFile: string;
	placeholder: string;
	selected: any;
	description?: string;
	showPreview?: boolean;
	options: OptionButtons;
	onSubmitFile: (data: any) => void;
	isUploaded?: boolean;
	isUploading: boolean;
	error?: boolean;
	onSelect?: (data: any) => void;
};
export const InputFile: React.FC<InputField> = ({
	nameFile,
	placeholder,
	description,
	showPreview = true,
	options: { gallery = true, camera = true },
	onSubmitFile,
	isUploaded,
	isUploading,
	error = false,
	selected,
	onSelect = null,
}) => {
	const [image, setImage] = useState<Record<string, string> | null>(null);
	const [present, dismiss] = useIonLoading();
	const [presentAlert] = useIonAlert();
	const uuid = randomUUID();

	useEffect(() => {
		if (Object.keys(selected).length > 0) {
			setImage(selected);
		}
	}, [selected]);

	const loadFile = async (name: string) => {
		setImage(null);
		await present({
			message: "Cargando...",
		});

		Filesystem.readdir({
			directory: Directory.Data,
			path: IMAGE_DIR,
		})
			.then(
				async (res: any) => {
					if (res?.files.length > 0) {
						await loadFileData(res?.files, name);
					}
				},
				async () => {
					await Filesystem.mkdir({
						directory: Directory.Data,
						path: IMAGE_DIR,
					});
				}
			)
			.then(async () => {
				await dismiss();
			});
		await dismiss();
	};

	const loadFileData = async (f: any[], name: string) => {
		const file = f.find((file: any) => file?.name === name);
		if (file) {
			const path = `${IMAGE_DIR}/${file?.name}`;

			const readFile = await Filesystem.readFile({
				directory: Directory.Data,
				path,
			});

			const img = {
				name: file?.name,
				path,
				data: `data:image/jpeg;base64,${readFile.data}`,
			};
			setImage(img);
			onSubmitFile(img);
			if (onSelect) {
				onSelect(img);
			}
		}
	};

	const picture = async (isAlbum: boolean) => {
		const image = await Camera.getPhoto({
			quality: 90,
			allowEditing: false,
			resultType: CameraResultType.Uri,
			source: isAlbum ? CameraSource.Photos : CameraSource.Camera,
		});

		if (image) {
			await saveImage(image);
		}
	};

	const saveImage = async (photo: Photo) => {
		const base64Data = await readAsBase64(photo);

		const fileName = `${nameFile}-${uuid}.jpg`;

		await Filesystem.writeFile({
			directory: Directory.Data,
			path: `${IMAGE_DIR}/${fileName}`,
			data: base64Data,
			recursive: true,
		});

		loadFile(fileName);
	};

	const readAsBase64 = async (photo: Photo) => {
		if (isPlatform("hybrid")) {
			const file = await Filesystem.readFile({
				path: photo?.path ? photo.path : "",
			});

			return file.data;
		} else {
			// Fetch the photo, read as a blob, then convert to base64 format
			if (photo.webPath) {
				const response = await fetch(photo?.webPath);
				const blob = await response.blob();

				return (await convertBlobToBase64(blob)) as string;
			}
		}
		return "";
	};

	const convertBlobToBase64 = async (blob: Blob) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onerror = reject;
			reader.onload = () => {
				resolve(reader.result);
			};
			reader.readAsDataURL(blob);
		});

	const deleteImage = async (file: Record<string, string>) => {
		if (!isUploaded && !isUploading) {
			await Filesystem.deleteFile({
				directory: Directory.Data,
				path: file?.path,
			});
			await loadFile(file?.name);
			onSubmitFile({});
			if (onSelect) {
				onSelect(null);
			}
		} else {
			presentAlert({
				header: "Alerta",
				subHeader: "",
				message: "No puedes eliminar te imagen, porque ya ha sido guardada!",
				buttons: ["OK"],
			});
		}
	};

	return (
		<div className="flex flex-col space-y-4 w-full">
			<div className="w-full mb-3">
				<div className="w-2/3 items-start">
					<span className="text-sm font-regular text-slate-700 mb-4">
						{description ? description : "Sube un archivo"}
					</span>
				</div>
			</div>
			<div className="flex flex-col space-y-2 mb-2">
				{image && (
					<IonItemSliding key={image?.path}>
						<IonItem slot="start" lines="none" className="">
							{showPreview && (
								<IonThumbnail slot="start">
									<img src={image?.data} alt={image?.data} />
								</IonThumbnail>
							)}
							<p className="text-sm lowercase text-slate-500 font-regular">
								{placeholder}
							</p>
						</IonItem>
						<IonItemOptions
							side="end"
							className="border-0"
							onIonSwipe={async () => await deleteImage(image)}
						>
							<IonItemOption color="danger">
								<TrashIcon width={25} height={25} color="white" />
							</IonItemOption>
						</IonItemOptions>
					</IonItemSliding>
				)}

				{(!image || !showPreview) && Object.keys(selected).length === 0 && (
					<div className={`w-full flex flex-row space-x-4`}>
						{gallery && (
							<Button
								label="subir"
								onClick={() => picture(true)}
								fullWidth
								color={error ? "danger" : "secundary"}
							/>
						)}
						{camera && (
							<Button
								label="tomar"
								onClick={() => picture(false)}
								fullWidth
								color={error ? "danger" : "secundary"}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

// export default React.memo(InputFile);
