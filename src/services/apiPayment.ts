import { api } from "./apiAxios";

export const fetchUserBalance = async () => {
	const { data } = await api.get("/payment/balance/");
	return data;
};

export const validateDiscountCode = async (discountDetail: {
	slug: string;
	discountCode: string;
}) => {
	const { data } = await api.get(
		`/events/gift-code-check/${discountDetail.slug}/${discountDetail.discountCode}/`
	);
	return data;
};

export const fetchPayDetails = async (eventSlug: string) => {
	const { data } = await api.get(`/event/pay/${eventSlug}/`);
	return data;
};
