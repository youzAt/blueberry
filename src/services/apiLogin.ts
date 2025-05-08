import { api } from "./apiAxios";

interface UserPassStatType {
	phone_number: string;
	created: number;
	password: boolean;
}

export const fetchUserPasswordStat = async (
	phoneNumber: string
): Promise<UserPassStatType> => {
	const { data } = await api.post("/account/account-stat/", {
		phone_number: phoneNumber,
	});
	return data;
};

export const loginUser = async (user: {
	phoneNumber: string;
	password?: string;
	otp?: string;
}) => {
	if ("otp" in user) {
		const { data } = await api.post("/account/login/", {
			phone_number: user.phoneNumber,
			otp: user.otp,
		});
		return data;
	} else if ("password" in user) {
		const { data } = await api.post("/account/login/", {
			phone_number: user.phoneNumber,
			password: user.password,
		});
		return data;
	}
	throw new Error("neither otp nor password is provied!!");
};

export const sendOtp = async ({ phoneNumber }: { phoneNumber: string }) => {
	const { data } = await api.get(`/account/otp/${phoneNumber}`);
	return data;
};
