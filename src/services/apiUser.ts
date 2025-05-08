import { api } from "./apiAxios";

export const setPassword = async (passwordInfo: {
	password: string;
	password_confirmation: string;
	old_password?: string;
}) => {
	const { data } = await api.post("account/set-password/", passwordInfo);
	return data;
};

export const checkPasswordStat = async () => {
	const { data } = await api.get("/account/user/password/");
	return data;
};

export const fetchPersonalInfo = async () => {
	const { data } = await api.put("/account/profile/");
	return data;
};

export const updatePersonalInfo = async (personalInfo: {
	student_id: string;
	personal_id: string;
	first_name: string;
	last_name: string;
}) => {
	const { data } = await api.put("/account/profile/", personalInfo);
	return data;
};

export const fetchUserPhoneNumber = async () => {
	const { data } = await api.get("/account/phone-number/");
	return data;
};

export const sendChangePhoneOtp = async ({
	newPhoneNumber,
}: {
	newPhoneNumber: string;
}) => {
	const { data } = await api.get(`/account/change-phone/${newPhoneNumber}`);
	return { data };
};

export const validateChangePhoneOtp = async (changePhoneInfo: {
	phone_number: string;
	otp: string;
}) => {
	const { data } = await api.put("/account/change-phone/", changePhoneInfo);

	return { data };
};

