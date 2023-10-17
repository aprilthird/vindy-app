import { handleAxiosError } from "../../http-client";
import { cloudinaryServices } from "./cloudinary.services";

export type CloudinaryResponse = {
	image: string;
	cloudId: string;
};

export const useCloudinary = () => {
	const uploadImage = async (data: any): Promise<CloudinaryResponse> => {
		return new Promise(async (resolve, reject) => {
			await cloudinaryServices
				.uploadImage(data)
				.then(({ status, data }) => {
					if (status === 200) {
						const { secure_url, public_id } = data;
						resolve({ image: secure_url, cloudId: public_id });
					}
				})
				.catch((error) => {
					handleAxiosError(error, (message) => {
						reject(message);
					});
				});
		});
	};
	// const uploadImage = async (data: any) => {
	// 	return new Promise(async (resolve, reject) => {
	// 		await cloudinaryServices
	// 			.uploadImage(data)
	// 			.then(({ status, data }) => {
	// 				if (status === 200) {
	// 					const { secure_url } = data;
	// 					resolve(secure_url);
	// 				}
	// 			})
	// 			.catch((error) => {
	// 				handleAxiosError(error, (message) => {
	// 					reject(message);
	// 				});
	// 			});
	// 	});
	// };

	return {
		uploadImage,
	};
};

// access_mode: "public";
// asset_id: "2b6b05df9d3be78198350ac634049dc8";
// bytes: 53501;
// created_at: "2023-03-28T20:28:20Z";
// etag: "db131918d7774e1810f21464af37c5eb";
// folder: "";
// format: "jpg";
// height: 250;
// original_filename: "dni-709ea635-2cf3-4b8b-b632-76f51d92466e";
// placeholder: false;
// public_id: "dya2gb5st1oxheqemqog";
// resource_type: "image";
// secure_url: "https://res.cloudinary.com/saturno/image/upload/v1680035300/dya2gb5st1oxheqemqog.jpg";
// signature: "ad73590bea0dadc60324e879bb87fefef189b0b9";
// tags: [];
// type: "upload";
// url: "http://res.cloudinary.com/saturno/image/upload/v1680035300/dya2gb5st1oxheqemqog.jpg";
// version: 1680035300;
// version_id: "d715c80afc915a53c1ed3b517cbbf611";
// width: 250;
