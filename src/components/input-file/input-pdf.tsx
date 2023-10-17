import write_blob from "capacitor-blob-writer";
import {
	IonItem,
	IonItemOption,
	IonItemOptions,
	IonItemSliding,
	useIonAlert,
	useIonLoading,
} from "@ionic/react";

import { Filesystem, Directory } from "@capacitor/filesystem";
import { useState } from "react";
import {
	XCircle as TrashIcon,
	FileText as FileIcon,
	PlusCircle as PlusIcon,
} from "react-feather";
// import Button from "../buttons/button";
import { BASE_COLORS } from "../../utils";
import { Button } from "../buttons/button";

const FILES_DIR = "storage-files";

type InputPdfProps = {
	onUpload: (data: any) => void;
	isUploaded: boolean;
	isUploading: boolean;
	description?: string;
	error?: boolean;
	selected?: string | null;
};

export const InputPdf: React.FC<InputPdfProps> = ({
	description,
	error = false,
	onUpload,
	isUploaded,
	isUploading,
}) => {
	const [pdf, setpdf] = useState<Record<string, string> | null>(null);
	const [present, dismiss] = useIonLoading();
	const [presentAlert] = useIonAlert();

	const loadDocuments = async (name: string) => {
		setpdf(null);
		await present({
			message: "Cargando...",
		});
		Filesystem.readdir({
			directory: Directory.Data,
			path: FILES_DIR,
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
						path: FILES_DIR,
					});
				}
			)
			.then(async (_) => {
				await dismiss();
			});
		await dismiss();
	};

	const loadFileData = async (f: any[], name: string) => {
		const file = f.find((file: any) => file?.name === name);
		if (file) {
			const path = `${FILES_DIR}/${file?.name}`;

			const readFile = await Filesystem.readFile({
				directory: Directory.Data,
				path,
			});
			setpdf({
				name: file?.name,
				path,
				data: `data:application/pdf;base64,${readFile.data}`,
			});
			onUpload({
				name: file?.name,
				path,
				data: `data:application/pdf;base64,${readFile.data}`,
			});
		}
	};
	const addFile = async () => {
		document.getElementById("filepicker")?.click();
	};

	const fileSelected = async (event: any) => {
		const selected = event?.target?.files[0];

		await write_blob({
			directory: Directory.Data,
			path: `${FILES_DIR}/${selected?.name}`,
			blob: selected,
			recursive: true,
		});

		await loadDocuments(selected?.name);
	};

	const deleteFile = async (file: Record<string, string>) => {
		if (!isUploaded && !isUploading) {
			await Filesystem.deleteFile({
				directory: Directory.Data,
				path: file?.path,
			});
			await loadDocuments(file?.name);
			onUpload(null);
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
						{description ? description : "selecciona un pdf"}
					</span>
				</div>
			</div>
			<div className="flex flex-col space-y-2 mb-2">
				{pdf && (
					<IonItemSliding key={pdf?.path}>
						<IonItem slot="start" lines="none" className="">
							<div slot="start">
								<FileIcon width={40} height={40} color={BASE_COLORS.gray} />
							</div>
							<p className="text-sm lowercase text-slate-500 font-regular">
								{pdf?.name}
							</p>
						</IonItem>
						<IonItemOptions
							side="end"
							className="border-0"
							onIonSwipe={async () => await deleteFile(pdf)}
						>
							<IonItemOption color="danger">
								<TrashIcon width={25} height={25} color="white" />
							</IonItemOption>
						</IonItemOptions>
					</IonItemSliding>
				)}

				{!pdf && (
					<div className={`w-full flex flex-row space-x-4`}>
						<Button
							label="subir el pdf"
							onClick={() => addFile()}
							fullWidth
							color={error ? "danger" : "primary"}
							icon={
								<PlusIcon width={20} height={20} color={BASE_COLORS.back} />
							}
						/>

						<input
							hidden
							name="holas"
							type="file"
							id="filepicker"
							onChange={(event) => fileSelected(event)}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

// export default React.memo(InputPdf);
