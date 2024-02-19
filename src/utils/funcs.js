export const sortEventList = (eventsList) => {
	let sortedEventList = [];
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
	return sortedEventList;
};

export const arrayToObject = (array) => {
	return array.reduce((acc, item) => {
		acc[item.field] = item.answer;
		return acc;
	}, {});
};
