import { api } from "./apiAxios";
interface Status {
	short_link: string;
	details: string;
	status:
		| "CERTIFICATE"
		| "TICKET"
		| "WAITING_FOR_PAYMENT"
		| "ERROR"
		| "END"
		| "REG";
}
interface Event {
	slug: string;
	name: string;
	initial_fee: number;
	fee: number;
	start_time: number;
	status: Status;
	banner: string;
	reg_time: number;
	end_time: number;
	description: string;
	poster: string;
	short_link: string;
	location: string;
}

interface FieldType {
	field: string;
	question: string;
	answer: string;
}
export const fetchNewestEvents = async () => {
	const { data } = await api.get(`/events/?ordering=-created_at`);
	return data;
};

export const fetchLatestEvents = async () => {
	const { data } = await api.get(`/events/?ordering=-reg_time`);
	return data;
};

export const fetchEvent = async ({
	eventSlug,
}: {
	eventSlug: string;
}): Promise<Event> => {
	const { data } = await api.get(`/events/${eventSlug}/`);
	return data;
};

export const fetchEventSignupFormFields = async ({
	eventSlug,
}: {
	eventSlug: string;
}): Promise<{ fields: FieldType[] }> => {
	const { data } = await api.get(`/event/registration/${eventSlug}/`);
	return data;
};

export const sendSignUpData = async ({
	eventSlug,
	signupData,
}: {
	eventSlug: string;
	signupData: {
		[props: string]: string;
	};
}) => {
	const { data } = await api.post(
		`/event/registration/${eventSlug}/`,
		signupData
	);

	return data;
};

export const fetchUserEvents = async () => {
	const { data } = await api.get("/events/me/");
	return data;
};

export const fetchTicketInfo = async ({ eventSlug }: { eventSlug: string }) => {
	const { data } = await api.get(`/event/ticket/${eventSlug}/`);
	return data;
};

export const fetchShortLinkEvent = async ({
	shortLink,
}: {
	shortLink: string;
}) => {
	const { data } = await api.get(`/events/short-link/${shortLink}/`);
	return data;
};

export const fetchCertificate = async ({ cerId }: { cerId: string }) => {
	const { data } = await api.get(`/event/certificate/c/${cerId}/`);
	return data;
};

export const fetchAllEvents = async (): Promise<Event[]> => {
	const { data } = await api.get("/events/");
	return data;
};
