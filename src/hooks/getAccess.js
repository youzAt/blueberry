const BASE_URL = "https://api-akbarmasoud.iran.liara.run/";

const getAccess = async (setToken) => {
	const refreshToken = localStorage.getItem("blueberry-refresh");
	const reqBody = {
		refresh: refreshToken,
	};
	const res = await fetch(`${BASE_URL}api/account/login/refresh/`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(reqBody),
	});
	const data = await res.json();

	if (res.ok) {
		localStorage.setItem("blueberry-access", data.access);
		setToken(data.access);
		return true;
	} else {
		localStorage.removeItem("blueberry-access");
		localStorage.removeItem("blueberry-refresh");
		setToken("");
		return false;
	}
};

export default getAccess;
