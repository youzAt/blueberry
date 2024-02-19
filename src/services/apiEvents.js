/* eslint-disable no-mixed-spaces-and-tabs */
const BASE_URL = "https://api-blueberry.liara.run/";
const accessToken = localStorage.getItem("blueberry-access");
const reqHeader = accessToken
	? {
			"content-type": "application/json",
			Authorization: `Bearer ${accessToken}`,
	  }
	: {
			"content-type": "application/json",
	  };

export const fetchAllEvents = async () => {
	const res = await fetch(`${BASE_URL}api/events/`, {
		method: "GET",
		headers: reqHeader,
	});
	const data = await res.json();
	// getAccess

	return data;
};

export const fetchEvent = async (eventSlug) => {
	const res = await fetch(`${BASE_URL}api/events/${eventSlug}/`, {
		method: "GET",
		headers: reqHeader,
	});
	const data = await res.json();
	/*if (!res.ok && res.status === 401) {
				getAccess(setToken);
			} else if (!res.ok && res.status === 404) {
				navigate("/event-not-fount");
			} else {
				setEvent(data);
			}*/
	return data;
};

export const fetchEventSignupFormFields = async (eventSlug) => {
	const res = await fetch(`${BASE_URL}api/event/registration/${eventSlug}/`, {
		method: "GET",
		headers: reqHeader,
	});
	const data = await res.json();
	/*
    if (res.ok) {
        setFields(data.fields);
    } else {
        navigate(`/events/${eventSlug}`);
    }
    */
	return data.fields;
};

export const fetchPayDetail = async (eventSlug) => {
	const res = await fetch(`${BASE_URL}api/event/pay/${eventSlug}/`, {
		method: "GET",
		headers: reqHeader,
	});
	const data = await res.json();
	/*
    if (!res.ok && res.status === 401) {
        getAccess(setToken);
    } else if (!res.ok && res.status === 404) {
        navigate("/event-not-fount");
    }else if(!res.ok && res.status === 403){
        navigate("/events")
    } else {
        setPrice(data.amount)
        setShortLink(data.short_link)
    }
    */
	return data;
};

export const fetchTicketInfo = async (eventSlug) => {
	const res = await fetch(`${BASE_URL}api/event/ticket/${eventSlug}/`, {
		method: "GET",
		headers: reqHeader,
	});
	const data = await res.json();
	/*
	if (!res.ok && res.status === 401) {
		getAccess(setToken);
	} else if (!res.ok && res.status === 404) {
		navigate("/event-not-fount");
	} else {
		setTicketInfo(data);
	}
    */
	return data;
};
