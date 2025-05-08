import moment from "moment-jalaali";
import { Dispatch, SetStateAction } from "react";

interface FieldType {
	field: string | "personal_id" | "student_id" | "description";
	question: string;
	answer: string;
}

export function convertUnixToPersianWeekDate(unixTimestamp: number) {
	moment.loadPersian({ dialect: "persian-modern" });
	const date = new Date(unixTimestamp * 1000);
	const week = moment(date).jWeek() % 4;
	const month = moment(date).format("jMMMM");
	const convertedDate = {
		week,
		month,
	};

	return convertedDate;
}
export function convertUnixToPersianHourDate(unixTimestamp: number) {
	const date = new Date(unixTimestamp * 1000);
	moment.loadPersian({ dialect: "persian-modern" });
	const persianDate = {
		data: moment(date).format("dddd jD jMMMM jYYYY"),
		hour: `${String(moment(date).hour()).padStart(2, "0")}:${String(
			moment(date).minute()
		).padStart(2, "0")}`,
	};

	return persianDate;
}

export function convertUnixToPersianDate(unixTimestamp: number) {
	const date = new Date(unixTimestamp * 1000);
	moment.loadPersian({ dialect: "persian-modern" });
	const persianDate = moment(date).format("dddd jD jMMMM jYYYY");

	return persianDate;
}
export const phoneValidate = (phoneNumber: string) => {
	if (phoneNumber.length < 10 || phoneNumber.length > 13) {
		return false;
	} else {
		return true;
	}
};

export const arrayToObject = (array: FieldType[]) => {
	return array.reduce(
		(
			acc: {
				[prop: string]: string;
			},
			item
		) => {
			acc[item.field] = item.answer;
			return acc;
		},
		{}
	);
};

export const validateSignupFields = (fields: FieldType[], setInputError: Dispatch<SetStateAction<string[]>>) => {
	let hasError = false;
	fields?.forEach((field) => {
		switch (field.field) {
			case "personal_id":
				if (field.answer.length !== 10) {
					setInputError((cur) => [...cur, "personal_id"]);
					hasError = true;
				}
				break;
			case "student_id":
				if (field.answer.length < 10 || field.answer.length > 11) {
					setInputError((cur) => [...cur, "student_id"]);
					hasError = true;
				}

				break;
			case "description":
				break;
			default:
				if (field.answer.trim() === "") {
					setInputError((cur) => [...cur, field.field]);
					hasError = true;
				}

				break;
		}
	});
	return hasError;
};

interface Status {
	short_link: string;
	details: string;
	status: "CERTIFICATE" | "TICKET" | "WAITING_FOR_PAYMENT" | "ERROR" | "END" | "REG";
}
interface Event {
	slug: string;
	name: string;
	initial_fee: number;
	fee: number;
	start_time: number;
	status: Status;
	banner: string;
}

export const sortEventList = (eventsList: Event[]) => {
	let sortedEventList:Event[] = [];
	eventsList.reverse()
	sortedEventList = sortedEventList.concat(
		eventsList
			.slice()
			.filter((event) => event.status.status === "WAITING_FOR_PAYMENT")
	);
	sortedEventList = sortedEventList.concat(
		eventsList.slice().filter((event) => event.status.status === "REG")
	);
	sortedEventList = sortedEventList.concat(
		eventsList.slice().filter((event) => event.status.status === "TICKET")
	);
	sortedEventList = sortedEventList.concat(
		eventsList
			.slice()
			.filter((event) => event.status.status === "CERTIFICATE")
	);
	sortedEventList = sortedEventList.concat(
		eventsList.slice().filter((event) => event.status.status === "ERROR")
	);
	sortedEventList = sortedEventList.concat(
		eventsList.slice().filter((event) => event.status.status === "END")
	);
	return sortedEventList;
};