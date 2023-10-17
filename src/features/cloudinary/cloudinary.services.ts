import axios from "axios";

const uploadImage = (data: any) => {
	return axios.post(
		`https://api.cloudinary.com/v1_1/saturno/image/upload`,
		data
	);
};

export const cloudinaryServices = {
	uploadImage,
};
